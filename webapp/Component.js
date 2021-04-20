sap.ui.define(
    [
        "be/rpan/reuse/util/BaseComponent",
        "sap/ui/Device",
        "be/rpan/demo/DemoReusableComponents/model/models",
        "sap/ui/model/json/JSONModel",
        "sap/f/FlexibleColumnLayoutSemanticHelper",
        "sap/f/library"
    ],
    function (BaseComponent, Device, models, JSONModel, FlexibleColumnLayoutSemanticHelper, fioriLibrary) {
        "use strict";

        return BaseComponent.extend("be.rpan.demo.DemoReusableComponents.Component", {
            metadata: {
                manifest: "json"
            },
            eventMapping: {
                supplierComponent: [
                    {
                        name: "fullScreen",
                        forward: "fullScreen",
                    },
                ],
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                BaseComponent.prototype.init.apply(this, arguments);

                const oModel = new JSONModel();
                this.setModel(oModel, "app");

                let oRouter = this.getRouter();
                oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
                oRouter.initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            },

            getHelper: function () {
                return this._getFcl().then(function (oFCL) {
                    var oSettings = {
                        defaultTwoColumnLayoutType: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                        defaultThreeColumnLayoutType: fioriLibrary.LayoutType.ThreeColumnsMidExpanded,
                        initialColumnsCount: 2,
                        maxColumnsCount: 2
                    };
                    return (FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings));
                });
            },

            _onBeforeRouteMatched: function (event) {
                var oModel = this.getModel("app"),
                    sLayout = event.getParameters().arguments.layout,
                    oNextUIState;

                // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
                if (!sLayout) {
                    this.getHelper().then(function (oHelper) {
                        oNextUIState = oHelper.getNextUIState(0);
                        oModel.setProperty("/layout", oNextUIState.layout);
                    });
                    return;
                }

                oModel.setProperty("/layout", sLayout);
            },

            _getFcl: function () {
                return new Promise(function (resolve, reject) {
                    var oFCL = this.getRootControl().byId('flexibleColumnLayout');
                    if (!oFCL) {
                        this.getRootControl().attachAfterInit(function (event) {
                            resolve(event.getSource().byId('flexibleColumnLayout'));
                        }, this);
                        return;
                    }
                    resolve(oFCL);

                }.bind(this));
            }
        });
    }
);
