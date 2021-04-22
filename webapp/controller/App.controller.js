sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
	"use strict";

	return Controller.extend("be.rpan.demo.DemoReusableComponents.controller.App", {
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();
			this.oRouter = this.oOwnerComponent.getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);

			// Attach to events from the component
			this.oOwnerComponent.attachEvent(
				"fullScreen",
				this.onSupplierComponentFullScreenPress,
				this
			);
		},

		onRouteMatched: function (oEvent) {
			var sRouteName = oEvent.getParameter("name"),
				oArguments = oEvent.getParameter("arguments");

			this._updateUIElements();

			// Save the current route name
			this.currentRouteName = sRouteName;
			this.currentProduct = oArguments.product;
			this.currentSupplier = oArguments.supplier;
		},

		onStateChanged: function (oEvent) {
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
				sLayout = oEvent.getParameter("layout");

			this._updateUIElements();

			// Replace the URL with the new layout if a navigation arrow was used
			if (bIsNavigationArrow) {
				this.oRouter.navTo(this.currentRouteName, { layout: sLayout, product: this.currentProduct, supplier: this.currentSupplier }, true);
			}
		},

		// Update the close/fullscreen buttons visibility
		_updateUIElements: function () {
			var oModel = this.oOwnerComponent.getModel("app"),
				oUIState;
			this.oOwnerComponent.getHelper().then(function (oHelper) {
				oUIState = oHelper.getCurrentUIState();
				oModel.setData(oUIState);
			});
		},

		onExit: function () {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
			this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		},

		onSupplierComponentFullScreenPress: function (event) {
			// Get the "app"-model
			const appModel = this.oOwnerComponent.getModel("app");

			// Get the current layout
			const currentLayout = appModel.getProperty("/layout");

			switch (currentLayout) {
				case "ThreeColumnsEndExpanded":	// We know that we are displaying supplier component in the FLC
					appModel.setProperty("/layout", "EndColumnFullScreen");
					break;
				case "EndColumnFullScreen": // Supplier Component in full screen mode
					appModel.setProperty("/layout", "ThreeColumnsEndExpanded");
					break;
				default:
					break;
			}


		}
	});
});