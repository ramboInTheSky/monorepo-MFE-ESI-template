import React from "react"
import {render} from "@testing-library/react"

import {Provider} from "react-redux"
import {ThemeProvider} from "styled-components"

import Logger from "@monorepo/core-logger"
import mockStore, {mockTheme} from "../../../__mocks__/mockStore"

import {mockDateConstructor} from "../../../__mocks__/setDate"
import {updateProductSummary} from "../../ducks/productSummary"
import ProductSummary from "."
import {getServerSideProps} from "./index.server"
import getSearchDescription from "../../utils/getSearchDescription"
import useGTMOnHydrate from "../../hooks/useGTMOnHydrate"
import {SetLastModifiedResponseHeader} from "../../server/middleware/cache-control"
import {SetCacheTagsResponseHeader} from "../../server/middleware/cache-tag"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("../../server/middleware/cache-control", () => ({
    SetLastModifiedResponseHeader: jest.fn(),
}))
jest.mock("../../server/middleware/cache-tag", () => ({
    SetCacheTagsResponseHeader: jest.fn(),
}))
jest.mock("../../ducks/productSummary", () => ({
    updateProductSummary: jest.fn(store => {
        if (store.error) throw new Error("Error")
        if (store.dataError) return {errorStatusCode: 404}
        if (store.isNotModified) return {errorStatusCode: 304}
        return {
            "test-headers": "itsatest",
        }
    }),
}))
jest.mock("../../components/product", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST PRODUCT</div>,
}))
jest.mock("../../utils/getSearchDescription", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => true),
}))

jest.mock("../../hooks/useGTMOnHydrate", () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockResponse = {
    locals: {
        configuration: {
            mockConfig: "",
        },
    },
    req: {
        headers: {
            testHeader: "111",
        },
        siteUrl: {
            url: "http://test.com",
        },
    },
}
const mockRequest = {
    params: {
        itemNumber: "1234",
    },
    query: {},
}

describe("Pages: Product Summary - ", () => {
    describe("When I try provide the data to the Product Summary and an error has occured: ", () => {
        beforeEach(() => {
            mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))
        })
        it("should show the default Product Summary", () => {
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <ThemeProvider theme={mockTheme}>
                        <ProductSummary />
                    </ThemeProvider>
                </Provider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When the Product Summary renders with regions ", () => {
        it("should show the default Product Summary", () => {
            const {asFragment} = render(
                <Provider store={mockStore}>
                    <ThemeProvider theme={mockTheme}>
                        <ProductSummary />
                    </ThemeProvider>
                </Provider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should use useGTMOnHydrate", () => {
            render(
                <Provider store={mockStore}>
                    <ThemeProvider theme={mockTheme}>
                        <ProductSummary />
                    </ThemeProvider>
                </Provider>,
            )
            expect(useGTMOnHydrate).toHaveBeenCalledWith()
        })
    })

    describe("When the Product Summary getServerSideProps function is called ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps(mockRequest, mockResponse, mockStore)
        })
        it("should call GetProduct SummaryData", () => {
            expect(updateProductSummary).toHaveBeenCalledWith(
                mockStore,
                {
                    headers: mockResponse.req.headers,
                    itemNumber: mockRequest.params.itemNumber,
                    type: "product",
                },
                true,
            )
        })

        it("should call getSearchDescription", () => {
            expect(getSearchDescription).toHaveBeenCalledWith(mockResponse.locals.configuration)
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
        it("should return data from the API", () => {
            expect(props).toBeTruthy()
        })
        it("should return correct values", () => {
            expect(props).toEqual({isConfError: false, isDataError: false, isNotModified: false})
        })
    })

    describe("When the Product Summary getServerSideProps throws an error ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps(mockRequest, mockResponse, {error: true} as any)
        })

        it("should call the error logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(Logger.error).toHaveBeenCalledWith(expect.any(Error))
        })

        it("should return data from the API", () => {
            expect(props).toBeTruthy()
        })
        it("should return correct values", () => {
            expect(props).toEqual({isConfError: true, isDataError: false, isNotModified: false})
        })
    })

    describe("When the Product Summary getServerSideProps returns a 404 ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps(mockRequest, mockResponse, {dataError: true} as any)
        })

        it("should return correct values", () => {
            expect(props).toEqual({isConfError: false, isDataError: true, isNotModified: false})
        })
    })

    describe("When the Product Summary getServerSideProps returns a 304 ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps(mockRequest, mockResponse, {isNotModified: true} as any)
        })

        it("should return correct values", () => {
            expect(props).toEqual({isConfError: false, isDataError: false, isNotModified: true})
        })
    })
})
