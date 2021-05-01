# DemoReusableComponents

This project is an example project to demonstrate the use of reusable components. We demonstrate how easy it is to create these reusable components and to integrate them in your applications.

Besides the demo of the reusable components we also added an example about routing in nested components in UI5 version 1.71. 

Information how you can implement this can be found on following links:
- https://ui5.sap.com/test-resources/sap/ui/core/demokit/sample/RoutingNestedComponent/RoutingNestedComponent.html
- https://ui5.sap.com/#/topic/fb19f501b16e4e4991eb6a017770945b

## Using the repository

You can either use the npm sources for UI5, or you can download the local [sdk-sources](https://tools.hana.ondemand.com/#sapui5) and add the link to these sources in a .env-file (see the environment variables **SAPUI5_SDK_RESOURCES** and **SAPUI5_SDK_TEST_RESOURCES**).  

You can simply run following command to install all the dependencies
```shell
npm install
```

Then you can run following command to start the local server, with mock data
```shell
npm run dev
```

I used mock data because then we could also demonstrate those capabilities and we didn't need a real "back-end".

## Credits

This project has been generated with 💙 and [easy-ui5](https://github.com/SAP)
