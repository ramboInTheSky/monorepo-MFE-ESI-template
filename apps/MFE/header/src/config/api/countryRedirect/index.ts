import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"

export class CountryRedirectApi implements Api {
    baseURL = ``
    version = "v1"
    endpoints = {
        getGeolocationData: {
            routeDefinition: "",
            getLocalURL: (ipAddress: string | null) =>
                `/NX/CountryRedirect${ipAddress ? `?ipaddress=${ipAddress}` : ""}`,
            getRemoteURL: () => "",
            method: HTTPMethod.get,
        },
        sessionUpdate: {
            routeDefinition: "",
            getLocalURL: () => "/CountryRedirect/Update",
            getRemoteURL: () => "",
            method: HTTPMethod.post,
        },
    }
}

const countryRedirectApi = new CountryRedirectApi()
export default (endpoint: keyof typeof countryRedirectApi.endpoints) => buildExport(countryRedirectApi, endpoint)
