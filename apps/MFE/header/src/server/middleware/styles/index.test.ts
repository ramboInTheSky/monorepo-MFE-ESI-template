import fs from "fs"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import path from "path"
import BFFLogger from "../../core/BFFLogger"
import {styleMiddleware} from "."
import {mockRealmStyles} from "../../../../__mocks__/mockStore"

const mockStyles = mockRealmStyles

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

jest.mock("path", () => ({
    join: jest.fn(() => "publicPath"),
}))

jest.mock("fs", () => ({
    promises: {
        readFile: jest.fn(async (_path): Promise<Buffer> => {
            return Promise.resolve(Buffer.from(JSON.stringify(mockStyles), "utf-8"))
        }),
    },
}))

describe("styleMiddleware", () => {
    describe("Working scenario with styles available from cache", () => {
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
                    "header.frontend.appCacheTTL": {Value: 22},
                    "header.frontend.style": {Value: "variant-next"},
                },
            },
        }

        const mockNext = jest.fn()

        beforeEach(async () => {
            jest.spyOn(fs.promises, "readFile").mockImplementationOnce(async (_path): Promise<Buffer> => {
                return Promise.resolve(Buffer.from(JSON.stringify(mockStyles), "utf-8"))
            })
            await styleMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })

        it("should call path.join", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(path.join).toBeCalledWith(__dirname, "/public")
        })

        it("Should return a function when not curried", () => {
            expect(styleMiddleware(cache)).toBeInstanceOf(Function)
        })
        it("Should call getSettingsHeadersAsObject", () => {
            expect(getSettingsHeadersAsObject).toHaveBeenCalled()
        })
        it("Should call cache.get", () => {
            const styleUrl = "publicPath/styles/variant-next-style-settings.json"
            expect(cache.get).toHaveBeenCalled()
            expect(cache.get).toHaveBeenCalledWith(styleUrl)
        })
        it("Should not call readFile", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).not.toHaveBeenCalled()
        })
        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
    describe("Working scenario with no styles available from cache", () => {
        const cache = {get: jest.fn(() => null), set: jest.fn()}
        const mockRequest = {headers: {}}

        const mockResponse = {
            locals: {
                configuration: {
                    "header.frontend.appCacheTTL": {Value: 22},
                    "header.frontend.style": {Value: "test"},
                },
            },
        }

        const mockNext = jest.fn()

        jest.spyOn(fs.promises, "readFile").mockImplementationOnce(async (_path): Promise<Buffer> => {
            return Promise.resolve(Buffer.from(JSON.stringify(mockStyles), "utf-8"))
        })

        beforeEach(async () => {
            await styleMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })

        it("Should cache.get", () => {
            const styleUrl = "publicPath/styles/test-style-settings.json"
            expect(cache.get).toHaveBeenCalled()
            expect(cache.get).toHaveBeenCalledWith(styleUrl)
            expect(cache.get).toReturnWith(null)
        })
        it("Should call readFile", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).toHaveBeenCalledWith("publicPath/styles/test-style-settings.json")
        })

        it("Should cache.set", () => {
            expect(cache.set).toHaveBeenCalled()
            expect(cache.set).toHaveBeenCalledWith("publicPath/styles/test-style-settings.json", mockStyles, 22)
        })

        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })

    describe("Call BFF logger error when cache get fails", () => {
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
            jest.spyOn(fs.promises, "readFile").mockImplementationOnce(async (_path): Promise<Buffer> => {
                return Promise.resolve(Buffer.from(JSON.stringify(mockStyles), "utf-8"))
            })
            await styleMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })
        it("should call BFF logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith(expect.any(Error))
        })

        it("Should not call mockNext", () => {
            expect(mockNext).not.toHaveBeenCalled()
        })
    })
    describe("default version of styles without configuration object inside locals object", () => {
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
            jest.spyOn(fs.promises, "readFile").mockImplementationOnce(async (_path): Promise<Buffer> => {
                return Promise.resolve(Buffer.from(JSON.stringify(mockStyles), "utf-8"))
            })
            await styleMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })
        it("should fall back on realm styles", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).toHaveBeenCalledWith("publicPath/styles/amido-style-settings.json")
        })
        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
    describe("Unable to call readFile, default to next", () => {
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

        jest.spyOn(fs.promises, "readFile").mockImplementationOnce(async (_path): Promise<Buffer> => {
            return Promise.reject(new Error("not found"))
        })
        beforeEach(async () => {
            await styleMiddleware(cache)(mockRequest, mockResponse, mockNext)
        })
        it("should call BFF logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.warn).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.warn).toHaveBeenCalledWith("Error getting styles. Defaulting to next.")
        })

        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
})
