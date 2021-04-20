sap.ui.define(
  ["be/rpan/supplier/util/BaseComponent", "sap/base/Log"],
  function (BaseComponent, Log) {
    "use strict";

    return BaseComponent.extend(
      "be.rpan.supplier.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        BaseComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize()
      },
    }
    );
  }
);
