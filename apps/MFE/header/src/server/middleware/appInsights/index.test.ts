/* eslint-disable */
import AppInsightsMiddleware from "."

const mockRequest = {headers: {"x-monorepo-correlation-id": "yeah"}}

const appInsightsClient = {commonProperties: null}

const mockNext = jest.fn()

describe("AppInsightsMiddleware", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should return a function ", () => {
        expect(AppInsightsMiddleware).toBeInstanceOf(Function)
    })

    it("Should set the cache control header with a max-age value as number and call next", () => {
        AppInsightsMiddleware(appInsightsClient)(mockRequest, null, mockNext)
        expect(appInsightsClient.commonProperties).toEqual({
            Application: "Header UI",
            "x-monorepo-correlation-id": "yeah",
            "x-monorepo-siteurl": undefined,
            Referer: undefined,
            UserAgent: undefined,
            ENVIRONMENT:
                '{"PRODUCTION":false,"DEVELOPMENT":false,"DEV_URL_OVERRIDE":"","NODE_ENV":"<NODE_ENV>","REACT_APP_BLOB_STORAGE_PATH":"/static-content","REACT_APP_BLOB_STORAGE_SSR_BASEURL":"https://ecmbrowsefdsxeuw.azurefd.net","PORT":3004,"REACT_APP_CDN_BASEURL":"https://xcdn.amido.com/content","REACT_APP_API_BASEURL":"<REACT_APP_API_BASEURL>","REACT_APP_SERVE_PATH_PREFIX":"","ASSETS_PATH":"/headerstatic","REACT_APP_APPINSIGHTS_KEY":"c620fe2b-48e7-4354-be16-d4cc42937bbd","BLOOMREACH_BASE_URL":"https://brm-suggest-0.brsrvr.com/api/v1/suggest/","REACT_APP_MEGANAV_BASEURL":"","REACT_APP_MEGANAV_ASSETS_PATH":"/meganavstatic","GEOLOCATION_BASEURL":"https://services-uat.test.ecomm.systems.next/geolocation","ENVIRONMENT":"dev","REACT_APP_USE_TIME_MACHINE_COOKIE":"false","USE_LOCAL_STATIC_CONTENT":"true"}',
        })
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
