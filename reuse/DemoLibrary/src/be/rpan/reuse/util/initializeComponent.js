/*!
 * ${copyright}
 */
sap.ui.define(
	["sap/ui/model/resource/ResourceModel"],
	function (ResourceModel) {
		"use strict";

		/**
		 * This file contains common initialization steps for all app components
		 *  - Reuse i18n Model
		 */
		return {
			/**
			 * Extend the passed in component with additional functionality from the library. We add for example a second resourceModel to the calling
			 * component from this library. So we can share resources.
			 *
			 * @method		init
			 * @memberof	be.rpan.reuse.util.initializeComponent
			 * @author		Robin Panneels
			 * @param 		{sap.ui.core.UIComponent} 				component 				Component reference on which we inject the initialization data
			 * @public
			 */
			init: function (component) {
				// Set the Reuse i18n-model, which can be used by multiple applications
				const i18nModel = new ResourceModel({
					bundle: sap.ui
						.getCore()
						.getLibraryResourceBundle("be.rpan.reuse"),
				});
				component.setModel(i18nModel, "i18n-reuse");
			},
		};
	}
);
