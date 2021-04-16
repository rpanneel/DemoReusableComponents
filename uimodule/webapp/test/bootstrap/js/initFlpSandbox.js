sap.ui.define(
	["./flpSandbox", "sap/m/MessageBox", "sap/m/Button", "sap/m/ActionSheet"],
	function (flpSandbox, MessageBox, Button, ActionSheet) {
		"use strict";

		flpSandbox
			.init()
			.then(function () {
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
			})
			.catch(function (error) {
				MessageBox.error(error.message);
			});
	}
);
