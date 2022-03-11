import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../../env"

const {REACT_APP_API_BASEURL, ASSETS_PATH} = env

export class MegaNavApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL}`
    version = "v1"
    endpoints = {
        getPrimaryNavData: {
            routeDefinition: "/appdata",
            getLocalURL: () => `/appdata`,
            getRemoteURL: () => `/primary-items/Home`,
            method: HTTPMethod.get,
        },
        getSecondaryNavData: {
            routeDefinition: "/secondary-items/:page/:department",
            getLocalURL: (page: string, department: string) => `/secondary-items/${page}/${department}`,
            getRemoteURL: (page: string, department: string) => `/primary-items/${page}/secondary-items/${department}`,
            method: HTTPMethod.get,
        },
        getSeoData: {
            routeDefinition: `${ASSETS_PATH}/seo-content/:page/:department*?`,
            getLocalURL: () => "",
            getRemoteURL: (page: string, department: string) => `/seo-content/${page}/${department}`,
            method: HTTPMethod.get,
        },
    }
}

const meganavApi = new MegaNavApi()
export default (endpoint: keyof typeof meganavApi.endpoints) => buildExport(meganavApi, endpoint)
