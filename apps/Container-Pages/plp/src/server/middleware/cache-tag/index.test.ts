import BFFLogger from "../../core/BFFLogger"
import CacheTagMiddleware from "."

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockResponse = {
    get: () => null,
    set: jest.fn(),
}
const mockNext = jest.fn()

jest.mock("../../../config/env", () => ({
    ENVIRONMENT_NAME: "dev",
}))

describe("Cache Tag Middleware", () => {
    const mockResponseWithHeaders = {
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
        expect(mockResponseWithHeaders.set).toHaveBeenCalledWith("edge-cache-tag", "dev-plpui")
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
        expect(mockResponse.set).toHaveBeenCalledWith("edge-cache-tag", "dev-plpui")
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
