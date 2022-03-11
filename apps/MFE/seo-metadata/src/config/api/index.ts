import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../env"

const {REACT_APP_API_BASEURL} = env

export class SeoMetadataApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL}/api/seo-metadata`
    version = "v1"
    endpoints = {
        getSeoHeadings: {
            routeDefinition: `/seo/seo-headings*?`,
            getLocalURL: () => "",
            getRemoteURL: (urlPath: string) => `/seo-headings/${urlPath}`,
            method: HTTPMethod.get,
        },
        getSeoMetadata: {
            routeDefinition: `/seo/seo-metadata*?`,
            getLocalURL: () => "",
            getRemoteURL: (urlPath: string) => `/seo-metadata/${urlPath}`,
            method: HTTPMethod.get,
        },
    }
}

const seoMetadataApi = new SeoMetadataApi()
export default (endpoint: keyof typeof seoMetadataApi.endpoints) => buildExport(seoMetadataApi, endpoint)
