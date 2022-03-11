/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {ShoppingBagApiGet, ShoppingBagApiPost} from "."
import {axiosInstance as axios} from "../../utils/axios"
import setMainSiteBagCookie from "../../utils/setMainSiteBagCookie"

jest.mock("../../utils/axios")
jest.mock("../../utils/setMainSiteBagCookie")

const mockEsb = {
    publish: jest.fn(),
}
const mockSdkUtil = jest.fn()
const RealDate = Date.now
describe("Given a LoadShoppingBagApiData", () => {
    beforeAll(() => {
        global.Date.now = jest.fn(() => new Date("2019-04-07T10:20:30Z").getTime())
    })

    afterAll(() => {
        global.Date.now = RealDate
    })

    describe("When successful", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, statusText: "OK", data: {test: ""}})
            })
            ShoppingBagApiGet({skipRebuild: false, ap: false}, "www.test.com", mockEsb as any, mockSdkUtil)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call Axios Get", () => {
            expect(axios.get).toHaveBeenCalledWith(`www.test.com`, {
                withCredentials: true,
                params: {skipRebuild: false, ap: false, _: 1554632430000},
            })
        })

        it("should call GetBagCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {test: ""},
                status: 200,
                success: true,
                textStatus: "OK",
            })
        })
        it("should call setMainSiteBagCookie", () => {
            expect(setMainSiteBagCookie).toHaveBeenCalledWith({
                data: {test: ""},
                status: 200,
                statusText: "OK",
            })
        })
    })

    describe("When an error returns from the API", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject({response: {status: 550, data: {test: ""}, statusText: "ERROR"}})
            })
            ShoppingBagApiGet({skipRebuild: false, ap: false}, "www.test.com", mockEsb as any, mockSdkUtil)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call GetBagCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {test: ""},
                status: 550,
                success: false,
                textStatus: "ERROR",
            })
        })
    })

    describe("When an error calling the API", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject({request: {status: 550, data: {test: ""}, statusText: "ERROR"}})
            })
            ShoppingBagApiGet({skipRebuild: false, ap: false}, "www.test.com", mockEsb as any, mockSdkUtil)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call GetBagCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                status: 550,
                success: false,
                textStatus: "ERROR",
            })
        })
    })

    describe("When an error calling axios", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject(new Error("ERROR MESSAGE"))
            })
            ShoppingBagApiGet({skipRebuild: false, ap: false}, "www.test.com", mockEsb as any, mockSdkUtil)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call GetBagCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                status: 500,
                success: false,
                textStatus: "ERROR MESSAGE",
            })
        })
    })
})

//

describe("Given a ShoppingBagPost", () => {
    describe("When successful", () => {
        beforeAll(() => {
            jest.spyOn(axios, "post").mockImplementationOnce(async () => {
                return Promise.resolve({status: 200, statusText: "OK", data: {test: ""}})
            })
            ShoppingBagApiPost({skipRebuild: false, ap: false}, "www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call Axios post", () => {
            expect(axios.post).toHaveBeenCalledWith(`www.test.com`, "skipRebuild=false&ap=false", {
                withCredentials: true,
            })
        })

        it("should call PostBagCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {test: ""},
                status: 200,
                success: true,
                textStatus: "OK",
            })
        })

        it("should call setMainSiteBagCookie", () => {
            expect(setMainSiteBagCookie).toHaveBeenCalledWith({
                data: {test: ""},
                status: 200,
                statusText: "OK",
            })
        })
    })

    describe("When an error returns from the API", () => {
        beforeAll(() => {
            jest.spyOn(axios, "post").mockImplementationOnce(async () => {
                return Promise.reject({response: {status: 550, data: {test: ""}, statusText: "ERROR"}})
            })
            ShoppingBagApiPost({skipRebuild: false, ap: false}, "www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call PostBagCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {test: ""},
                status: 550,
                success: false,
                textStatus: "ERROR",
            })
        })
    })

    describe("When an error calling the API", () => {
        beforeAll(() => {
            jest.spyOn(axios, "post").mockImplementationOnce(async () => {
                return Promise.reject({request: {status: 550, data: {test: ""}, statusText: "ERROR"}})
            })
            ShoppingBagApiPost({skipRebuild: false, ap: false}, "www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call PostBagCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                status: 550,
                success: false,
                textStatus: "ERROR",
            })
        })
    })

    describe("When an error calling axios", () => {
        beforeAll(() => {
            jest.spyOn(axios, "post").mockImplementationOnce(async () => {
                return Promise.reject(new Error("ERROR MESSAGE"))
            })
            ShoppingBagApiPost({skipRebuild: false, ap: false}, "www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call PostBagCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                status: 500,
                success: false,
                textStatus: "ERROR MESSAGE",
            })
        })
    })
})
