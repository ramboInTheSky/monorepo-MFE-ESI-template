import MegaNavApiConfig from "../../config/api/appdata"
import * as axios from "../../utils/axios"
import {getSecondaryNavData} from "./index"
import {SecondaryNav} from "../../models/secondary-nav"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockData = new SecondaryNav()
jest.mock("../../utils/axios", () => ({
    __esModule: true,
    axiosInstance: jest.fn(async req => {
        return req.headers.success
            ? Promise.resolve({status: 200, data: mockData})
            : Promise.reject(new Error("500 error"))
    }),
}))

jest.mock("../../config/api/appdata", () => ({
    __esModule: true,
    default: jest.fn(() => ({method: "get", localEndpoint: () => "Test"})),
}))

const mockRequest = {
    headers: {success: true},
}

const mockBaseUrl = "http://test.com/en/"

describe("Given a Meganav service", () => {
    describe("Given a getSecondaryNavData()", () => {
        let response
        const department = "sample"

        describe("When loading results for a department", () => {
            beforeAll(async () => {
                response = await getSecondaryNavData(mockBaseUrl, mockRequest.headers as any, department)
            })

            it('should call api with "getSecondaryNavData"', () => {
                expect(MegaNavApiConfig).toBeCalledWith("getSecondaryNavData")
            })

            it("should call axios with expected parameters", () => {
                expect(axios.axiosInstance).toBeCalledWith({
                    method: "get",
                    url: "http://test.com/en/Test",
                    headers: mockRequest.headers,
                })
            })

            it("should return response data", () => {
                expect(response).toEqual(mockData)
            })
        })

        describe("Given an error request", () => {
            it("should call the error logger", async () => {
                const newMockRequest = {
                    headers: {success: false, "x-monorepo-realm": "amido", "x-monorepo-territory": "gb"},
                    url: "a url",
                }

                await expect(
                    getSecondaryNavData(mockBaseUrl, newMockRequest.headers as any, department),
                ).rejects.toThrowError()
            })
        })
    })
})
