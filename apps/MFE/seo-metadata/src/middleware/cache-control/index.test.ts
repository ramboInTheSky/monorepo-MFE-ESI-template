/* eslint-disable */
import BFFLogger from "../core/BFFLogger"
import {CacheControlMiddleware} from "."

jest.mock("../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const mockRequest = {headers: {test: "yeah"}}

let mockResponse = {
    set: jest.fn(),
    locals: {
        configuration: {
            "seometadata.ui.cache-control": {
                Value: 604800,
            },
            "seometadata.ui.enabled": {
                Value: false,
            },
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
        expect(mockResponse.set).toHaveBeenCalledWith("Cache-Control", "max-age=604800")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("Should set the cache control header with the default  and call next", () => {
        let newMockResponse = {
            set: jest.fn(),
            locals: {
                configuration: {
                    "seometadata.ui.enabled": {
                        Value: false,
                    },
                },
            },
        }

        CacheControlMiddleware(mockRequest, newMockResponse, mockNext)
        expect(newMockResponse.set).toHaveBeenCalledWith("Cache-Control", "max-age=604800")
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
    it("should call BFF logg and next function when theres an error", () => {
        mockResponse.set.mockImplementationOnce(() => {
            throw new Error("")
        })
        CacheControlMiddleware(mockRequest, mockResponse, mockNext)

        expect(BFFLogger.error).toHaveBeenCalledTimes(1)
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
