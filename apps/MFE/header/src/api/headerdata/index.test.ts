/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import HeaderApiConfig from "../../config/api/headerdata"
import * as axios from "../../utils/axios"
import {getHeaderData} from "./index"

jest.mock("../../utils/axios", () => ({
    __esModule: true,
    axiosInstance: jest.fn(async req => {
        return req.headers.success
            ? Promise.resolve({
                  status: 200,
                  data: {
                      id: "d8c6344b-e19e-4ed8-8fef-515320439655",
                      realm: "",
                      name: "Default",
                      territory: "GB",
                      regions: [{id: "test"}],
                  },
              })
            : Promise.reject(new Error("500 error"))
    }),
}))

jest.mock("@monorepo/utils", () => ({
    getSettingsHeaders: jest.fn(() => ({
        "x-monorepo-language": "en",
        "x-monorepo-realm": "Amido",
        "x-monorepo-territory": "GB",
    })),
    getSettingsHeadersAsObject: jest.fn(() => ({
        language: "en",
        realm: "Amido",
        territory: "GB",
    })),
}))

jest.mock("../../config/api/headerdata", () => ({
    __esModule: true,
    default: jest.fn(() => ({method: "get", localEndpoint: () => "Test"})),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("./defaultHeaderData", () =>
    jest.fn(() =>
        Promise.resolve({
            name: "Default",
            territory: "GB",
        }),
    ),
)

const mockRequest = {
    headers: {success: true, "x-monorepo-realm": "amido"},
}

const defaultData = {
    name: "Default",
    territory: "GB",
}
describe("Given a getHeaderData()", () => {
    let response
    describe("When loading products for a url", () => {
        beforeEach(async done => {
            jest.clearAllMocks()

            response = await getHeaderData(mockRequest.headers as any, "v1.5.4")
            done()
        })

        it('should call SearchAPI with "getHeaderData"', () => {
            expect(HeaderApiConfig).toBeCalledWith("getHeaderData")
        })

        it("should call axios with expected parameters", () => {
            expect(axios.axiosInstance).toBeCalledWith({
                method: "get",
                url: "Test",
                headers: mockRequest.headers,
            })
        })

        it("should return response data", () => {
            expect(response).toEqual({
                id: "d8c6344b-e19e-4ed8-8fef-515320439655",
                realm: "",
                name: "Default",
                territory: "GB",
                regions: [{id: "test"}],
            })
        })

        it("should not call the error logger", () => {
            expect(logger.error).not.toBeCalled()
        })

        it("should return default response data if only called during CSS generation", async () => {
            expect(await getHeaderData(mockRequest.headers as any, "v1.5.4")).toEqual({
                ...defaultData,
                id: "d8c6344b-e19e-4ed8-8fef-515320439655",
                realm: "",
                regions: [{id: "test"}],
            })
        })
    })

    describe("Given an error request", () => {
        it("should return default response data", async () => {
            const newMockRequest = {
                headers: {success: false},
                url: "a url",
            }
            expect(await getHeaderData(newMockRequest.headers as any, "v1.5.4")).toEqual(defaultData)
        })

        it("should call the error logger", () => {
            expect(logger.error).toMatchSnapshot()
        })
    })
})
