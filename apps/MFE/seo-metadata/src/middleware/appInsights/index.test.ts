/* eslint-disable */
import AppInsightsMiddleware from "."

const mockRequest = {headers: {"x-monorepo-correlation-id": "12334-1233444"}}

const appInsightsClient = {commonProperties: null, context: {tags: {}, keys: {cloudRole: "cloudRoleKey"}}}

const mockNext = jest.fn()

describe("AppInsightsMiddleware", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should return a function ", () => {
        expect(AppInsightsMiddleware).toBeInstanceOf(Function)
    })

    it("Should set the cache control header with a max-age value as number and call next", () => {
        AppInsightsMiddleware(appInsightsClient as any)(mockRequest, null, mockNext)
        expect(appInsightsClient.commonProperties).toEqual({
            Application: "SEO Metadata",
            "x-monorepo-correlation-id": "12334-1233444",
        })
        expect(appInsightsClient.context.tags).toEqual({
            cloudRoleKey: seo-metadata-ui",
        })
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
