import getFilterCookie from "."
import {SearchApiRequestTypes} from "../../config/constants"

const mockResponse = {cookie: jest.fn()}

describe("Given a getFilterCookie", () => {
    describe("When Getting the cookie and ther is no cookie", () => {
        const mockStore = {
            getState: () => ({request: {url: "/search?w=red", searchTerm: "red", type: SearchApiRequestTypes.Keyword}}),
        }

        it("Should return the cookie", () => {
            expect(getFilterCookie({cookies: {}}, mockResponse, mockStore as any)).toEqual(undefined)
        })
    })

    describe("When Getting the cookie from the keyword request", () => {
        const mockStore = {
            getState: () => ({
                request: {
                    url: "http://www.test.com/search?w=red",
                    searchTerm: "red",
                    type: SearchApiRequestTypes.Keyword,
                    siteUrl: "http://www.test.com",
                },
            }),
        }

        const expectedCookie = {
            page: "red",
            filterCategorySettings: {
                Size: {
                    isOpen: true,
                    viewMoreOpened: true,
                },
            },
        }
        const mockRequest = {
            cookies: {
                filterSettings: `{"page":"red","filterCategorySettings":{"Size":{"isOpen":true,"viewMoreOpened":true}}}`,
            },
        }
        it("Should return the cookie", () => {
            expect(getFilterCookie(mockRequest, mockResponse, mockStore as any)).toEqual(expectedCookie)
        })

        describe("When path does not match", () => {
            const mockRequestNoMatch = {
                cookies: {
                    filterSettings: `{"page":"blue","filterCategorySettings":{"Size":{"isOpen":true,"viewMoreOpened":true}}}`,
                },
            }
            let actualCookie
            beforeAll(() => {
                actualCookie = getFilterCookie(mockRequestNoMatch, mockResponse, mockStore as any)
            })

            it("should not clear the cookie", () => {
                expect(mockResponse.cookie).not.toHaveBeenCalledWith("filterSettings", "", {
                    path: "/",
                    domain: "www.test.com",
                    expires: new Date(0),
                })
            })

            it("should return nothing", () => {
                expect(actualCookie).toBeUndefined()
            })
            afterAll(() => {
                jest.clearAllMocks()
            })
        })
    })

    describe("When Getting the cookie from the category request", () => {
        const mockStore = {
            getState: () => ({
                request: {
                    url: "http://www.test.com/shop/test/1",
                    searchTerm: "",
                    type: SearchApiRequestTypes.Category,
                    siteUrl: "http://www.test.com",
                },
            }),
        }

        const expectedCookie = {
            page: "test",
            filterCategorySettings: {
                Size: {
                    isOpen: true,
                    viewMoreOpened: true,
                },
            },
        }

        const mockRequest = {
            cookies: {
                filterSettings: `{"page":"test","filterCategorySettings":{"Size":{"isOpen":true,"viewMoreOpened":true}}}`,
            },
        }

        it("Should return the cookie", () => {
            expect(getFilterCookie(mockRequest, mockResponse, mockStore as any)).toEqual(expectedCookie)
        })

        describe("When path does not match", () => {
            const mockRequestNoMatch = {
                cookies: {
                    filterSettings: `{"page":"blue","filterCategorySettings":{"Size":{"isOpen":true,"viewMoreOpened":true}}}`,
                },
            }
            let actualCookie
            beforeAll(() => {
                actualCookie = getFilterCookie(mockRequestNoMatch, mockResponse, mockStore as any)
            })

            it("should not clear the cookie", () => {
                expect(mockResponse.cookie).not.toHaveBeenCalledWith("filterSettings", "", {
                    path: "/",
                    domain: "www.test.com",
                    expires: new Date(0),
                })
            })

            it("should return nothing", () => {
                expect(actualCookie).toBeUndefined()
            })
            afterAll(() => {
                jest.clearAllMocks()
            })
        })
    })
})
