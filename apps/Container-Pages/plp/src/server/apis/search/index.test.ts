// eslint-disable-next-line import/no-extraneous-dependencies
import logger from "@monorepo/core-logger"
import axios from "../../core/xhr"
import productsRouter, {getProductsHandler} from "."
import RedirectToPdp from "./redirectToPdp"

jest.mock("../../../utils/createApiRequestHeaders", () => ({
    __esModule: true,
    default: jest.fn(() => ({"x-monorepo-correlation-id": "123", "x-monorepo-time-machine-date": "01-01-2000"})),
}))

jest.mock("../../../utils/normaliseApiDataToState", () => ({
    __esModule: true,
    default: jest.fn(() => ({items: []})),
}))
jest.mock("../../../utils/httpUrlTrimmer", () => ({
    __esModule: true,
    httpUrlTrimmer: jest.fn(() => "www.test.co.uk"),
}))

jest.mock("./redirectToPdp", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("./redirectToApiResponse", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("../../core/xhr", () => ({
    get: jest.fn(),
}))

jest.mock("@monorepo/utils", () => ({
    getSettingsHeadersAsObject: jest.fn(headers => {
        if (headers.isError) throw new Error("ERROR")
        return {
            language: "en",
            realm: "Amido",
            territory: "GB",
        }
    }),
}))

const mockSend = jest.fn()
const mockStatus = jest.fn(() => ({end: jest.fn()}))
const mockResponse = {
    send: mockSend,
    status: mockStatus,
}
describe("Given a search api", () => {
    describe("When getting product summaries getProductsHandler() and more than 1 items are returned, and criterial url contain protocol", () => {
        const mockRequestHttps = {
            headers: {
                "x-monorepo-correlation-id": "123",
                "x-monorepo-time-machine-date": "01-01-2000",
            },
            query: {criteria: "https://www.test.co.uk", type: "Keyword", searchTerm: "1234"},
        }

        const expectedMockRequest = {
            headers: {
                "x-monorepo-correlation-id": "123",
                "x-monorepo-time-machine-date": "01-01-2000",
            },
            query: {criteria: "www.test.co.uk", type: "Keyword", searchTerm: "1234"},
        }

        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {items: [{}, {}]}})
            })
            await getProductsHandler(mockRequestHttps as any, mockResponse)

            done()
        })

        it("should send the data back and the criteria should not have the https:// anymore", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockSend).toHaveBeenCalledWith({items: []})

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).toHaveBeenCalledWith("superman/Amido/GB/en/v1/item-numbers", {
                params: expectedMockRequest.query,
                headers: {
                    "x-monorepo-correlation-id": "123",
                    "x-monorepo-time-machine-date": "01-01-2000",
                },
            })

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).not.toHaveBeenCalledWith("superman/Amido/GB/en/v1/item-numbers", {
                params: {...expectedMockRequest.query, criteria: "https://www.test.co.uk"},
                headers: {
                    "x-monorepo-correlation-id": "123",
                    "x-monorepo-time-machine-date": "01-01-2000",
                },
            })
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })

    describe("When an error is thrown", () => {
        const mockErrorRequest = {
            headers: {mockHeaders: "", isError: true},
            params: {
                pid: "123",
            },
        }
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject(new Error("something bad happened"))
            })

            await getProductsHandler(mockErrorRequest as any, mockResponse)
            done()
        })

        it("should call the logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith(expect.any(Error))
        })

        it("should set the status code to 500", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockStatus).toHaveBeenCalledWith(500)
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })

    describe("When search term is a valid item number", () => {
        beforeAll(async done => {
            const mockReqValidItem = {
                headers: {
                    "x-monorepo-correlation-id": "123",
                    "x-monorepo-time-machine-date": "01-01-2000",
                },
                query: {criteria: "criteria=www.test.co.uk", type: "Keyword", searchTerm: "123456"},
            }

            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {items: [{itemNumber: "123456"}]}})
            })
            await getProductsHandler(mockReqValidItem as any, mockResponse)

            done()
        })

        it("should call RedirectToPdp", () => {
            expect(RedirectToPdp).toHaveBeenCalled()
        })
    })
})

describe("Given a products router", () => {
    it("should define a 'get' route with the correct parameters", () => {
        const mockExpressRouter = {get: jest.fn()}

        productsRouter(mockExpressRouter as any)

        expect(mockExpressRouter.get).toHaveBeenCalledWith("/products", expect.any(Function))
    })
})
