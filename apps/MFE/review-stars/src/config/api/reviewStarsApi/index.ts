import {Api, HTTPMethod, buildExport} from "@monorepo/apiconfig"
import env from "../../env"

const {REACT_APP_API_BASEURL} = env

class ReviewStarsApi implements Api {
    baseURL = `${REACT_APP_API_BASEURL}`
    version = "v1"
    endpoints = {
        getReviewStars: {
            routeDefinition: "/products/:itemNumber/star-rating",
            getLocalURL: (itemNumber: string) => `/products/${itemNumber}/star-rating`,
            getRemoteURL: (itemNumber: string) => `/products/${itemNumber}/star-rating`,
            method: HTTPMethod.get,
        },
    }
}

const reviewStarsApi = new ReviewStarsApi()
export default (endpoint: keyof typeof reviewStarsApi.endpoints) => buildExport(reviewStarsApi, endpoint)
