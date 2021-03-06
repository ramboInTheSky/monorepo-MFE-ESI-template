import fs from "fs"
import {textMiddleware} from "."

const mockText = {
    arrowIconUrlAltText: "Menu expand icon",
    bannerAltText: "Banner image",
    chevronIconAltText: "Chevron icon",
    drawerIconAltText: "Drawer close icon",
}

enum configurationKeys {
    appCache = "appCacheTTL",
    textData = "textData",
}

const logger = {
    warn: jest.fn(),
    error: jest.fn(),
}

jest.mock("fs", () => ({
    promises: {
        readFile: jest.fn(async (_path): Promise<Buffer> => {
            return Promise.resolve(
                Buffer.from(
                    JSON.stringify({
                        arrowIconUrlAltText: "Menu expand icon",
                        bannerAltText: "Banner image",
                        chevronIconAltText: "Chevron icon",
                        drawerIconAltText: "Drawer close icon",
                    }),
                    "utf-8",
                ),
            )
        }),
    },
}))

describe("textMiddleware", () => {
    describe("Working scenario with text available from cache", () => {
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
                    appCacheTTL: {Value: 22},
                    textData: {Value: "default-text"},
                },
            },
        }

        const mockNext = jest.fn()

        beforeEach(async () => {
            jest.spyOn(fs.promises, "readFile").mockImplementationOnce(async (_path): Promise<Buffer> => {
                return Promise.resolve(Buffer.from(JSON.stringify(mockText), "utf-8"))
            })

            await textMiddleware("publicPath", configurationKeys, cache, logger)(mockRequest, mockResponse, mockNext)
        })

        it("Should return a function when not curried", () => {
            expect(textMiddleware("publicPath", configurationKeys, cache, logger)).toBeInstanceOf(Function)
        })
        it("Should call cache.get", () => {
            const textUrl = "publicPath/text/default-text.json"
            expect(cache.get).toHaveBeenCalled()
            expect(cache.get).toHaveBeenCalledWith(textUrl)
            expect(cache.get).toHaveReturnedWith({
                test: "yeah",
            })
        })
        it("Should not call readFile", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).not.toHaveBeenCalled()
        })
        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
    describe("Working scenario with no text available from cache", () => {
        const cache = {get: jest.fn(() => null), set: jest.fn()}
        const mockRequest = {headers: {}}

        const mockResponse = {
            locals: {
                configuration: {
                    appCacheTTL: {Value: 22},
                    textData: {Value: "default-text"},
                },
            },
        }

        const mockNext = jest.fn()

        jest.spyOn(fs.promises, "readFile").mockImplementationOnce(async (_path): Promise<Buffer> => {
            return Promise.resolve(Buffer.from(JSON.stringify(mockText), "utf-8"))
        })

        beforeEach(async () => {
            await textMiddleware("publicPath", configurationKeys, cache, logger)(mockRequest, mockResponse, mockNext)
        })

        it("Should cache.get", () => {
            const textUrl = "publicPath/text/default-text.json"
            expect(cache.get).toHaveBeenCalled()
            expect(cache.get).toHaveBeenCalledWith(textUrl)
            expect(cache.get).toReturnWith(null)
        })
        it("Should call readFile", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).toHaveBeenCalledWith("publicPath/text/default-text.json")
        })

        it("Should cache.set", () => {
            expect(cache.set).toHaveBeenCalled()
            expect(cache.set).toHaveBeenCalledWith(
                "publicPath/text/default-text.json",
                JSON.parse(JSON.stringify(mockText)),
                22,
            )
        })

        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
    describe("default version of text without configuration object inside locals object", () => {
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
            await textMiddleware("publicPath", configurationKeys, cache, logger)(mockRequest, mockResponse, mockNext)
        })
        it("should fall back v1 version of text", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(fs.promises.readFile).toHaveBeenCalledWith("publicPath/text/default-text.json")
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
            await textMiddleware("publicPath", configurationKeys, cache, logger)(mockRequest, mockResponse, mockNext)
        })
        it("should call BFF logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.warn).toHaveBeenCalled()

            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.warn).toHaveBeenCalledWith("Error getting text object")
        })

        it("Should call mockNext", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })
})
