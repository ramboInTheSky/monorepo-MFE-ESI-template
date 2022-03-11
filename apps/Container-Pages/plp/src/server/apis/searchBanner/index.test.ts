import axios from "../../core/xhr"
import {getSearchBannerHandler, getSearchBannerCss, responseHeaders} from "."
import BFFLogger from "../../core/BFFLogger"

jest.mock("../../../utils/createApiRequestHeaders", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "mx",
        "x-monorepo-language": "en",
    })),
}))

jest.mock("../../../models/settings", () => ({
    SettingsSdkKeys: {
        SearchBannersAppCache: "SearchBannersAppCache",
    },
}))

jest.mock("../../../utils/normaliseApiDataToState", () => ({
    __esModule: true,
    default: jest.fn(() => ({mockFilterData: "test"})),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("../../core/xhr")

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("@monorepo/utils", () => ({
    getSettingsHeadersAsObject: jest.fn(headers => {
        if (headers.isError) throw new Error("ERROR")
        return {
            language: "en",
            realm: "amido",
            territory: "mx",
        }
    }),
    getSettingsHeaders: jest.fn(() => {
        return {
            "x-monorepo-realm": "Amido",
            "x-monorepo-territory": "mx",
            "x-monorepo-language": "en",
        }
    }),
}))

jest.mock("../../../utils/searchBanner", () => ({
    getSearchBannerUrl: jest.fn(() => {
        return "url"
    }),
}))

jest.mock("../../../config/env", () => ({
    REACT_APP_USE_TIME_MACHINE_COOKIE: "true",
    ENVIRONMENT_NAME: "dev",
    DEVELOPMENT: true,
    REACT_APP_BLOB_STORAGE_SSR_BASEURL: "https://ecmbrowsefdsxeuw.azurefd.net",
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
}))

const mockRequest = {
    headers: {
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "mx",
        "x-monorepo-language": "en",
        "x-monorepo-banner-format": "html",
    },
    params: {url: "shop/men"},
    siteUrl: {
        url: "www.test.com",
    },
}

const mockResponse = {
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
    set: jest.fn(() => mockResponse),
    type: jest.fn(() => mockResponse),
    end: jest.fn(),
    locals: {
        configuration: {
            isInvalid: true,
            isError: false,
            "monorepo.plp.frontend.cache-control.search": {
                Value: "test-cache-control",
            },
        },
    },
}

function mockSuccessfulAxiosResponse(content?, styleSheet?) {
    ;(axios as any).mockImplementationOnce(async () => {
        return Promise.resolve({
            status: 200,
            data: {content, styleSheet},
            headers: {
                "last-modified": "test-last-modified",
                "cache-control": "test-cache-control",
                "edge-cache-tag": "test-edge-cache-tag",
            },
        })
    })
}

function mock404AxiosResponse() {
    ;(axios as any).mockImplementationOnce(async () => {
        return Promise.resolve({
            status: 404,
            data: {content: "", styleSheet: ""},
        })
    })
}

describe("Given the search banners api", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("When there is no html content", () => {
        const cache = {
            get: jest.fn(() => undefined),
            set: jest.fn(),
        }

        beforeEach(async done => {
            mock404AxiosResponse()

            await getSearchBannerHandler(cache)(mockRequest as any, mockResponse)

            done()
        })

        it("should respond with content length 0 and 200 response", () => {
            expect(mockResponse.send).toBeCalled()
            expect(mockResponse.type).toBeCalledWith("html")
            expect(mockResponse.set).toBeCalledWith({"Content-Length": "0"})
            expect(mockResponse.status).toBeCalledWith(200)
        })
    })

    describe("When there is a search banner with content", () => {
        const cache = {
            get: jest.fn(() => "#plp-search-banner-entrypoint{width:100%}"),
            set: jest.fn(),
        }

        beforeEach(async done => {
            mockSuccessfulAxiosResponse(`<div>{{SiteUrl}}/shop</div>`, "searchBanner.css")

            await getSearchBannerHandler(cache)(mockRequest as any, mockResponse)

            done()
        })

        it("should respond with a inline css and html from the search banner template", () => {
            expect(mockResponse.send).toHaveBeenCalled()
        })

        it("should replace {{SiteUrl}} in the html content when site url is supplied", () => {
            expect(mockResponse.send).toHaveBeenCalledWith(
                "<style>#plp-search-banner-entrypoint{width:100%}</style><div>www.test.com/shop</div>",
            )
        })
    })

    describe("When there is no content or stylesheet", () => {
        const cache = {
            get: jest.fn(() => undefined),
            set: jest.fn(),
        }

        beforeEach(async done => {
            mockSuccessfulAxiosResponse("", "")

            await getSearchBannerHandler(cache)(mockRequest as any, mockResponse)

            done()
        })

        it("should respond with a inline css and html from the search banner template", () => {
            expect(mockResponse.send).toHaveBeenCalled()
        })
    })

    describe("When there is an internal server error", () => {
        const error = new Error("ERROR")
        const cache = {
            get: jest.fn(() => undefined),
            set: jest.fn(),
        }

        beforeEach(async done => {
            mockSuccessfulAxiosResponse("<div></div>", "searchBanner.css")

            const newMockRequest = {
                ...mockRequest,
                headers: {
                    isError: true,
                },
            }
            await getSearchBannerHandler(cache)(newMockRequest as any, mockResponse)
            done()
        })

        it("should respond with the correct failure response", () => {
            expect(mockResponse.type).toHaveBeenCalledWith("html")
            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(mockResponse.set).toHaveBeenCalledWith({"Content-Length": "0"})
            expect(mockResponse.send).toHaveBeenCalled()
        })

        it("should log the error", () => {
            // eslint-disable-next-line
            expect(BFFLogger.error).toHaveBeenCalledWith(error)
        })
    })
})

describe("Given responseHeaders", () => {
    const mockRes = {
        locals: {
            configuration: {
                isInvalid: false,
                isError: false,
                "monorepo.plp.frontend.cache-control.search": {
                    Value: "test-cache-control",
                },
            },
        },
    }
    it("should return the correct headers", () => {
        const mockApiResponseHeaders = {
            headers: {
                "edge-cache-tag": "test-edge-cache-tag",
                "cache-control": "test-cache-control",
                "last-modified": "test-last-modified",
            },
        } as any
        expect(responseHeaders(mockApiResponseHeaders, mockRes)).toEqual({
            "cache-control": "test-cache-control",
            "edge-cache-tag": "test-edge-cache-tag, dev-searchbannerui",
            "last-modified": "test-last-modified",
        })
    })

    it("should return the correct default headers", () => {
        expect(responseHeaders(null as any, mockRes)).toEqual({
            "cache-control": undefined,
            "edge-cache-tag": "dev-searchbannerui",
        })
    })
})

describe("Given getSearchBannerCss", () => {
    describe("Cache has css", () => {
        const cache = {
            get: jest.fn(() => ({
                test: "test",
            })),
            set: jest.fn(),
        }
        const mRequest = {siteUrl: {url: "url"}}
        const mResponse = {
            locals: {
                configuration: {
                    SearchBannersAppCache: {
                        Value: 100,
                    },
                },
            },
        }
        const styleSheet = "searchBanner.css"
        let sbCss = ""
        beforeEach(async () => {
            sbCss = await getSearchBannerCss(mRequest, mResponse, cache, styleSheet)
        })
        afterEach(() => {
            jest.clearAllMocks()
        })
        it("Should return searchBannerCss correctly from cache", () => {
            expect(sbCss).toEqual({test: "test"})
        })
        it("Should call cache.get", () => {
            expect(cache.get).toHaveBeenCalledWith("url/static-content/css/searchBanner.css")
        })
    })
    describe("Cache has no css", () => {
        const cache = {
            get: jest.fn(() => undefined),
            set: jest.fn(),
        }
        const mRequest = {siteUrl: {url: "url"}}
        const mResponse = {
            locals: {
                configuration: {
                    SearchBannersAppCache: {
                        Value: 100,
                    },
                },
            },
        }
        const styleSheet = "searchBanner.css"
        beforeEach(async () => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({
                    data: {
                        test: "test",
                    },
                })
            })
            await getSearchBannerCss(mRequest, mResponse, cache, styleSheet)
        })
        afterEach(() => {
            jest.clearAllMocks()
        })
        it("Should call cache.set", () => {
            expect(cache.set).toHaveBeenCalled()
            expect(cache.set).toHaveBeenCalledWith("url/static-content/css/searchBanner.css", {test: "test"}, 100)
        })
    })
    describe("Unable to call axios get", () => {
        const cache = {
            get: jest.fn(() => undefined),
            set: jest.fn(),
        }
        const mRequest = {siteUrl: {url: "url"}}
        const mResponse = {
            locals: {
                configuration: {
                    SearchBannersAppCache: {
                        Value: 100,
                    },
                },
            },
        }
        const styleSheet = "searchBanner.css"
        beforeEach(async () => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.reject()
            })
            await getSearchBannerCss(mRequest, mResponse, cache, styleSheet)
        })
        afterEach(() => {
            jest.clearAllMocks()
        })
        it("should call BFF logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith(expect.any(Error))
        })
    })
    describe("Cache has no css for invalid configuration", () => {
        const cache = {
            get: jest.fn(() => undefined),
            set: jest.fn(),
        }
        const mRequest = {siteUrl: {url: "url"}, searchBannerCss: ""}
        const mResponse = {
            locals: {
                configurationWrong: {
                    SearchBannersAppCache: {
                        Value: 100,
                    },
                },
            },
        }
        const styleSheet = "searchBanner.css"
        beforeEach(async () => {
            jest.spyOn(axios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({
                    data: {
                        test: "test",
                    },
                })
            })
            await getSearchBannerCss(mRequest, mResponse, cache, styleSheet)
        })
        afterEach(() => {
            jest.clearAllMocks()
        })
        it("Should call cache.set", () => {
            expect(cache.set).toHaveBeenCalled()
            expect(cache.set).toHaveBeenCalledWith("url/static-content/css/searchBanner.css", {test: "test"}, 0)
        })
    })
})
