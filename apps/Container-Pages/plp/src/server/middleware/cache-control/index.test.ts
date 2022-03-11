/* eslint-disable */
import BFFLogger from "../../core/BFFLogger"
import CacheControlMiddleware, {StaticAssetsCacheControlMiddleware} from "."

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockRequest = {headers: {test: "yeah"}, originalUrl: "/shop"}

let mockResponse = {
    set: jest.fn(),
    locals: {
        configuration: {
            "monorepo.plp.frontend.cache-control.search": {Value: "no-store"},
            "monorepo.plp.frontend.cache-control.shop": {Value: "86400"},
        },
    },
}

let mockResponseNoValues = {
    set: jest.fn(),
    locals: {
        configuration: {
            "monorepo.plp.frontend.cache-control": {Value: ""},
        },
    },
}

const mockNext = jest.fn()

describe("Cache Middleware", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should return a function ", () => {
        expect(CacheControlMiddleware).toBeInstanceOf(Function)
    })
    it("Should set the cache control header for /search with a directive and call next", () => {
        CacheControlMiddleware({...mockRequest, originalUrl: "/search"}, mockResponse, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, no-store")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header for /shop with a directive and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=86400")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header with a default max-age value and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponseNoValues, mockNext)
        expect(mockResponseNoValues.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=3600")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("when CacheControlMiddleware is called and res.set return new error - BFF logg and next function should be called", () => {
        mockResponse.set.mockImplementationOnce(() => {
            throw new Error("")
        })
        CacheControlMiddleware(mockRequest, mockResponse, mockNext)

        expect(BFFLogger.error).toHaveBeenCalledTimes(1)
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should always set the cache control header with a max-age value as a string and call next", () => {
        StaticAssetsCacheControlMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "public no-transform max-age=604800")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("when StaticAssetsCacheControlMiddleware is called and res.set return new error - BFF logg and next function should be called", () => {
        mockResponse.set.mockImplementationOnce(() => {
            throw new Error("")
        })
        StaticAssetsCacheControlMiddleware(mockRequest, mockResponse, mockNext)

        expect(BFFLogger.error).toHaveBeenCalledTimes(1)
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
