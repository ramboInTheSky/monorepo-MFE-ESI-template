import {
    ExternalSearchApiRedirectResponse,
    ExternalGenericSearchApiResponse,
    GenericSearchResponse,
    RedirectResponse,
} from "."

export const isSearchApiResponse = (
    response: ExternalGenericSearchApiResponse,
): response is ExternalSearchApiRedirectResponse =>
    (response as ExternalSearchApiRedirectResponse).redirectUrl !== undefined

export const isRedirectResponse = (response: GenericSearchResponse): response is RedirectResponse =>
    (response as RedirectResponse).statusCode !== undefined
