import { Method } from "axios";
export declare class HeadersModel {
    realm: string | string[];
    territory: string | string[];
    language: string | string[];
}
export declare enum HTTPMethod {
    "get" = 0,
    "post" = 1,
    "delete" = 2,
    "put" = 3,
    "patch" = 4
}
export declare function apiURL(api: Api, realmOnly?: boolean): (endpoint: string) => (apiUrlSettings?: HeadersModel) => (...params: any[]) => string;
export declare function apiMethod(api: Api): (endpoint: string) => Method;
export declare function localEndpoint(api: Api): (endpoint: string) => (...params: any[]) => string;
export declare function routeDefinition(api: Api): (endpoint: string) => string;
export interface Endpoint {
    [key: string]: {
        routeDefinition?: string;
        getRemoteURL: (...params: Array<any>) => string;
        method: HTTPMethod;
        getLocalURL: (...params: Array<any>) => string;
    };
}
export declare function buildExport(api: Api, endpoint: string, realmOnly?: boolean): {
    url: (apiUrlSettings?: HeadersModel) => (...params: any[]) => string;
    method: Method;
    localEndpoint: (...params: any[]) => string;
    routeDefinition: string;
};
export interface Api {
    baseURL: string;
    version: string;
    endpoints: Endpoint;
}
