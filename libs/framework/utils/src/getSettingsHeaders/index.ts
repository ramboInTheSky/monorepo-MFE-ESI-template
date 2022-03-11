import {IncomingHttpHeaders} from "http"

export const getCustomHeader = (headers: IncomingHttpHeaders, customHeader: string) => ({
    [customHeader]: headers[customHeader],
})

// update CORSMiddleware file if any new headers is added

export const getSettingsHeaders = (headers: IncomingHttpHeaders) => {
    validateHeaders(headers, "getSettingsHeaders")
    return {
        ...(headers["x-monorepo-persona"] && {
            "x-monorepo-persona": headers["x-monorepo-persona"],
        }),
        ...(headers["x-monorepo-time-machine-date"] && {
            "x-monorepo-time-machine-date": headers["x-monorepo-time-machine-date"],
        }),
        "x-monorepo-language": headers["x-monorepo-language"],
        "x-monorepo-realm": headers["x-monorepo-realm"],
        "x-monorepo-territory": headers["x-monorepo-territory"],
        "x-monorepo-correlation-id": headers["x-monorepo-correlation-id"],
        "x-monorepo-viewport-size": headers["x-monorepo-viewport-size"] || "",
        "x-monorepo-siteurl": headers["x-monorepo-siteurl"] || "",
    }
}

export const getSettingsHeadersAsObject = (headers: IncomingHttpHeaders) => {
    validateHeaders(headers, "getSettingsHeadersAsObject")
    return {
        language: headers["x-monorepo-language"],
        realm: headers["x-monorepo-realm"],
        territory: headers["x-monorepo-territory"],
        viewportSize: headers["x-monorepo-viewport-size"] || "",
        persona: headers["x-monorepo-persona"] || undefined,
        timeMachine: headers["x-monorepo-time-machine-date"] || undefined,
    }
}

const validateHeaders = (headers, caller) => {
    if (
        !headers ||
        !headers["x-monorepo-language"] ||
        !headers["x-monorepo-realm"] ||
        !headers["x-monorepo-territory"] ||
        !headers["x-monorepo-correlation-id"]
    )
        throw new Error(`${caller} called with no headers`)
}

export default getSettingsHeaders
