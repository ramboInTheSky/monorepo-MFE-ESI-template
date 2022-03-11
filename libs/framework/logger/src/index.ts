/* istanbul ignore file */
/* eslint-disable no-console */
const logLevel = process.env.LOG_LEVEL || "warn"

const logLevels = Object.freeze({
    info: 1,
    debug: 2,
    warn: 3,
    error: 4,
})

const isDev = process.env.NODE_ENV === "development"

const logger = {
    info: (message: string | object, correlationId) => {
        if (isDev || logLevels[logLevel] === 1) console.log(correlationId, message)
    },
    debug: (message, correlationId) => {
        if (isDev || logLevels[logLevel] <= 2) console.debug(correlationId, message)
    },
    warn: (message, correlationId) => {
        if (isDev || logLevels[logLevel] <= 3) {
            console.warn(correlationId, message)
        }
        if (typeof window !== "undefined" && (window as any).appInsights) {
            ;(window as any).appInsights.trackTrace({message, severityLevel: 2})
        }
    },
    error: (message, correlationId) => {
        if (isDev || logLevels[logLevel] <= 4) {
            console.error(correlationId, message)
        }
        if (typeof window !== "undefined" && (window as any)?.appInsights) {
            ;(window as any).appInsights.trackException({error: new Error(message), severityLevel: 3})
        }
    },
}

const Logger = {
    info(message, correlationId = "root") {
        logger.info(message, correlationId)
    },
    debug(message, correlationId = "root") {
        logger.debug(message, correlationId)
    },
    warn(message, correlationId = "root") {
        logger.warn(message, correlationId)
    },
    error(message, correlationId = "root") {
        logger.error(message, correlationId)
    },
    stream: {
        write(message: string) {
            logger.debug(message, "root")
        },
    },
}

export default Logger
