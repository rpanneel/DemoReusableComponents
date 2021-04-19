sap.ui.define([
	"be/rpan/demo/DemoReusableComponents/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("be.rpan.demo.DemoReusableComponents.controller.ProductDetail", {
		onInit: function () {
			this.oOwnerComponent = this.getOwnerComponent();

			this.oRouter = this.getRouter();
			this.oModel = this.getModel("app");

			this.oRouter.getRoute("main").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
			//this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onProductMatched, this);
		},

		_onProductMatched: function (oEvent) {
			this._product = oEvent.getParameter("arguments").product || this._product || "0";

			const productKey = { ProductID: decodeURIComponent(this._product) };

			this.getModel()
				.metadataLoaded()
				.then(
					function () {
						this._bindView(
							"/" + this.getModel().createKey("Products", productKey)
						);
					}.bind(this)
				);
		},

		_bindView: function (path) {
			this.getView().bindElement({
				path: path,
				parameters: {
					expand:
						"Category,Supplier",
				},
				events: {
					change: this.onBindingChange.bind(this),
					dataRequested: this.onDataRequested.bind(this),
					dataReceived: this.onDataReceived.bind(this),
				},
			});
		},

		onBindingChange: function (event) {
		},

		onDataRequested: function (event) {
		},

		onDataReceived: function (event) {
		},

		onEditToggleButtonPress: function () {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},

		handleFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.oRouter.navTo("detail", { layout: sNextLayout, product: this._product });
		},

		handleExitFullScreen: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
			this.oRouter.navTo("detail", { layout: sNextLayout, product: this._product });
		},

		handleClose: function () {
			var sNextLayout = this.oModel.getProperty("/actionButtonsInfo/midColumn/closeColumn");
			this.oRouter.navTo("main", { layout: sNextLayout });
		},

		onExit: function () {
			this.oRouter.getRoute("main").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		}
	});
});
