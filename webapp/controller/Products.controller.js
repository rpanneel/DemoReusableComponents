sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return Controller.extend("be.rpan.demo.DemoReusableComponents.controller.Products", {
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");
			this.oRouter = this.getOwnerComponent().getRouter();
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("ProductName", FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function () {
			MessageBox.information("This functionality is not ready yet.", { title: "Aw, Snap!" });
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("ProductName", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

		onListItemPress: function (oEvent) {
			const productId = oEvent.getSource().getBindingContext().getObject().ProductID;
			this.getOwnerComponent().getHelper().then(function (oHelper) {
				const oNextUIState = oHelper.getNextUIState(1);
				this.oRouter.navTo("detail", {
					layout: oNextUIState.layout,
					product: productId
				});
			}.bind(this));
		},

		onProductSearchUsageCreated: function (event) {
			const component = event.getParameter("component");

			component.attachProductsSelected(this.onProductsSelectedInComponent.bind(this));
		},

		onProductsSelectedInComponent: function (event) {
			const products = event.getParameter("products");
			const productText = products.reduce((prev, curr, index) => index === 0 ? curr.ProductName : prev + "," + curr.ProductName, "");
			MessageBox.confirm(productText, {
				title: "Selected products from reusable component"
			});
		},

		onPressSupplier: function (event) {

		}

	});
});
