import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../../env"

const {REACT_APP_API_BASEURL} = env

export class CountriesApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL}`
    version = "v1"
    endpoints = {
        getCountriesListData: {
            routeDefinition: "/ChannelSelector/GetCountrySelection",
            getLocalURL: () => "",
            getRemoteURL: () => "",
            method: HTTPMethod.get,
        },
    }
}

const countriesApi = new CountriesApi()
export default (endpoint: keyof typeof countriesApi.endpoints) => buildExport(countriesApi, endpoint)
