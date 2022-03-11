/* eslint-disable */
import BFFLogger from "../../core/BFFLogger"
import CacheControlMiddleware, {SetLastModifiedResponseHeader, StaticAssetsCacheControlMiddleware} from "."
import {CACHE_HEADER_LAST_MODIFIED} from "../../../config/constants"

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockRequest = {headers: {test: "yeah"}}

let mockResponse = {
    set: jest.fn(),
    locals: {
        configuration: {
            "productsummary.frontend.cache-control.max-age": {Value: 666},
            "productsummary.frontend.cache-control.default-productsummary.max-age": {Value: 111},
        },
    },
}

let mockResponseDirective = {
    set: jest.fn(),
    locals: {
        configuration: {
            "productsummary.frontend.cache-control.max-age": {Value: "no-store"},
            "productsummary.frontend.cache-control.default.productsummary.max-age": {Value: "no-store"},
        },
    },
}

let mockResponseNoValues = {
    set: jest.fn(),
    locals: {
        configuration: {
            "productsummary.frontend.cache-control.max-age": {Value: ""},
            "productsummary.frontend.cache-control.default.productsummary.max-age": {Value: ""},
        },
    },
}

let mockResponseStringValues = {
    set: jest.fn(),
    locals: {
        configuration: {
            "productsummary.frontend.cache-control.max-age": {Value: "666"},
            "productsummary.frontend.cache-control.default-productsummary.max-age": {Value: "111"},
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

    it("Should set the cache control header with a max-age value as number and call next", () => {
        CacheControlMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "public, no-transform, max-age=666")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header and call next with default.header", () => {
        CacheControlMiddleware(mockRequest, {...mockResponse, isDefaultProductSummary: true}, mockNext)
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
        expect(mockResponse.set).toHaveBeenCalledWith(
            "Cache-Control",
            "public, no-transform, max-age=604800, immutable",
        )
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

describe("Given SetLastModifiedResponseHeader", () => {
    it("should set the response headers when present", () => {
        const set = jest.fn()
        const mockRes = {set}
        const mockHeaders = {
            [CACHE_HEADER_LAST_MODIFIED]: "test-headers",
        }
        SetLastModifiedResponseHeader(mockRes, mockHeaders)
        expect(set).toBeCalledWith(CACHE_HEADER_LAST_MODIFIED, "test-headers")
    })

    it("should not set the response headers when not present", () => {
        const set = jest.fn()
        const mockRes = {set}
        const mockHeaders = null
        SetLastModifiedResponseHeader(mockRes, mockHeaders)
        expect(set).not.toBeCalled()
    })
})
