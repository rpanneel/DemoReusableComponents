sap.ui.define(
	[
		"./flpSandbox",
		"../../../localService/mockserver",
		"sap/m/MessageBox",
		"sap/ui/fl/FakeLrepConnectorLocalStorage",
		"sap/m/ActionSheet",
		"sap/m/Button",
		"reuse/ProductSearch/localService/mockserver",
		"be/rpan/supplier/localService/mockserver"
	],
	function (
		flpSandbox,
		mockserver,
		MessageBox,
		FakeLrepConnectorLocalStorage,
		ActionSheet,
		Button,
		productSearchMockServer,
		supplierMockServer
	) {
		"use strict";

		const initializations = [
			mockserver.init(),
			productSearchMockServer.init(),
			supplierMockServer.init(),
			flpSandbox.init(),
		];

		Promise.all(initializations)
			.catch((error) => {
				MessageBox.error(error.message);
			})
			.finally(() => {
				let renderer = sap.ushell.Container.getRenderer("fiori2");
				let languageMenu;
				renderer.addHeaderEndItem(
					"sap.ushell.ui.shell.ShellHeadItem",
					{
						id: "headerEnd",
						icon: "sap-icon://world",
						press: function (event) {
							const languageButton = event.getSource();
							if (!languageMenu) {
								languageMenu = new ActionSheet({
									showCancelButton: false,
									buttons: [
										new Button({
											text: "French",
											press: function () {
												window.location.search = "sap-language=FR";
											},
										}),
										new Button({
											text: "Nederlands",
											press: function () {
												window.location.search = "sap-language=NL";
											},
										}),
										new Button({
											text: "English",
											press: function () {
												window.location.search = "sap-language=EN";
											},
										}),
									],
								});
							}
							languageMenu.openBy(languageButton);
						},
					},
					true,
					false
				);
				FakeLrepConnectorLocalStorage.enableFakeConnector();
			});
	}
);
