import {getSettingsHeadersAsObject} from "@monorepo/utils"
import mockAxios from "../../core/xhr"
import themeMiddleware from "."
import BFFLogger from "../../core/BFFLogger"

jest.mock("../../core/xhr", () => ({
    get: jest.fn(),
}))

jest.mock("@monorepo/utils", () => ({
    getSettingsHeadersAsObject: jest.fn(),
}))

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

describe("themeMiddleware", () => {
    describe("Working scenario with themes available from cache", () => {
        const cache = {
            get: jest.fn(() => ({
                test: "yeah",
            })),
            set: jest.fn(),
        }
        const mockRequest = {headers: {realm: "amido"}}

        const mockResponse = {
            locals: {
                configuration: {
                    "footer.frontend.appCacheTTL": {Value: 22},
                    "footer.frontend.themeVersion": {Value: "v3.3.3"},
                    "footer.frontend.variant": {Value: "default"},
                },
            },
        }

        const mockNext = jest.fn()

        beforeEach(async () => {
            await themeMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })

        it("Should return a function when not curried", () => {
            expect(themeMiddleware(cache)).toBeInstanceOf(Function)
        })
        it("Should call getSettingsHeadersAsObject", () => {
            expect(getSettingsHeadersAsObject).toHaveBeenCalled()
        })
        it("Should call cache.get", () => {
            const themeUrl = "https://ecmbrowsefdsxeuw.azurefd.net/static-content/theme/v3.3.3/amido_theme.json"
            expect(cache.get).toHaveBeenCalled()
            expect(cache.get).toHaveBeenCalledWith(themeUrl)
        })
        it("Should NOT call axios", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockAxios.get).not.toHaveBeenCalled()
        })
        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
    describe("Working scenario with no themes available from cache", () => {
        const cache = {get: jest.fn(() => null), set: jest.fn()}
        const mockRequest = {headers: {}}

        const mockResponse = {
            locals: {
                configuration: {
                    "footer.frontend.appCacheTTL": {Value: 22},
                    "footer.frontend.themeVersion": {Value: "v3.3.3"},
                    "footer.frontend.variant": {Value: "default"},
                },
            },
        }

        const mockNext = jest.fn()

        beforeEach(async () => {
            jest.spyOn(mockAxios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({
                    data: {
                        test: "test",
                    },
                })
            })
            await themeMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })

        it("Should cache.get", () => {
            const themeUrl = "https://ecmbrowsefdsxeuw.azurefd.net/static-content/theme/v3.3.3/amido_theme.json"
            expect(cache.get).toHaveBeenCalled()
            expect(cache.get).toHaveBeenCalledWith(themeUrl)
        })
        it("Should call axios", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockAxios.get).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockAxios.get).toHaveBeenCalledWith(
                "https://ecmbrowsefdsxeuw.azurefd.net/static-content/theme/v3.3.3/amido_theme.json",
            )
        })

        it("Should cache.set", () => {
            expect(cache.set).toHaveBeenCalled()
            expect(cache.set).toHaveBeenCalledWith(
                "https://ecmbrowsefdsxeuw.azurefd.net/static-content/theme/v3.3.3/amido_theme.json",
                {test: "test"},
                22,
            )
        })
        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })

    describe("Working scenario with variant", () => {
        const cache = {get: jest.fn(() => null), set: jest.fn()}
        const mockRequest = {headers: {}}

        const mockResponse = {
            locals: {
                configuration: {
                    "footer.frontend.appCacheTTL": {Value: 22},
                    "footer.frontend.themeVersion": {Value: "v3.3.3"},
                    "footer.frontend.variant": {Value: "inverted"},
                },
            },
        }

        const mockNext = jest.fn()

        beforeEach(async () => {
            jest.spyOn(mockAxios, "get").mockImplementationOnce(async () => {
                return Promise.resolve({
                    data: {
                        test: "test",
                    },
                })
            })
            await themeMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })

        it("should call cache.get", () => {
            const themeUrl =
                "https://ecmbrowsefdsxeuw.azurefd.net/static-content/theme/v3.3.3/amido_inverted_theme.json"
            expect(cache.get).toHaveBeenCalled()
            expect(cache.get).toHaveBeenCalledWith(themeUrl)
        })
    })

    describe("Call BFF logger error when headers not provided", () => {
        const cache = {
            get: jest.fn(() => {
                throw new Error("abc")
            }),
            set: jest.fn(),
        }
        const mockResponse = null
        const mockRequest = {headers: {}}

        const mockNext = jest.fn()

        beforeEach(async () => {
            await themeMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })

        it("Should not call mockNext", () => {
            expect(mockNext).not.toHaveBeenCalled()
        })
        it("should call BFF logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith(expect.any(Error))
        })
    })
    describe("default version of themes without configuration object inside locals object", () => {
        const cache = {
            get: jest.fn(() => null),
            set: jest.fn(),
        }
        const mockResponse = {
            locals: {},
        }
        const mockRequest = {headers: {realm: "amido"}}

        const mockNext = jest.fn()

        beforeEach(async () => {
            await themeMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })
        it("should fall back 8.0.0 version of themes", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockAxios.get).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(mockAxios.get).toHaveBeenCalledWith(
                "https://ecmbrowsefdsxeuw.azurefd.net/static-content/theme/v8.0.0/amido_theme.json",
            )
        })
        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
    describe("Call BFF logger if realm is not provided", () => {
        const cache = {
            get: jest.fn(() => ({
                test: "yeah",
            })),
            set: jest.fn(),
        }
        const mockResponse = {
            locals: {},
        }
        const mockRequest = {headers: {}}

        const mockNext = jest.fn()

        beforeEach(async () => {
            await themeMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })
        it("should call BFF logger warn", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.warn).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.warn).toHaveBeenCalledWith("Error getting realm, defaulting to next")
        })
        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
    describe("Unable to call axios get, default to next", () => {
        const cache = {
            get: jest.fn(() => ({
                test: "yeah",
            })),
            set: jest.fn(),
        }

        const mockResponse = {
            locals: {},
        }

        const mockNext = jest.fn()

        const mockRequest = {headers: {realm: "amido"}}

        beforeEach(async () => {
            jest.spyOn(mockAxios, "get").mockImplementationOnce(async () => {
                return Promise.reject()
            })
            await themeMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })
        it("should call BFF logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.warn).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.warn).toHaveBeenCalledWith("Error getting realm next, defaulting to next")
        })
        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
})
