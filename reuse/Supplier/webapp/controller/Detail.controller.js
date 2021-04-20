sap.ui.define(
  ["../util/BaseController", "sap/base/Log"],
  function (BaseController, Log) {
    "use strict";

    let DetailController = BaseController.extend("be.rpan.supplier.controller.Detail", {
      controller: function () { },
    });

    DetailController.prototype.onInit = function () {
      BaseController.prototype.onInit.apply(this, arguments);

      this.getRouter()
        .getRoute("detail")
        .attachPatternMatched(this.onPatternMatched, this);
    };

    DetailController.prototype.onPatternMatched = function (event) {
      BaseController.prototype.onPatternMatched.apply(this, arguments);

      const args = event.getParameter("arguments");

      this.getModel()
        .metadataLoaded()
        .then(this._bindView.bind(this, args.id));
    };

    DetailController.prototype.onBindingChange = function (event) {
      Log.info(this.getView().getControllerName(), "_bindView change");
    };

    DetailController.prototype.onDataRequested = function (event) {
      Log.info(this.getView().getControllerName(), "_bindView data requested");
    };

    DetailController.prototype.onDataReceived = function (event) {
      Log.info(this.getView().getControllerName(), "_bindView data received");
    };

    DetailController.prototype.onFullScreenPress = function (event) {
      Log.info(this.getView().getControllerName(), "Event: onFullScreenPress");
      this._toggleFullScreen();
    };

    DetailController.prototype._bindView = function (supplierId) {
      Log.info(this.getView().getControllerName(), "_bindView");

      // Get Object Path
      const supplierPath = this.getModel().createKey("Suppliers", {
        SupplierID: supplierId
      });

      this.getView().bindElement({
        path: "/" + supplierPath,
        events: {
          change: this.onBindingChange.bind(this),
          dataRequested: this.onDataRequested.bind(this),
          dataReceived: this.onDataReceived.bind(this),
        },
      });
    };

    DetailController.prototype._toggleFullScreen = function () {
      this.getOwnerComponent().fireEvent("fullScreen", {});
    };

    return DetailController;
  }
);
