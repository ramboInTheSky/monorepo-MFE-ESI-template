'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var HeadersModel = (function () {
    function HeadersModel() {
    }
    return HeadersModel;
}());
(function (HTTPMethod) {
    HTTPMethod[HTTPMethod["get"] = 0] = "get";
    HTTPMethod[HTTPMethod["post"] = 1] = "post";
    HTTPMethod[HTTPMethod["delete"] = 2] = "delete";
    HTTPMethod[HTTPMethod["put"] = 3] = "put";
    HTTPMethod[HTTPMethod["patch"] = 4] = "patch";
})(exports.HTTPMethod || (exports.HTTPMethod = {}));
function apiURL(api, realmOnly) {
    return function (endpoint) { return function (apiUrlSettings) { return function () {
        var _a;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var configUrl = "";
        if (apiUrlSettings) {
            if (realmOnly) {
                configUrl = "/" + apiUrlSettings.realm;
            }
            else {
                configUrl = "/" + apiUrlSettings.realm + "/" + apiUrlSettings.territory + "/" + apiUrlSettings.language;
            }
        }
        return "" + api.baseURL + configUrl + "/" + api.version + (_a = api.endpoints[endpoint]).getRemoteURL.apply(_a, params);
    }; }; };
}
function apiMethod(api) {
    return function (endpoint) { return exports.HTTPMethod[api.endpoints[endpoint].method]; };
}
function localEndpoint(api) {
    return function (endpoint) { return function () {
        var _a;
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return (_a = api.endpoints[endpoint]).getLocalURL.apply(_a, params);
    }; };
}
function routeDefinition(api) {
    return function (endpoint) { return api.endpoints[endpoint].routeDefinition; };
}
function buildExport(api, endpoint, realmOnly) {
    return {
        url: apiURL(api, realmOnly)(endpoint),
        method: apiMethod(api)(endpoint),
        localEndpoint: api.endpoints[endpoint].getLocalURL ? localEndpoint(api)(endpoint) : null,
        routeDefinition: api.endpoints[endpoint].getLocalURL ? routeDefinition(api)(endpoint) : null,
    };
}

exports.HeadersModel = HeadersModel;
exports.apiMethod = apiMethod;
exports.apiURL = apiURL;
exports.buildExport = buildExport;
exports.localEndpoint = localEndpoint;
exports.routeDefinition = routeDefinition;
