'use strict';

var logLevel = process.env.LOG_LEVEL || "warn";
var logLevels = Object.freeze({
    info: 1,
    debug: 2,
    warn: 3,
    error: 4,
});
var isDev = process.env.NODE_ENV === "development";
var logger = {
    info: function (message, correlationId) {
        if (isDev || logLevels[logLevel] === 1)
            console.log(correlationId, message);
    },
    debug: function (message, correlationId) {
        if (isDev || logLevels[logLevel] <= 2)
            console.debug(correlationId, message);
    },
    warn: function (message, correlationId) {
        if (isDev || logLevels[logLevel] <= 3) {
            console.warn(correlationId, message);
        }
        if (typeof window !== "undefined" && window.appInsights) {
            window.appInsights.trackTrace({ message: message, severityLevel: 2 });
        }
    },
    error: function (message, correlationId) {
        var _a;
        if (isDev || logLevels[logLevel] <= 4) {
            console.error(correlationId, message);
        }
        if (typeof window !== "undefined" && ((_a = window) === null || _a === void 0 ? void 0 : _a.appInsights)) {
            window.appInsights.trackException({ error: new Error(message), severityLevel: 3 });
        }
    },
};
var Logger = {
    info: function (message, correlationId) {
        if (correlationId === void 0) { correlationId = "root"; }
        logger.info(message, correlationId);
    },
    debug: function (message, correlationId) {
        if (correlationId === void 0) { correlationId = "root"; }
        logger.debug(message, correlationId);
    },
    warn: function (message, correlationId) {
        if (correlationId === void 0) { correlationId = "root"; }
        logger.warn(message, correlationId);
    },
    error: function (message, correlationId) {
        if (correlationId === void 0) { correlationId = "root"; }
        logger.error(message, correlationId);
    },
    stream: {
        write: function (message) {
            logger.debug(message, "root");
        },
    },
};

module.exports = Logger;
