sap.ui.define(
	["sap/base/util/ObjectPath", "sap/ushell/services/Container"],
	function (ObjectPath) {
		"use strict";

		if (typeof sap === "undefined") {
			sap = {};
		}
		if (typeof sap.rpan === "undefined") {
			sap.rpan = {};
		}
		sap.rpan.setTestUser = function (userPromise) {
			const userId = "DEVELOPER";
			const user = {
				id: userId,
				firstName: userId,
				lastName: userId,
				fullName: userId,
			};
			userPromise.resolve(user);
		};

		// Define ushell config
		ObjectPath.set(["sap-ushell-config"], {
			defaultRenderer: "fiori2",
			renderers: {
				fiori2: {
					componentData: {
						config: {
							enableSearch: false,
							rootIntent: "Shell-home",
						},
					},
				},
			},
			services: {
				Container: {
					adapter: {
						config: {
							setUserCallback: "sap.rpan.setTestUser",
						},
					},
				},
				LaunchPage: {
					adapter: {
						config: {
							groups: [
								{
									tiles: [
										{
											tileType: "sap.ushell.ui.tile.StaticTile",
											properties: {
												title: "Demo Components",
												targetURL: "#components-demo",
											},
										}, {
											tileType: "sap.ushell.ui.tile.StaticTile",
											properties: {
												title: "Suppliers",
												targetURL: "#suppliers-display",
											},
										}
									],
								},
							],
						},
					},
				},
				ClientSideTargetResolution: {
					adapter: {
						config: {
							inbounds: {
								"components-demo": {
									semanticObject: "components",
									action: "demo",
									description: "Demo: Reusable Components",
									title: "Demo Components",
									signature: {
										parameters: {},
									},
									resolutionResult: {
										applicationType: "SAPUI5",
										additionalInformation:
											"SAPUI5.Component=be.rpan.demo.DemoReusableComponents",
										url: sap.ui.require.toUrl("be/rpan/demo/DemoReusableComponents"),
									},
								},
								"suppliers-display": {
									semanticObject: "suppliers",
									action: "display",
									description: "Suppliers App",
									title: "Display Suppliers",
									signature: {
										parameters: {},
									},
									resolutionResult: {
										applicationType: "SAPUI5",
										additionalInformation:
											"SAPUI5.Component=be.rpan.supplier",
										url: sap.ui.require.toUrl("be/rpan/supplier"),
									},
								},
							},
						},
					},
				},
				NavTargetResolution: {
					config: {
						enableClientSideTargetResolution: true,
					},
				},
			},
		});

		const flpSandbox = {
			/**
			 * Initializes the FLP Sandbox.
			 *
			 * @returns		{Promise}				A promise that is resolved when the sandbox bootstrap has finished
			 */
			init: () => {
				// The sandbox is a singleton, so this can only be started once.
				if (!this._bootstrapFinished) {
					this._bootstrapFinished = sap.ushell.bootstrap("local");
					this._bootstrapFinished.then(() => {
						sap.ushell.Container.createRenderer().placeAt("content");
					});
				}

				return this._bootstrapFinished;
			},
		};

		return flpSandbox;
	}
);
