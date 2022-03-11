/* eslint-disable */
import AppInsightsMiddleware from "."

const mockRequest = {headers: {"x-monorepo-correlation-id": "yeah", "x-monorepo-time-machine-date": "01-01-2000"}}

const appInsightsClient = {commonProperties: null, context: {tags: {}, keys: {cloudRole: "cloudRoleKey"}}}

const mockNext = jest.fn()

describe("AppInsightsMiddleware", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should return a function ", () => {
        expect(AppInsightsMiddleware).toBeInstanceOf(Function)
    })

    it("Should set the the custom properties to the appIinsights handler and call next", () => {
        AppInsightsMiddleware(appInsightsClient as any)(mockRequest, null, mockNext)
        expect(appInsightsClient.commonProperties).toEqual({
            Application: "PLP UI",
            "x-monorepo-correlation-id": "yeah",
            "x-monorepo-time-machine-date": "01-01-2000",
            Referer: undefined,
            UserAgent: undefined,
            "x-monorepo-siteurl": undefined,
            ENVIRONMENT:
                '{"PRODUCTION":false,"DEVELOPMENT":false,"REACT_APP_BLOB_STORAGE_PATH":"/static-content","REACT_APP_INCLUDE_VENDORS":false,"REACT_APP_ENABLE_CYPRESS_SETTINGS":false,"REACT_APP_BLOB_STORAGE_SSR_BASEURL":"https://ecmbrowsefdsxeuw.azurefd.net","PORT":3000,"NODE_ENV":"batman","REACT_APP_CDN_BASEURL":"spiderman","REACT_APP_API_BASEURL_SEARCH":"superman","REACT_APP_API_BASEURL_PRODUCT_SUMMARY":"ironman","REACT_APP_API_BASEURL_SEARCH_BANNER":"banneresiurl","REACT_APP_SERVE_PATH_PREFIX":"","REACT_APP_APP_URL":"","REACT_APP_HEADER_BASEURL":"","REACT_APP_HEADER_ASSETS_PATH":"/headerstatic","REACT_APP_MEGANAV_BASEURL":"","REACT_APP_FOOTER_BASEURL":"","REACT_APP_FOOTER_ASSETS_PATH":"/footerstatic","REACT_APP_PROD_SUMM_BASEURL":"esiurl","REACT_APP_PROD_SUMM_ASSETS_PATH":"/productsummarystatic","REACT_APP_USE_TIME_MACHINE_COOKIE":"false","ASSETS_PATH":"/plpstatic","REACT_APP_APPINSIGHTS_KEY":"c620fe2b-48e7-4354-be16-d4cc42937bbd","USE_LOCAL_STATIC_CONTENT":"true"}',
        })
        expect(appInsightsClient.context.tags).toEqual({
            cloudRoleKey: "monorepo-plp-frontend",
        })
        expect(mockNext).toHaveBeenCalledTimes(1)
    })

    it("Should call next", () => {
        AppInsightsMiddleware(null)(mockRequest, null, mockNext)
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
