import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../../env"

const {REACT_APP_API_BASEURL} = env

export class HeaderApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL}`
    version = "v1"
    endpoints = {
        getHeaderData: {
            routeDefinition: `${env.REACT_APP_SERVE_PATH_PREFIX}/headerdata`,
            getLocalURL: () => `${env.REACT_APP_SERVE_PATH_PREFIX}/headerdata`,
            getRemoteURL: () => `/headers/Default`,
            method: HTTPMethod.get,
        },
    }
}

const headerApi = new HeaderApi()
export default (endpoint: keyof typeof headerApi.endpoints) => buildExport(headerApi, endpoint)
