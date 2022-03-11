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
            Application: "Footer UI",
            "x-monorepo-correlation-id": "yeah",
        })
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
