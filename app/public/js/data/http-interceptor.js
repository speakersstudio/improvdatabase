"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var AppHttp = (function (_super) {
    __extends(AppHttp, _super);
    function AppHttp(backend, defaultOptions, router, userService) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this.router = router;
        _this.userService = userService;
        return _this;
    }
    AppHttp.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, this.getRequestOptionArgs(options)));
    };
    AppHttp.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, this.getRequestOptionArgs(options)));
    };
    AppHttp.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    AppHttp.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    AppHttp.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, this.getRequestOptionArgs(options)));
    };
    AppHttp.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        this.userService.appendAuthorizationHeader(options.headers);
        return options;
    };
    AppHttp.prototype.intercept = function (observable) {
        var _this = this;
        return observable.catch(function (err, source) {
            if (err.status == 401 && err.url.indexOf('/login') == -1) {
                _this.router.navigate(['/app/unauthorized']);
                return Observable_1.Observable.empty();
            }
            else {
                return Observable_1.Observable.throw(err);
            }
        });
    };
    return AppHttp;
}(http_1.Http));

//# sourceMappingURL=http-interceptor.js.map
