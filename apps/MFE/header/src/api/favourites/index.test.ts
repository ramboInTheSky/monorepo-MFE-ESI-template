/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prefer-promise-reject-errors */
import {FavouritesApiGet, FavouritesApiPost} from "."
import {axiosInstance as axios} from "../../utils/axios"
import {shouldUseSessionStorage, setSessionStorageHasFavouriteItems} from "../../utils/favourites"

jest.mock("../../utils/axios")
const mockEsb = {
    publish: jest.fn(),
}
jest.mock("../../utils/favourites", () => ({
    setCacheVersion: jest.fn(),
    shouldUseSessionStorage: jest.fn(() => true),
    setSessionStorageHasFavouriteItems: jest.fn(),
}))
describe("Given a LoadFavouritesApiData", () => {
    describe("When successful and cached", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({
                    status: 200,
                    statusText: "OK",
                    data: {Success: true, data: {ShoppingListItems: [{test: "test"}]}},
                })
            })
            FavouritesApiGet("www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call Axios Get with pragma private", () => {
            expect(axios.get).toHaveBeenCalledWith(`www.test.com`, {
                withCredentials: true,
            })
        })

        it("should call GetFavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {ShoppingListItems: [{test: "test"}]},
                status: 200,
                textStatus: "OK",
                eventId: "",
                success: true,
                errorMessage: null,
            })
        })
        it("should call shouldUseSessionStorage", () => {
            expect(shouldUseSessionStorage).toHaveBeenCalled()
        })
        it("should call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).toHaveBeenCalled()
        })
    })

    describe("When successful with no favourites", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({
                    status: 200,
                    statusText: "OK",
                    data: {Success: true, data: {ShoppingListItems: []}},
                })
            })
            FavouritesApiGet("www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call GetFavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {ShoppingListItems: []},
                status: 200,
                textStatus: "OK",
                eventId: "",
                success: true,
                errorMessage: null,
            })
        })
        it("should call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).toHaveBeenCalled()
        })
    })

    describe("When successful and not cached", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({
                    status: 200,
                    statusText: "OK",
                    data: {Success: true, data: {ShoppingListItems: [{test: "test"}]}},
                })
            })
            FavouritesApiGet("www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call Axios Get with pragma no-cache", () => {
            expect(axios.get).toHaveBeenCalledWith(`www.test.com`, {
                withCredentials: true,
            })
        })

        it("should call GetFavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {ShoppingListItems: [{test: "test"}]},
                errorMessage: null,
                eventId: "",
                status: 200,
                textStatus: "OK",
                success: true,
            })
        })

        it("should call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).toHaveBeenCalled()
        })
    })

    describe("When favourites api returns data", () => {
        beforeAll(() => {
            jest.spyOn(axios, "post").mockImplementationOnce(async () => {
                return Promise.resolve({
                    status: 200,
                    statusText: "OK",
                    data: {Success: true, data: {ShoppingListItems: [{test: "test"}]}},
                })
            })
            FavouritesApiPost({test: ""}, "www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
            mockEsb.publish.mockClear()
        })

        it("should call Axios Post", () => {
            expect(axios.post).toHaveBeenCalledWith(
                `www.test.com`,
                {test: ""},
                {
                    withCredentials: true,
                    headers: {Pragma: "no-cache"},
                },
            )
        })

        it("should call FavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {ShoppingListItems: [{test: "test"}]},
                errorMessage: null,
                eventId: "",
                status: 200,
                success: true,
                textStatus: "OK",
            })
        })

        it("should set cache version", () => {
            expect(localStorage.getItem("favouriteCacheVersion")).toBeDefined()
        })

        it("should call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).toHaveBeenCalled()
        })
    })
    describe("When favourites api returns Maximum exceeded", () => {
        beforeAll(() => {
            jest.spyOn(axios, "post").mockImplementationOnce(async () => {
                return Promise.resolve({
                    status: 200,
                    statusText: "OK",
                    data: {
                        Success: false,
                        ErrorMessage: "MaximumLimitExceeded",
                    },
                })
            })
            FavouritesApiPost({test: ""}, "www.test2.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call Axios Post", () => {
            expect(axios.post).toHaveBeenCalledWith(
                `www.test2.com`,
                {test: ""},
                {
                    withCredentials: true,
                    headers: {Pragma: "no-cache"},
                },
            )
        })

        it("should call FavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                success: false,
                errorMessage: "MaximumLimitExceeded",
                eventId: "",
                status: 200,
                textStatus: "OK",
            })
        })

        it("should set cache version", () => {
            expect(localStorage.getItem("favouriteCacheVersion")).toBeDefined()
        })

        it("should not call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).not.toHaveBeenCalled()
        })
    })

    describe("When favourites api returns other error message ", () => {
        beforeAll(() => {
            jest.spyOn(axios, "post").mockImplementationOnce(async () => {
                return Promise.resolve({
                    status: 200,
                    statusText: "OK",
                    data: {
                        Success: false,
                        ErrorMessage: "Favourites - something went wrong!",
                    },
                })
            })
            FavouritesApiPost({test: ""}, "www.test2.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call Axios Post", () => {
            expect(axios.post).toHaveBeenCalledWith(
                `www.test2.com`,
                {test: ""},
                {
                    withCredentials: true,
                    headers: {Pragma: "no-cache"},
                },
            )
        })

        it("should call FavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                errorMessage: "Favourites - something went wrong!",
                eventId: "",
                status: 200,
                success: false,
                textStatus: "OK",
            })
        })

        it("should set cache version", () => {
            expect(localStorage.getItem("favouriteCacheVersion")).toBeDefined()
        })

        it("should not call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).not.toHaveBeenCalled()
        })
    })

    describe("When an error returns from the API", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject({response: {status: 550, data: {test: ""}, statusText: "ERROR"}})
            })
            FavouritesApiGet("www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call GetFavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: {test: ""},
                eventId: "",
                status: 550,
                success: false,
                textStatus: "ERROR",
            })
        })

        it("should not call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).not.toHaveBeenCalled()
        })
    })

    describe("When an error calling the API", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject({request: {status: 550, data: {test: ""}, statusText: "ERROR"}})
            })
            FavouritesApiGet("www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call GetFavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                eventId: "",
                status: 550,
                success: false,
                textStatus: "ERROR",
            })
        })

        it("should not call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).not.toHaveBeenCalled()
        })
    })

    describe("When an error calling axios", () => {
        beforeAll(() => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject(new Error("ERROR MESSAGE"))
            })
            FavouritesApiGet("www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call GetFavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                eventId: "",
                status: 500,
                success: false,
                textStatus: "ERROR MESSAGE",
            })
        })

        it("should not call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).not.toHaveBeenCalled()
        })
    })

    describe("When an error calling axios post", () => {
        beforeAll(() => {
            jest.spyOn(axios, "post").mockImplementationOnce(async () => {
                return Promise.reject({request: {status: 550, data: {test: ""}, statusText: "ERROR"}})
            })
            FavouritesApiPost({test: ""}, "www.test.com", mockEsb as any)
        })

        afterAll(() => {
            jest.clearAllMocks()
        })

        it("should call Axios Post", () => {
            expect(axios.post).toHaveBeenCalledWith(
                `www.test.com`,
                {test: ""},
                {
                    withCredentials: true,
                    headers: {Pragma: "no-cache"},
                },
            )
        })

        it("should call FavouritesCallback", () => {
            expect(mockEsb.publish).toHaveBeenCalledWith({
                data: null,
                eventId: "",
                status: 550,
                success: false,
                textStatus: "ERROR",
            })
        })

        it("should not call setSessionStorageHasFavouriteItems", () => {
            expect(setSessionStorageHasFavouriteItems).not.toHaveBeenCalled()
        })
    })
})
