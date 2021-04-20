sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
  "use strict";

  return UIComponent.extend("be.rpan.supplier.util.BaseComponent", {

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);
    },

    getMainComponent: function () {
      /*
        Name of main component is defined in componentData of componentUsages
        in main component manifest. For example ...
        "componentUsages": {
          "myreuse": {
            "name": "reuse.component1",
            "componentData": {
              "parentComponentName": "mydemo.Component"
            }
          }
        */
      let element = this.oContainer;
      while (element && !this._mainComponent) {
        try {
          const metadata = element.getMetadata();
          const componentName = metadata.getName();
          const parentComponentName = this.getComponentData().parentComponentName;

          if (componentName === parentComponentName) {
            this._mainComponent = element;
          } else {
            element = element.getParent();
          }
        } catch {
          element = element.getParent();
        }
      }
      return this._mainComponent ? this._mainComponent : this;
    },

    getMainRouter: function () {
      return this.getMainComponent().getRouter();
    },
  }
  );
});
