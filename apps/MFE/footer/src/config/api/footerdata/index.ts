import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../../env"

const {REACT_APP_API_BASEURL, REACT_APP_ENTRYPOINT} = env

export class FooterApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL}${REACT_APP_ENTRYPOINT}`
    version = "v1"
    endpoints = {
        getFooterData: {
            routeDefinition: "/footerdata",
            getLocalURL: () => `/footerdata`,
            getRemoteURL: () => `/footers/Default`,
            method: HTTPMethod.get,
        },
    }
}

const footerApi = new FooterApi()
export default (endpoint: keyof typeof footerApi.endpoints) => buildExport(footerApi, endpoint)
