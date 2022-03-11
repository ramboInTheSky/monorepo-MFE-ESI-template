// eslint-disable-next-line import/no-extraneous-dependencies
import logger from "../../core/BFFLogger"
import axios from "../../core/xhr"
import productRouter, {getProductSummaryHandler} from "."
import {BASELINECSS_GENERATE_CSS_ITEM_NUMBER} from "../../../config/settings"
import BASELINECSS from "./baselinecssdata"
import mapProductSummaryApiToDuckState from "../../../utils/mapProductSummaryApiToDuckState"
import {SetLastModifiedResponseHeader} from "../../middleware/cache-control"
import {SetCacheTagsResponseHeader} from "../../middleware/cache-tag"

jest.mock("../../../utils/mapProductSummaryApiToDuckState", () => ({
    __esModule: true,
    default: jest.fn(() => ({mappedData: {items: []}})),
}))
jest.mock("../../middleware/cache-control", () => ({
    SetLastModifiedResponseHeader: jest.fn(),
}))
jest.mock("../../middleware/cache-tag", () => ({
    SetCacheTagsResponseHeader: jest.fn(),
}))
jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
}))
jest.mock("../../core/xhr", () => ({
    get: jest.fn(() => Promise.resolve({data: {items: []}, headers: {"test-headers": "itsatest"}})),
}))

jest.mock("@monorepo/utils", () => ({
    getSettingsHeaders: jest.fn(headers => {
        if (headers.isError) throw new Error("ERROR")
        return {"x-monorepo-language": "en", "x-monorepo-realm": "Amido", "x-monorepo-territory": "GB"}
    }),
    getSettingsHeadersAsObject: jest.fn(() => ({
        language: "en",
        realm: "Amido",
        territory: "GB",
    })),
}))

const mockRequest = {
    headers: {mockHeaders: "", "x-monorepo-realm": "amido"},
    params: {
        itemNumber: "123",
    },
    siteUrl: {url: "test site url"},
}
const mockSend = jest.fn()
const mockStatus = jest.fn(() => ({end: jest.fn()}))
const mockResponse = {
    send: mockSend,
    sendStatus: mockStatus,
    locals: {configuration: "test config"},
}
describe("Given a search api", () => {
    describe("When getting product summaries getProductSummaryHandler()", () => {
        beforeAll(async done => {
            await getProductSummaryHandler(mockRequest, mockResponse)

            done()
        })
        it("should get data for Footer", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).toHaveBeenCalledWith("superman/Amido/GB/en/v1/products/123", {
                headers: {
                    "x-monorepo-language": "en",
                    "x-monorepo-realm": "Amido",
                    "x-monorepo-territory": "GB",
                },
            })
        })

        it("should call data mapper with the response data", () => {
            expect(mapProductSummaryApiToDuckState).toHaveBeenCalledWith(
                {items: []},
                "test config",
                "test site url",
                "next",
            )
        })

        it("should call SetLastModifiedResponseHeader", () => {
            expect(SetLastModifiedResponseHeader).toHaveBeenCalledWith(mockResponse, {
                "test-headers": "itsatest",
            })
        })
        it("should call SetCacheTagsResponseHeader", () => {
            expect(SetCacheTagsResponseHeader).toHaveBeenCalledWith(mockResponse, {
                "test-headers": "itsatest",
            })
        })

        it("should send the data back", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockSend).toHaveBeenCalledWith({mappedData: {items: []}})
        })
    })

    describe("When getting product summaries getProductSummaryHandler() with req param 'type'", () => {
        beforeAll(async done => {
            await getProductSummaryHandler(
                {...mockRequest, params: {...mockRequest.params, type: "suit"}},
                mockResponse,
            )
            done()
        })

        it("should call data mapper with the response data", () => {
            expect(mapProductSummaryApiToDuckState).toHaveBeenCalledWith(
                {items: []},
                "test config",
                "test site url",
                "next",
            )
        })

        it("should send the data back", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockSend).toHaveBeenCalledWith({mappedData: {items: []}})
        })
    })

    describe("When getting product summaries getProductSummaryHandler() with a time machine header", () => {
        it("it should pass the time machine header to the api", async () => {
            const request = {
                headers: {"x-monorepo-time-machine-date": "01-01-2000"},
                params: {
                    itemNumber: "123",
                },
                siteUrl: {url: "test site url"},
            }
            await getProductSummaryHandler(request, mockResponse)

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).toHaveBeenCalledWith("superman/Amido/GB/en/v1/products/123", {
                headers: {
                    "x-monorepo-language": "en",
                    "x-monorepo-realm": "Amido",
                    "x-monorepo-territory": "GB",
                    "x-monorepo-time-machine-date": "01-01-2000",
                },
            })
        })
    })

    describe("When getting product summaries throws an error", () => {
        const mockErrorRequest = {
            headers: {mockHeaders: "", isError: true},
            params: {
                itemNumber: "123",
            },
        }
        beforeAll(async done => {
            await getProductSummaryHandler(mockErrorRequest, mockResponse)
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
    })

    describe("When loading for the baselinecss", () => {
        it("should return the hardcoded baselinecss data", async () => {
            const mockBaselineRequest = {
                headers: {mockHeaders: "", isError: true},
                params: {
                    itemNumber: BASELINECSS_GENERATE_CSS_ITEM_NUMBER,
                },
            }
            await getProductSummaryHandler(mockBaselineRequest, mockResponse)
            expect(mockSend).toHaveBeenCalledWith(BASELINECSS)
        })
    })
})

describe("Given a product router", () => {
    it("should define a 'get' route with the correct parameters", () => {
        const mockExpressRouter = {get: jest.fn()}

        productRouter(mockExpressRouter as any)

        expect(mockExpressRouter.get).toHaveBeenCalledWith("/:type/:itemNumber", expect.any(Function))
    })
})
