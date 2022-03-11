import {Method} from "axios"

export class HeadersModel {
    realm: string | string[]
    territory: string | string[]
    language: string | string[]
}

export enum HTTPMethod {
    "get",
    "post",
    "delete",
    "put",
    "patch",
}

export function apiURL(api: Api, realmOnly?: boolean) {
    return (endpoint: string) => (apiUrlSettings?: HeadersModel) => (...params: Array<any>) => {
        let configUrl = ""
        if (apiUrlSettings) {
            if (realmOnly) {
                configUrl = `/${apiUrlSettings.realm}`
            } else {
                configUrl = `/${apiUrlSettings.realm}/${apiUrlSettings.territory}/${apiUrlSettings.language}`
            }
        }
        return `${api.baseURL}${configUrl}/${api.version}${api.endpoints[endpoint].getRemoteURL(...params)}`
    }
}

export function apiMethod(api: Api) {
    return (endpoint: string) => HTTPMethod[api.endpoints[endpoint].method] as Method
}

export function localEndpoint(api: Api) {
    return (endpoint: string) => (...params: Array<any>) => api.endpoints[endpoint].getLocalURL(...params)
}

export function routeDefinition(api: Api) {
    return (endpoint: string) => api.endpoints[endpoint].routeDefinition
}

export interface Endpoint {
    [key: string]: {
        routeDefinition?: string
        getRemoteURL: (...params: Array<any>) => string
        method: HTTPMethod
        getLocalURL: (...params: Array<any>) => string
    }
}

export function buildExport(api: Api, endpoint: string, realmOnly?: boolean) {
    return {
        url: apiURL(api, realmOnly)(endpoint),
        method: apiMethod(api)(endpoint),
        localEndpoint: api.endpoints[endpoint].getLocalURL ? localEndpoint(api)(endpoint) : null,
        routeDefinition: api.endpoints[endpoint].getLocalURL ? routeDefinition(api)(endpoint) : null,
    }
}

export interface Api {
    baseURL: string
    version: string
    endpoints: Endpoint
}
