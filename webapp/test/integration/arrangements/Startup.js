sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
    "use strict";

    return Opa5.extend("be.rpan.demo.DemoReusableComponents.test.integration.arrangements.Startup", {
        iStartMyApp: function () {
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "be.rpan.demo.DemoReusableComponents",
                    async: true,
                    manifest: true
                }
            });
        }
    });
});
