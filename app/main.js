"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var flugsuchen_component_1 = require('./flugsuchen.component');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var service = [
    http_1.HTTP_PROVIDERS
];
platform_browser_dynamic_1.bootstrap(flugsuchen_component_1.FlugSuchenComponent, service);
//# sourceMappingURL=main.js.map