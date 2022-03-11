import Logger from "@monorepo/core-logger"
import axios from "../../core/xhr"
import productsFragmentRouter, {getProductsFragmentHandler} from "."
import createProductSummaryEsiTag from "../../../utils/createProductSummaryEsiTag"

jest.mock("../../../utils/httpUrlTrimmer", () => ({
    __esModule: true,
    httpUrlTrimmer: jest.fn(() => "test.co.uk/shop/men/brand-amido-isort-score"),
}))

jest.mock("../../../utils/createApiRequestHeaders", () => ({
    __esModule: true,
    default: jest.fn(() => ({"x-monorepo-correlation-id": "123", "x-monorepo-time-machine-date": "01-01-2000"})),
}))

jest.mock("../../../utils/normaliseApiDataToState", () => ({
    __esModule: true,
    default: jest.fn(() => ({mockFilterData: "test"})),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("../../core/xhr", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../../utils/createProductSummaryEsiTag", () => ({
    __esModule: true,
    default: jest.fn(),
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

const mockRequest = {
    headers: {
        "x-monorepo-correlation-id": "123",
        "x-monorepo-time-machine-date": "01-01-2000",
    },
    query: {
        criteria: "test.co.uk/shop/men/brand-amido-isort-score",
        type: "Keyword",
        searchTerm: "1234",
        pagesize: 24,
    },
    siteUrl: {
        url: "http://test.co.uk",
    },
}
const expectedExternalRequest = {
    headers: {
        "x-monorepo-correlation-id": "123",
        "x-monorepo-time-machine-date": "01-01-2000",
    },
    query: {
        criteria: "test.co.uk/shop/men/brand-amido-isort-score",
        type: "Keyword",
        searchTerm: "1234",
        pagesize: 24,
    },
}

const mockResponse = {
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
    type: jest.fn(() => mockResponse),
    end: jest.fn(),
}

function mockSuccessfulAxiosResponse(items: any[], filters?, includedComponents?) {
    ;(axios as any).mockImplementationOnce(async () => {
        return Promise.resolve({
            status: 200,
            data: {items, filters, includedComponents},
        })
    })
}

function mockCreateProductSummaryEsiTag(mockFn?: Function) {
    const defaultImpl = (itemNumber, newIn) => {
        return `<esi:mock i="${itemNumber}" n="${newIn}" />`
    }
    ;(createProductSummaryEsiTag as any).mockImplementation(mockFn ?? defaultImpl)
}

describe("Given a products fragment search api", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("When there are no items that match the criteria", () => {
        beforeEach(async done => {
            mockSuccessfulAxiosResponse([])
            mockCreateProductSummaryEsiTag()

            await getProductsFragmentHandler(mockRequest as any, mockResponse)

            done()
        })

        it("should respond with an empty string", () => {
            expect(mockResponse.send).toHaveBeenLastCalledWith("")
            expect(mockResponse.status).not.toHaveBeenCalled()
        })
    })

    describe("When there are items that match the search criteria", () => {
        beforeEach(async done => {
            mockCreateProductSummaryEsiTag()
            mockSuccessfulAxiosResponse([
                {itemNumber: "1", newIn: false},
                {itemNumber: "2", newIn: false},
            ])

            await getProductsFragmentHandler(mockRequest as any, mockResponse)

            done()
        })

        it("should call the search api with the correct params", () => {
            expect(axios).toHaveBeenCalledWith({
                url: "superman/Amido/GB/en/v1/item-numbers",
                params: {...expectedExternalRequest.query, type: "Keyword"},
                method: "get",
                headers: {
                    "x-monorepo-correlation-id": "123",
                    "x-monorepo-time-machine-date": "01-01-2000",
                },
            })
        })

        it("should respond with a string that contains the product details and ESI tags", () => {
            expect(mockResponse.send).toHaveBeenLastCalledWith(
                '<==>1<=>false<=><esi:mock i="1" n="false" /><==>2<=>false<=><esi:mock i="2" n="false" />',
            )
        })
    })

    describe("When there are items that match the search criteria and filter data is returned", () => {
        beforeEach(async done => {
            mockCreateProductSummaryEsiTag()
            mockSuccessfulAxiosResponse(
                [
                    {itemNumber: "1", newIn: false},
                    {itemNumber: "2", newIn: false},
                ],
                {test: "test"},
                ["search-banner"],
            )

            await getProductsFragmentHandler(mockRequest as any, mockResponse)

            done()
        })

        it("should call the search api with the correct params", () => {
            expect(axios).toHaveBeenCalledWith({
                url: "superman/Amido/GB/en/v1/item-numbers",
                params: {...expectedExternalRequest.query, type: "Keyword"},
                method: "get",
                headers: {
                    "x-monorepo-correlation-id": "123",
                    "x-monorepo-time-machine-date": "01-01-2000",
                },
            })
        })

        it("should respond with a string that contains the product details and ESI tags", () => {
            expect(mockResponse.send).toHaveBeenLastCalledWith(
                '{"mockFilterData":"test"}<=ProductFragment=><==>1<=>false<=><esi:mock i="1" n="false" /><==>2<=>false<=><esi:mock i="2" n="false" /><=SearchBanner=><esi:include src="http://test.co.uk/search-banners/%2Fshop%2Fmen%2Fbrand-amido-isort-score" onerror="continue" dca="none"/>',
            )
        })
    })

    describe("When there are items that match the search criteria, but no search-banner should be present, the filter data is returned", () => {
        beforeEach(async done => {
            mockCreateProductSummaryEsiTag()
            mockSuccessfulAxiosResponse(
                [
                    {itemNumber: "1", newIn: false},
                    {itemNumber: "2", newIn: false},
                ],
                {test: "test"},
            )

            await getProductsFragmentHandler(mockRequest as any, mockResponse)

            done()
        })

        it("should call the search api with the correct params", () => {
            expect(axios).toHaveBeenCalledWith({
                url: "superman/Amido/GB/en/v1/item-numbers",
                params: {...expectedExternalRequest.query, type: "Keyword"},
                method: "get",
                headers: {
                    "x-monorepo-correlation-id": "123",
                    "x-monorepo-time-machine-date": "01-01-2000",
                },
            })
        })

        it("should respond with a string that contains the product details and ESI tags", () => {
            expect(mockResponse.send).toHaveBeenLastCalledWith(
                '{"mockFilterData":"test"}<=ProductFragment=><==>1<=>false<=><esi:mock i="1" n="false" /><==>2<=>false<=><esi:mock i="2" n="false" />',
            )
        })
    })

    describe("When there is an internal server error", () => {
        const error = new Error("Ooops...")

        beforeEach(async done => {
            mockSuccessfulAxiosResponse([
                {itemNumber: "1", newIn: false},
                {itemNumber: "2", newIn: false},
            ])
            mockCreateProductSummaryEsiTag(() => {
                throw error
            })
            await getProductsFragmentHandler(mockRequest as any, mockResponse)
            done()
        })

        it("should respond with the correct failure response", () => {
            expect(mockResponse.status).toHaveBeenCalledWith(500)
            expect(mockResponse.end).toHaveBeenCalledWith()
        })

        it("should log the error", () => {
            // eslint-disable-next-line
            expect(Logger.error).toHaveBeenCalledWith(error)
        })
    })
})

describe("given a products fragment router", () => {
    it("should define a 'get' route with the correct parameters", () => {
        const mockExpressRouter = {get: jest.fn()}

        productsFragmentRouter(mockExpressRouter as any)

        expect(mockExpressRouter.get).toHaveBeenCalledWith("/products-fragment", expect.any(Function))
    })
})
