"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./module/app.module");
var constants_1 = require("./constants");
fetch('/config').then(function (response) {
    response.json().then(function (configData) {
        var platform = platform_browser_dynamic_1.platformBrowserDynamic([{
                provide: constants_1.CONFIG_TOKEN, useValue: configData
            }]);
        platform.bootstrapModule(app_module_1.AppModule);
    });
});

//# sourceMappingURL=main.js.map
