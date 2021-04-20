/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library be.rpan.reuse.
 */
sap.ui.define(
	["sap/ui/core/library"], // Library dependency
	function () {
		"use strict";

		/**
		 * Library containing controls/utils/Components for demo.
		 *
		 * @namespace
		 * @name    be.rpan.reuse
		 * @author  Robin Panneels
		 * @version ${version}
		 * @public
		 */
		sap.ui.getCore().initLibrary({
			name: "be.rpan.reuse",
			version: "${version}",
			dependencies: ["sap.ui.core"],
			types: [],
			interfaces: [],
			controls: [],
			elements: [],
		});

		let thisLibrary = be.rpan.reuse;

		// You can add enums here

		return thisLibrary;
	},
	/* bExport= */ false
);
