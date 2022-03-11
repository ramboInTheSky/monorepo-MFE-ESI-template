import BFFLogger from "../../core/BFFLogger"
import RedirectToPdp from "./redirectToPdp"
import axios from "../../core/xhr"
import redirectToApiResponse from "./redirectToApiResponse"
import {getSearchApiResult} from "../../../utils/getSearchApiResult"

jest.mock("../../core/xhr", () => ({
    get: jest.fn(),
}))

jest.mock("../../../utils/createApiRequestHeaders", () => ({
    __esModule: true,
    default: jest.fn(() => ({"x-monorepo-correlation-id": "123", "x-monorepo-time-machine-date": "01-01-2000"})),
}))

jest.mock("../../../utils/getSearchApiResult", () => ({
    getSearchApiResult: jest.fn(),
}))

jest.mock("./redirectToApiResponse", () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockapiUrlSettings = {
    language: "en",
    realm: "Amido",
    territory: "GB",
}

const mockRequest = {
    query: {
        w: "TEST SEARCH TERM",
    },
}

const mockResponse = {
    send: jest.fn(),
    status: jest.fn(() => ({
        send: jest.fn(),
        end: jest.fn(),
    })),
}

const headers = {"x-monorepo-correlation-id": "123", "x-monorepo-time-machine-date": "01-01-2000"}

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
}))

describe("Given a RedirectToPdp", () => {
    describe("When data is returned", () => {
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {colourways: [{url: "www.test.com"}]}})
            })
            const itemNumber = 12345
            await RedirectToPdp(
                mockapiUrlSettings as any,
                mockResponse as any,
                mockRequest as any,
                headers as any,
                itemNumber as any,
            )
            done()
        })
        it("should get the url for the item number", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).toHaveBeenCalledWith("ironman/Amido/GB/en/v1/products/12345", {
                params: {fields: "colourways.url"},
            })
        })
        it("should return a redirect", () => {
            expect(mockResponse.send).toHaveBeenCalledWith({
                statusCode: 302,
                url: "www.test.com",
            })
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
    describe("When the product summary api does not return data", () => {
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {}})
            })
            ;(getSearchApiResult as jest.Mock).mockImplementation(() => ({status: 200, data: {redirectUrl: "/test"}}))
            const itemNumber = 12345
            await RedirectToPdp(
                mockapiUrlSettings as any,
                mockResponse as any,
                mockRequest as any,
                headers as any,
                itemNumber as any,
            )
            done()
        })
        it("should call redirectToResponseUrl", () => {
            expect(redirectToApiResponse).toHaveBeenCalled()
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })

    describe("When the item number is evaluated as valid but the product summary api returns a 404", () => {
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject(new Error("No product summary data for item"))
            })

            const itemNumber = 123456
            await RedirectToPdp(
                mockapiUrlSettings as any,
                mockResponse as any,
                mockRequest as any,
                headers as any,
                itemNumber as any,
            )
            done()
        })
        it("should call redirectToResponseUrl", () => {
            expect(redirectToApiResponse).toHaveBeenCalled()
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
    describe("When the item number is evaluated as valid and the product summary api does return data", () => {
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {colourways: [{url: "www.test.com"}]}})
            })
            const itemNumber = 12345
            await RedirectToPdp(
                mockapiUrlSettings as any,
                mockResponse as any,
                mockRequest as any,
                headers as any,
                itemNumber as any,
            )
            done()
        })
        it("should get the url for the item number", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).toHaveBeenCalledWith("ironman/Amido/GB/en/v1/products/12345", {
                params: {fields: "colourways.url"},
            })
        })
        it("should return a redirect", () => {
            expect(mockResponse.send).toHaveBeenCalledWith({
                statusCode: 302,
                url: "www.test.com",
            })
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
    describe("When the item number is evaluated as valid but the product summary api does not return data and the Search API returns invalid data", () => {
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {}})
            })
            ;(getSearchApiResult as jest.Mock).mockImplementation(() => ({status: 200, data: {redirectUrl: undefined}}))

            const itemNumber = 12345
            await RedirectToPdp(
                mockapiUrlSettings as any,
                mockResponse as any,
                mockRequest as any,
                headers as any,
                itemNumber as any,
            )
            done()
        })
        it("should not call redirectToApiResponse", () => {
            expect(redirectToApiResponse).not.toHaveBeenCalled()
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
    describe("When getting product summaries throws an error", () => {
        beforeEach(async done => {
            const newMockRequest = {
                ...mockRequest,
                headers: {
                    isError: true,
                },
            }
            const itemNumber = 12345
            await RedirectToPdp(
                mockapiUrlSettings as any,
                mockResponse as any,
                newMockRequest as any,
                headers as any,
                itemNumber as any,
            )
            done()
        })

        it("should respond with the correct failure response", () => {
            expect(mockResponse.status).toHaveBeenCalledWith(500)
        })

        it("should log the error", () => {
            // eslint-disable-next-line
            expect(BFFLogger.error).toHaveBeenCalledWith(expect.any(Error))
        })
    })
})
