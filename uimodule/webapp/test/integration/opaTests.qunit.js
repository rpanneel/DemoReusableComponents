/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
    "use strict";

    sap.ui.require(["be/rpan/demo/DemoReusableComponents/test/integration/AllJourneys"], function () {
        QUnit.start();
    });
});
