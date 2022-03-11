/// <reference types="node" />
import {IncomingHttpHeaders} from "http"
export declare const getCustomHeader: (
    headers: IncomingHttpHeaders,
    customHeader: string,
) => {
    [x: string]: string | string[]
}
export declare const getSettingsHeaders: (headers: IncomingHttpHeaders) => {
    "x-monorepo-language": string | string[]
    "x-monorepo-realm": string | string[]
    "x-monorepo-territory": string | string[]
    "x-monorepo-correlation-id": string | string[]
    "x-monorepo-viewport-size": string | string[]
    "x-monorepo-siteurl": string | string[]
    "x-monorepo-time-machine-date": string | string[]
    "x-monorepo-persona": string | string[]
}
export declare const getSettingsHeadersAsObject: (headers: IncomingHttpHeaders) => {
    language: string | string[]
    realm: string | string[]
    territory: string | string[]
    viewportSize: string | string[]
    persona: string | string[]
    timeMachine: string | string[]
}
export default getSettingsHeaders
