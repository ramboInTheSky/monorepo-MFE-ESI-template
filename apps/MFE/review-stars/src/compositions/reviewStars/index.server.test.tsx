import React from "react"
import {render} from "@testing-library/react"

import Logger from "@monorepo/core-logger"
import mockStore from "../../../__mocks__/mockStore"

import {mockDateConstructor} from "../../../__mocks__/setDate"
import {updateReviewStars} from "../../ducks/reviewStars"
import {ReviewStars} from "."
import {getServerSideProps} from "./index.server"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("../../ducks/reviewStars", () => ({
    updateReviewStars: jest.fn(store => {
        if (store.error) throw new Error("Error")
    }),
}))
jest.mock("../../components/product", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST PRODUCT</div>,
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

describe("Pages: Review Stars - ", () => {
    describe("When I try provide the data to the Review Stars and an error has occured: ", () => {
        beforeEach(() => {
            mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))
        })
        it("should show the default Review Stars", () => {
            const {asFragment} = render(<ReviewStars />)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When the Review Stars renders with regions ", () => {
        it("should show the default Review Stars", () => {
            const {asFragment} = render(<ReviewStars />)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When the Review Stars getServerSideProps function is called ", () => {
        let props: any
        beforeAll(async () => {
            props = await getServerSideProps(mockRequest, mockResponse, mockStore)
        })
        it("should call Get ReviewStars Data", () => {
            expect(updateReviewStars).toHaveBeenCalledWith(mockStore, {
                headers: mockResponse.req.headers,
                itemNumber: mockRequest.params.itemNumber,
            })
        })

        it("should return data from the API", () => {
            expect(props).toBeTruthy()
        })
        it("should return correct values", () => {
            expect(props).toEqual({isConfError: false})
        })
    })

    describe("When the Review Stars getServerSideProps throws an error ", () => {
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
            expect(props).toEqual({isConfError: true})
        })
    })
})
