/* eslint-disable */
import CacheControlMiddleware, {StaticAssetsCacheControlMiddleware} from "."
import BFFLogger from "../../core/BFFLogger"

const mockRequest = {headers: {test: "yeah"}}

let mockResponse = {
    set: jest.fn(),
    locals: {
        configuration: {
            "header.frontend.cache-control.max-age": {Value: 666},
            "header.frontend.cache-control.default-header.max-age": {Value: 111},
        },
    },
}

let mockResponseDirective = {
    set: jest.fn(),
    locals: {
        configuration: {
            "header.frontend.cache-control.max-age": {Value: "no-store"},
            "header.frontend.cache-control.default-header.max-age": {Value: "no-store"},
        },
    },
}

let mockResponseNoValues = {
    set: jest.fn(),
    locals: {
        configuration: {
            "header.frontend.cache-control.max-age": {Value: ""},
            "header.frontend.cache-control.default-header.max-age": {Value: ""},
        },
    },
}

let mockResponseStringValues = {
    set: jest.fn(),
    locals: {
        configuration: {
            "header.frontend.cache-control.max-age": {Value: "666"},
            "header.frontend.cache-control.default-header.max-age": {Value: "111"},
        },
    },
}

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockNext = jest.fn()

describe("Cache Middleware", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should return a function ", () => {
        expect(CacheControlMiddleware).toBeInstanceOf(Function)
    })

    it("Should set the cache control header with a max-age value as number and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=666")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header and call next with default.header", () => {
        CacheControlMiddleware(mockRequest, {...mockResponse, isDefaultHeader: true}, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=111")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header with a directive and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponseDirective, mockNext)
        expect(mockResponseDirective.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, no-store")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header with a directive and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponseDirective, mockNext)
        expect(mockResponseDirective.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, no-store")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header with a default max-age value and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponseNoValues, mockNext)
        expect(mockResponseNoValues.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=3600")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header with a max-age value as a string and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponseStringValues, mockNext)
        expect(mockResponseStringValues.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=666")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should always set the cache control header with a max-age value as a string and call next", () => {
        StaticAssetsCacheControlMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith(
            "Cache-Control",
            "public, no-transform, max-age=604800, immutable",
        )
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should throw an error", () => {
        CacheControlMiddleware(mockRequest, null, mockNext)
        expect(BFFLogger.error).toBeCalledWith(expect.any(Error))
    })
})
