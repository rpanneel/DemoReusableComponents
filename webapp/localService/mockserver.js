sap.ui.define(
	[
		"sap/ui/core/util/MockServer"
	],
	function(MockServer) {
		"use strict";

		const _appModulePath = "be/rpan/demo/DemoReusableComponents/",
			_jsonFilesModulePath = _appModulePath + "localService/mockData";

		return {
			/**
			 * Initializes the mock server.
			 * You can configure the delay with the URL parameter "serverDelay".
			 * The local mock data in this folder is returned instead of the real data for testing.
			 * @public
			 */
			init: function() {
				function getDataSync(manifestUrl) {
					let xhr = new XMLHttpRequest();
					xhr.open("GET", manifestUrl, false);
					xhr.send();
					return JSON.parse(xhr.responseText);
				}

				const jsonFilesUrl = jQuery.sap.getModulePath(_jsonFilesModulePath),
					manifesturl = jQuery.sap.getModulePath(
						_appModulePath + "manifest",
						".json"
					),
					manifest = getDataSync(manifesturl),
					mainDataSource = manifest["sap.app"].dataSources.mainService,
					metadataUrl = jQuery.sap.getModulePath(
						_appModulePath +
							mainDataSource.settings.localUri.replace(".xml", ""),
						".xml"
					);

				const mockServerurl = /.*\$/.test(mainDataSource.uri)
					? mainDataSource.uri
					: mainDataSource.uri + "/";

				const mockServer = new MockServer({
					rootUri: mockServerurl
				});

				mockServer.simulate(metadataUrl, {
					sMockdataBaseUrl: jsonFilesUrl,
					bGenerateMissingMockData: true
				});

				mockServer.start();
			}
		};
	}
);
