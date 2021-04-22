sap.ui.define(
	["sap/ui/core/UIComponent", "sap/base/Log", "sap/base/util/deepClone"],
	function (UIComponent, Log, deepClone) {
		"use strict";

		function processComponentTargetInfo(componentTargetInfo, event) {
			Object.values(componentTargetInfo).forEach(function (info) {
				if (info.parameters) {
					Object.keys(info.parameters).forEach(function (name) {
						var paramName = info.parameters[name];
						var eventValue = event.getParameter(paramName);

						// expand the parameter mapping with the parameter value from
						// the event
						info.parameters[paramName] = eventValue;
					});
				}

				if (info.componentTargetInfo) {
					processComponentTargetInfo(info.componentTargetInfo, event);
				}
			});
		}

		return UIComponent.extend("be.rpan.reuse.util.BaseComponent", {
			init: function () {
				UIComponent.prototype.init.apply(this, arguments);

				let router = this.getRouter();

				// When router is created we process the event mapping
				router.getViews().attachCreated(this._processEventMapping, this);
				router.initialize();
			},

			_processEventMapping: function (event) {
				if (!this.eventMapping) {
					return;
				}

				const targetType = event.getParameter("type");
				const targetObject = event.getParameter("object");
				const targetOptions = event.getParameter("options");
				let events = [];

				if (targetType !== "Component") return; // Only do something when route type is a Component

				events = this.eventMapping[targetOptions.usage];
				if (Array.isArray(events)) {
					events.forEach(
						function (eventMapping) {
							targetObject.attachEvent(
								eventMapping.name,
								function (componentEvent) {
									let componentTargetInfo;

									// In case of a "routing"-event
									if (eventMapping.route) {
										// route information defined, call 'navTo'
										if (eventMapping.componentTargetInfo) {
											// if there's information for component target defined, replace the
											// event parameter mapping with the value from the event object
											componentTargetInfo = deepClone(
												eventMapping.componentTargetInfo
											);
											processComponentTargetInfo(
												componentTargetInfo,
												componentEvent
											);
										}

										this.getRouter().navTo(
											eventMapping.route,
											{},
											componentTargetInfo
										);
									} else if (eventMapping.forward) {
										// Event should be forwarded with the same parameters
										this.fireEvent(
											eventMapping.forward,
											componentEvent.getParameters()
										);
									}
								}.bind(this)
							);
						}.bind(this)
					);
				}
			},
		});
	}
);
