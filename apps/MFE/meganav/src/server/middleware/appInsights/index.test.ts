/* eslint-disable */
import AppInsightsMiddleware from "."

const mockRequest = {headers: {"x-monorepo-correlation-id": "yeah", "x-monorepo-time-machine-date": "01-01-2000"}}

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
            Application: "MegaNav UI",
            "x-monorepo-correlation-id": "yeah",
            "x-monorepo-time-machine-date": "01-01-2000",
            ENVIRONMENT:
                '{"PRODUCTION":false,"DEVELOPMENT":false,"REACT_APP_DEV_URL_OVERRIDE":"","NODE_ENV":"<NODE_ENV>","REACT_APP_BLOB_STORAGE_PATH":"/static-content","REACT_APP_BLOB_STORAGE_SSR_BASEURL":"https://ecmbrowsefdsxeuw.azurefd.net","PORT":3005,"REACT_APP_CDN_BASEURL":"https://xcdn.amido.com/content","REACT_APP_API_BASEURL":"<REACT_APP_API_BASEURL>","REACT_APP_APPINSIGHTS_KEY":"c620fe2b-48e7-4354-be16-d4cc42937bbd","REACT_APP_SERVE_PATH_PREFIX":"","REACT_APP_USE_TIME_MACHINE_COOKIE":"false","ASSETS_PATH":"/meganavstatic"}',
            Referer: undefined,
            UserAgent: undefined,
            "x-monorepo-siteurl": undefined,
        })
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
