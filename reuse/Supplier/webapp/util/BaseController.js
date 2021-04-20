sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/base/Log"
],
  function (Controller, Log) {
    "use strict";

    let BaseController = Controller.extend("be.rpan.supplier.util.BaseController", {

      constructor: function () {
        // Fill constructor if necessary
      },

    });

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

    BaseController.prototype.getMainComponent = function () {
      return this.getOwnerComponent().getMainComponent();
    };

    BaseController.prototype.getMainRouter = function () {
      return this.getOwnerComponent().getMainRouter();
    };

    // Possible to add more base functionality

    return BaseController;
  }
);
