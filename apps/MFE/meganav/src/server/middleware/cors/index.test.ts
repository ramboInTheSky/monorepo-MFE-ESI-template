/* eslint-disable */
import CORSMiddleware from "."

const mockRequest = {headers: {test: "yeah"}}

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
        expect(mockResponse.header).toHaveBeenCalledWith("Access-Control-Allow-Origin", ["*"])
        expect(mockResponse.header).toHaveBeenCalledWith("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,POST,DELETE")
        expect(mockResponse.header).toHaveBeenCalledWith("Access-Control-Allow-Headers", ["*"])
        expect(mockResponse.header).toHaveBeenCalledWith("Access-Control-Allow-Headers", "x-monorepo-viewport-size")
        expect(mockResponse.header).toHaveBeenCalledTimes(4)
        expect(mockNext).toHaveBeenCalledTimes(1)
    })
})
