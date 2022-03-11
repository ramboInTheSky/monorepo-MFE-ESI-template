import BFFLogger from "../../core/BFFLogger"
import CacheTagMiddleware, {SetCacheTagsResponseHeader} from "."
import {CACHE_HEADER_CACHE_TAGS} from "../../../config/constants"

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockResponse = {
    get: () => null,
    set: jest.fn(),
}
const mockNext = jest.fn()

describe("Cache Tag Middleware", () => {
    const mockResponseWithHeaders = {
        get: () => "test-headers",
        set: jest.fn(),
    }
    beforeEach(() => {
        CacheTagMiddleware(null, mockResponseWithHeaders, mockNext)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should return a function ", () => {
        expect(CacheTagMiddleware).toBeInstanceOf(Function)
    })
    it("Should append the cache tag header to product specific headers", () => {
        expect(mockResponseWithHeaders.set).toHaveBeenCalledWith("edge-cache-tag", "test-headers, test-productsummaryui")
    })
    it("Should call next ", () => {
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
describe("Cache Tag Middleware, for an asset request", () => {
    beforeEach(() => {
        CacheTagMiddleware(null, mockResponse, mockNext)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should return a function ", () => {
        expect(CacheTagMiddleware).toBeInstanceOf(Function)
    })

    it("Should set the cache tag header", () => {
        expect(mockResponse.set).toHaveBeenCalledWith("edge-cache-tag", "test-productsummaryui")
    })
    it("Should call next ", () => {
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
describe("When an error occurs", () => {
    it("when CacheControlMiddleware is called and res.set return new error - BFF logg and next function should be called", () => {
        mockResponse.set.mockImplementationOnce(() => {
            throw new Error("")
        })
        CacheTagMiddleware(null, mockResponse, mockNext)

        expect(BFFLogger.error).toHaveBeenCalledTimes(1)
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
describe("Given SetCacheTagsResponseHeader", () => {
    it("should set the response headers when present", () => {
        const set = jest.fn()
        const mockRes = {set}
        const mockHeaders = {
            [CACHE_HEADER_CACHE_TAGS]: "test-headers"
        }
        SetCacheTagsResponseHeader(mockRes, mockHeaders)
        expect(set).toBeCalledWith(CACHE_HEADER_CACHE_TAGS, "test-headers")
    })

    it("should not set the response headers when not present", () => {
        const set = jest.fn()
        const mockRes = {set}
        const mockHeaders = null
        SetCacheTagsResponseHeader(mockRes, mockHeaders)
        expect(set).not.toBeCalled()
    })
})
