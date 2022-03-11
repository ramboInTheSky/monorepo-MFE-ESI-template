"use strict"

Object.defineProperty(exports, "__esModule", {value: true})

var helmet = require("helmet")
var fs = require("fs")
var path = require("path")
var morgan = require("morgan")
var logger = require("@monorepo/core-logger")

function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : {default: e}
}

var helmet__default = /*#__PURE__*/ _interopDefaultLegacy(helmet)
var fs__default = /*#__PURE__*/ _interopDefaultLegacy(fs)
var path__default = /*#__PURE__*/ _interopDefaultLegacy(path)
var morgan__default = /*#__PURE__*/ _interopDefaultLegacy(morgan)
var logger__default = /*#__PURE__*/ _interopDefaultLegacy(logger)

var correlationMiddleware = function (req, res, next) {
    var uuidv1 = require("uuid/v1")
    if (!res.req.headers["x-monorepo-correlation-id"]) {
        req.headers["x-monorepo-correlation-id"] = uuidv1()
    }
    next()
}

var helmetGuard = helmet__default["default"]({
    frameguard: false,
    xssFilter: true,
    hidePoweredBy: true,
    hsts: false,
})

var htmlMiddleware = function (htmlFileName) {
    return function (req, res, next) {
        var publicPath = path__default["default"].join(__dirname, "/public")
        fs__default["default"].readFile(publicPath + "/" + (htmlFileName || "app.html"), "utf8", function (err, html) {
            if (!err) {
                req.html = html
                next()
            } else {
                res.status(500).send("Error parsing app.html")
            }
        })
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function () {
    __assign =
        Object.assign ||
        function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i]
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
            }
            return t
        }
    return __assign.apply(this, arguments)
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value))
            } catch (e) {
                reject(e)
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value))
            } catch (e) {
                reject(e)
            }
        }
        function step(result) {
            result.done
                ? resolve(result.value)
                : new P(function (resolve) {
                      resolve(result.value)
                  }).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
}

function __generator(thisArg, body) {
    var _ = {
            label: 0,
            sent: function () {
                if (t[0] & 1) throw t[1]
                return t[1]
            },
            trys: [],
            ops: [],
        },
        f,
        y,
        t,
        g
    return (
        (g = {next: verb(0), throw: verb(1), return: verb(2)}),
        typeof Symbol === "function" &&
            (g[Symbol.iterator] = function () {
                return this
            }),
        g
    )
    function verb(n) {
        return function (v) {
            return step([n, v])
        }
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.")
        while (_)
            try {
                if (
                    ((f = 1),
                    y &&
                        (t =
                            op[0] & 2
                                ? y["return"]
                                : op[0]
                                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                : y.next) &&
                        !(t = t.call(y, op[1])).done)
                )
                    return t
                if (((y = 0), t)) op = [op[0] & 2, t.value]
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op
                        break
                    case 4:
                        _.label++
                        return {value: op[1], done: false}
                    case 5:
                        _.label++
                        y = op[1]
                        op = [0]
                        continue
                    case 7:
                        op = _.ops.pop()
                        _.trys.pop()
                        continue
                    default:
                        if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0
                            continue
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1]
                            break
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1]
                            t = op
                            break
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2]
                            _.ops.push(op)
                            break
                        }
                        if (t[2]) _.ops.pop()
                        _.trys.pop()
                        continue
                }
                op = body.call(thisArg, _)
            } catch (e) {
                op = [6, e]
                y = 0
            } finally {
                f = t = 0
            }
        if (op[0] & 5) throw op[1]
        return {value: op[0] ? op[1] : void 0, done: true}
    }
}

var morganInstance = function (options) {
    return morgan__default["default"]("combined", __assign({stream: logger__default["default"].stream}, options))
}
var httpLogger = function (isDev) {
    return isDev
        ? morganInstance({
              skip: function (_req, res) {
                  return res.statusCode < 400
              },
          })
        : morganInstance()
}

var siteurlMiddleware = function (token, defaultURL) {
    return function (req, _res, next) {
        var siteUrl = req.headers["x-monorepo-siteurl"] || defaultURL
        if (siteUrl) {
            req.siteUrl = {
                url: siteUrl.replace(/\/$/, ""),
                token: token,
            }
        }
        req.appScope = token.substring(1)
        next()
    }
}

var CORSMiddleware = function (_req, res, next) {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers":
            "accept, x-monorepo-territory, x-monorepo-realm, x-monorepo-language, x-monorepo-correlation-id, x-monorepo-session-id, x-monorepo-time-machine-date, x-monorepo-viewport-size, x-monorepo-persona",
    })
    next()
}

var getTimeMachineCookieValue = function (cookieList) {
    var b = cookieList === null || cookieList === void 0 ? void 0 : cookieList.match("\\btime-machine-date=([^;]*)\\b")
    return b ? b.pop() : ""
}
var timeMachineMiddleware = function (req, _res, next) {
    var _a
    var cookie = getTimeMachineCookieValue((_a = req.headers) === null || _a === void 0 ? void 0 : _a.cookie)
    if (cookie) {
        req.headers["x-monorepo-time-machine-date"] = cookie
    }
    next()
}

var getText = function (textUrl) {
    return __awaiter(void 0, void 0, void 0, function () {
        var text, error_1
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3])
                    return [4, fs__default["default"].promises.readFile(textUrl)]
                case 1:
                    text = _a.sent()
                    return [2, JSON.parse(text.toString())]
                case 2:
                    error_1 = _a.sent()
                    throw new Error(error_1)
                case 3:
                    return [2]
            }
        })
    })
}
var textMiddleware = function (publicPath, configurationKeys, cache, logger) {
    return function (req, _res, nextOp) {
        return __awaiter(void 0, void 0, void 0, function () {
            var ttl, textData, textUrl, text, err_2
            var _a, _b
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6])
                        ttl = _res.locals.configuration
                            ? (_a = _res.locals.configuration[configurationKeys.appCache]) === null || _a === void 0
                                ? void 0
                                : _a.Value
                            : 0
                        textData = _res.locals.configuration
                            ? (_b = _res.locals.configuration[configurationKeys.textData]) === null || _b === void 0
                                ? void 0
                                : _b.Value
                            : "default-text"
                        textUrl = publicPath + "/text/" + (textData || "default-text") + ".json"
                        text = cache.get(textUrl)
                        if (!!text) return [3, 4]
                        _c.label = 1
                    case 1:
                        _c.trys.push([1, 3, , 4])
                        return [4, getText(textUrl)]
                    case 2:
                        text = _c.sent()
                        cache.set(textUrl, text, ttl !== null && ttl !== void 0 ? ttl : 0)
                        return [3, 4]
                    case 3:
                        _c.sent()
                        logger.warn("Error getting text object")
                        return [3, 4]
                    case 4:
                        req.text = text
                        nextOp()
                        return [3, 6]
                    case 5:
                        err_2 = _c.sent()
                        logger.error(err_2)
                        return [3, 6]
                    case 6:
                        return [2]
                }
            })
        })
    }
}

exports.CORSMiddleware = CORSMiddleware
exports.correlationMiddleware = correlationMiddleware
exports.getTimeMachineCookieValue = getTimeMachineCookieValue
exports.helmetGuard = helmetGuard
exports.htmlMiddleware = htmlMiddleware
exports.httpLogger = httpLogger
exports.siteurlMiddleware = siteurlMiddleware
exports.textMiddleware = textMiddleware
exports.timeMachineMiddleware = timeMachineMiddleware
