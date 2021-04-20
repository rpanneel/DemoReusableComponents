sap.ui.define(
  ["../util/BaseController"],
  function (BaseController) {
    "use strict";

    let AppController = BaseController.extend(
      "be.rpan.supplier.controller.App", {
      constructor: function () { },
    }
    );

    AppController.prototype.onInit = function () {
      BaseController.prototype.onInit.apply(this, arguments);
    };

    return AppController;
  }
);
