sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/base/Log"],
	function (Controller, Log) {
		"use strict";

		let BaseController = Controller.extend(
			"be.rpan.reuse.util.BaseController",
			/** @lends be.rpan.reuse.util.BaseController.prototype */ {
				constructor: function () {
					// Fill constructor if necessary
				},
			}
		);

		BaseController.prototype.onInit = function () {
			Log.info(this.getView().getControllerName(), "onInit");
		};

		BaseController.prototype.onPatternMatched = function (event) {
			Log.info(this.getView().getControllerName(), "onPatternMatched");
		};

		BaseController.prototype.getModel = function (modelName) {
			return this.getOwnerComponent().getModel();
		};

		BaseController.prototype.getRouter = function () {
			return this.getOwnerComponent().getRouter();
		};

		// Possible to add more base functionality

		return BaseController;
	}
);
