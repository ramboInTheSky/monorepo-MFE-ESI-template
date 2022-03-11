import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../../env"

const {BLOOMREACH_BASE_URL} = env

export class AutocompleteApi implements Api {
    baseURL = `${BLOOMREACH_BASE_URL}`
    version = "v1"
    endpoints = {
        getAutocompleteData: {
            routeDefinition: "/autocomplete",
            getLocalURL: (searchValue, accountId, date, domainKey, authKey, uid2) =>
                `?account_id=${accountId}&auth_key=${authKey}&domain_key=${domainKey}&request_id=${date}&_br_uid_2=${uid2}&request_type=suggest&q=${searchValue}`,
            getRemoteURL: () => "",
            method: HTTPMethod.get,
        },
    }
}

const autocompleteApi = new AutocompleteApi()
export default (endpoint: keyof typeof autocompleteApi.endpoints) => buildExport(autocompleteApi, endpoint)
