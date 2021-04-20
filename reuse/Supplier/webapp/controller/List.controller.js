sap.ui.define(
  ["../util/BaseController", "sap/base/Log"],
  function (BaseController, Log) {
    "use strict";

    let ListController = BaseController.extend(
      "be.rpan.supplier.controller.List", {
      constructor: function () { },
    });

    ListController.prototype.onInit = function () {
      BaseController.prototype.onInit.apply(this, arguments);

      this.getRouter()
        .getRoute("list")
        .attachPatternMatched(this.onPatternMatched, this);
    };

    ListController.prototype.onPatternMatched = function (event) {
      BaseController.prototype.onPatternMatched.apply(this, arguments);

      const router = this.getRouter();
      try {
        const hashes = router.oHashChanger.parent.hash.split("/");
        if (hashes.length > 1) {
          switch (hashes[0]) {
            case "supplier":
              router.navTo(
                "detail",
                {
                  id: hashes[1]
                },
                true
              );
              break;
            default:
              break;
          }
        }
      } catch (error) {
        // No hash found - basic routing
      }
    };

    ListController.prototype.onPressListItem = function (event) {
      Log.info(this.getView().getControllerName(), "onPressListItem");

      const bindingContext = event.getSource().getBindingContext();

      this.getOwnerComponent()
        .getRouter()
        .navTo("detail", {
          id: bindingContext.getProperty("SupplierID")
        });
    };

    return ListController;
  }
);
