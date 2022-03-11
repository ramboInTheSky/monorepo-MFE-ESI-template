/* eslint-disable */
import CacheControlMiddleware, {StaticAssetsCacheControlMiddleware, SecondaryMeganavCacheControlMiddleware} from "."

const mockRequest = {headers: {test: "yeah"}}

let mockResponse = {
    set: jest.fn(),
    locals: {
        configuration: {
            "meganav.frontend.cache-control.max-age": {Value: 666},
            "meganav.frontend.cache-control.fallback-meganav.max-age": {Value: 111},
        },
    },
}

let mockResponseDirective = {
    set: jest.fn(),
    locals: {
        configuration: {
            "meganav.frontend.cache-control.max-age": {Value: "no-store"},
            "meganav.frontend.cache-control.fallback-meganav.max-age": {Value: "no-store"},
        },
    },
}

let mockResponseNoValues = {
    set: jest.fn(),
    locals: {
        configuration: {
            "meganav.frontend.cache-control.max-age": {Value: ""},
            "meganav.frontend.cache-control.fallback-meganav.max-age": {Value: ""},
        },
    },
}

let mockResponseStringValues = {
    set: jest.fn(),
    locals: {
        configuration: {
            "meganav.frontend.cache-control.max-age": {Value: "666"},
            "meganav.frontend.cache-control.fallback-meganav.max-age": {Value: "111"},
        },
    },
}

const mockNext = jest.fn()

describe("themeMiddleware", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("CacheControlMiddleware Should return a function ", () => {
        expect(CacheControlMiddleware).toBeInstanceOf(Function)
    })
    it("StaticAssetsCacheControlMiddleware Should return a function ", () => {
        expect(StaticAssetsCacheControlMiddleware).toBeInstanceOf(Function)
    })
    it("SecondaryMeganavCacheControlMiddleware Should return a function ", () => {
        expect(SecondaryMeganavCacheControlMiddleware).toBeInstanceOf(Function)
    })

    it("Should set the cache control header with a max-age value as number and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=666")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header and call next with default meganav", () => {
        CacheControlMiddleware(mockRequest, {...mockResponse, isFallbackMeganav: true}, mockNext)
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
    it("SecondaryMeganavCacheControlMiddleware Should always set the cache control header with a max-age value as a string and call next", () => {
        SecondaryMeganavCacheControlMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=540, immutable")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
