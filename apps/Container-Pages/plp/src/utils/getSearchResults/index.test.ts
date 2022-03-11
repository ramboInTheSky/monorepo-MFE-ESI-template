import {getSearchResults} from "."
import axios from "../../server/core/xhr"
import {isSearchApiResponse} from "../../models/searchApi/typeGuards"
import redirectToResponseUrl from "../../server/apis/search/redirectToApiResponse"
import normaliseDataToState from "../normaliseApiDataToState"

jest.mock("../../server/core/xhr", () => ({
    get: jest.fn(),
}))

jest.mock("../../models/searchApi/typeGuards", () => ({
    isSearchApiResponse: jest.fn(),
}))

jest.mock("../../server/apis/search/redirectToApiResponse", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../normaliseApiDataToState", () => ({
    __esModule: true,
    default: jest.fn(() => ({items: []})),
}))

const mockRequest = {
    query: {
        w: "TEST SEARCH TERM",
        type: "Keyword",
    },
}

const mockSend = jest.fn()
const mockStatus = jest.fn(() => ({end: jest.fn()}))
const mockResponse = {
    send: mockSend,
    status: mockStatus,
}

const mockapiUrlSettings = {
    language: "en",
    realm: "Amido",
    territory: "GB",
}

const headers = {"x-monorepo-correlation-id": "123", "x-monorepo-time-machine-date": "01-01-2000"}

describe("Given getSearchResults", () => {
    describe("When a valid Search API response is returned", () => {
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {items: [{itemNumber: "1234"}]}})
            })
            ;(isSearchApiResponse as any).mockImplementation(() => true)
            await getSearchResults(mockRequest as any, mockResponse as any, mockapiUrlSettings as any, headers as any)
            done()
        })
        it("should call the search api with the right parameters", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).toHaveBeenCalledWith("superman/Amido/GB/en/v1/item-numbers", {
                headers: {"x-monorepo-correlation-id": "123", "x-monorepo-time-machine-date": "01-01-2000"},
                params: {w: "TEST SEARCH TERM", type: "Keyword"},
            })
        })
        it("should call isSearchApiResponse", () => {
            expect(isSearchApiResponse).toHaveBeenCalled()
        })
        it("should call redirectToResponseUrl", () => {
            expect(redirectToResponseUrl).toHaveBeenCalled()
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
    describe("When an invalid Search API response is returned", () => {
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {items: [{itemNumber: "1234"}]}})
            })
            ;(isSearchApiResponse as any).mockImplementation(() => false)
            await getSearchResults(mockRequest as any, mockResponse as any, mockapiUrlSettings as any, headers as any)
            done()
        })
        it("should call isSearchApiResponse", () => {
            expect(isSearchApiResponse).toHaveBeenCalled()
        })
        it("should call normaliseDataToState", () => {
            expect(normaliseDataToState).toHaveBeenCalled()
        })
        it("should send response", () => {
            expect(mockResponse.send).toHaveBeenCalled()
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
})
