sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/base/Log",
  "sap/m/Button",
  "sap/m/SelectDialog",
  "sap/m/StandardListItem"
], function (UIComponent, Log, Button, SelectDialog, StandardListItem) {
  "use strict";

  return UIComponent.extend("reuse.ProductSearch.Component", {
    metadata: {
      manifest: "json",
      properties: {
        icon: {
          type: "sap.ui.core.URI",
          defaultValue: ""
        },

        isMultiSelect: {
          type: "boolean",
          defaultValue: false
        }
      },
      events: {
        productsSelected: {
          parameters: {
            products: {
              type: "array"
            }
          }
        }
      }
    },

    init: function () {
      // Get the passed in component data
      this._readComponentData(this.getComponentData());

      this._resourceBundle = this.getModel("i18n").getResourceBundle();

      // This triggers the createContent-function!
      UIComponent.prototype.init.apply(this, arguments);
    },

    createContent: function () {
      // Return a main control!
      return this._getButton();
    },

    destroy: function () {
      if (this._triggerButton) {
        this._triggerButton.destroy();
      }
      UIComponent.prototype.destroy.apply(this, arguments);
    },

    _readComponentData: function (data) {
      if (typeof data.icon === "string") {
        this.setIcon(data.icon);
      }

      if (typeof data.isMultiSelect === "boolean") {
        this.setIsMultiSelect(data.isMultiSelect);
      }
    },

    _getButton: function () {
      if (!this._triggerButton) {
        this._triggerButton = this._createButton();
      }

      return this._triggerButton;
    },

    _createButton: function () {
      return new Button(this.createId("productButton"), {
        icon: this.getIcon(),
        text: this._resourceBundle.getText("button.text"),
        press: this.onButtonPress.bind(this)
      });
    },

    onButtonPress: function (event) {
      this._getDialog().open();
    },

    _getDialog: function () {
      if (!this._dialog) {
        this._dialog = this._createDialog();
      }

      return this._dialog;
    },

    _createDialog: function () {
      let dialog = new SelectDialog(this.createId("partnerSearchDialog"), {
        noDataText: this._resourceBundle.getText("dialog.noData"),
        title: this._resourceBundle.getText("dialog.title"),
        multiSelect: this.getIsMultiSelect(), // From properties of the component
        search: this.onSearchProduct.bind(this),
        confirm: this.onConfirmDialog.bind(this),
        cancel: this.onCancelDialog.bind(this)
      });
      dialog.setModel(this.getModel("valueHelp"), "valueHelp");
      dialog.bindAggregation("items", {
        path: "valueHelp>/Products",
        template: this._getListItemTemplate()
      });

      return dialog;
    },

    _getListItemTemplate: function () {
      return new StandardListItem({
        title: "{valueHelp>ProductName}",
        description: "{valueHelp>ProductID}"
      });
    },

    onSearchProduct: function (event) {
      debugger;
    },

    onConfirmDialog: function (event) {
      const selectedProducts = event.getParameter("selectedItems").map(item => item.getBindingContext("valueHelp").getObject());
      this.fireProductsSelected({
        products: selectedProducts
      });
    },

    onCancelDialog: function (event) {
      Log.info("Product Search Dialog cancelled!");
    }


  });

});