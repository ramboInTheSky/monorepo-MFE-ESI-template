import {getSearchApiResult} from "."
import axios from "../../server/core/xhr"

jest.mock("../../server/core/xhr", () => ({
    get: jest.fn(),
}))

jest.mock("../httpUrlTrimmer", () => ({
    __esModule: true,
    httpUrlTrimmer: jest.fn(() => "www.test.com"),
}))

const mockRequest = {
    query: {
        w: "TEST SEARCH TERM",
    },
}

const mockapiUrlSettings = {
    language: "en",
    realm: "Amido",
    territory: "GB",
}

const headers = {"x-monorepo-correlation-id": "123", "x-monorepo-time-machine-date": "01-01-2000"}

describe("Given getSearchApiResult", () => {
    describe("When there are items that match the search criteria", () => {
        beforeAll(async done => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, data: {colourways: [{url: "www.test.com"}]}})
            })
            await getSearchApiResult(mockRequest as any, mockapiUrlSettings as any, headers as any)
            done()
        })
        it("should get the url for the item number", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).toHaveBeenCalledWith("superman/Amido/GB/en/v1/item-numbers", {
                headers: {"x-monorepo-correlation-id": "123", "x-monorepo-time-machine-date": "01-01-2000"},
                params: {w: "TEST SEARCH TERM"},
            })
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
})
