/* eslint-disable */
import CORSMiddleware from "."

const mockRequest = {headers: {test: "yeah", referer: "http://localhost:3009/"}}

let mockResponse = {
    header: jest.fn(),
}

const mockNext = jest.fn()

describe("themeMiddleware", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("Should return a function ", () => {
        expect(CORSMiddleware).toBeInstanceOf(Function)
    })

    it("Should set the cache control header with a max-age value as number and call next", () => {
        CORSMiddleware(mockRequest, mockResponse, mockNext)
        expect(mockResponse.header).toHaveBeenCalledWith("Access-Control-Allow-Origin", "http://localhost:3009")
        expect(mockResponse.header).toHaveBeenCalledWith("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE")
        expect(mockResponse.header).toHaveBeenCalledWith("Access-Control-Allow-Credentials", "true")
        expect(mockResponse.header).toHaveBeenCalledWith("Access-Control-Allow-Headers", [
            "content-type, pragma, accept, x-monorepo-territory, x-monorepo-realm, x-monorepo-language, x-monorepo-correlation-id, x-monorepo-session-id, x-monorepo-siteurl",
        ])
        expect(mockResponse.header).toHaveBeenCalledTimes(4)
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
