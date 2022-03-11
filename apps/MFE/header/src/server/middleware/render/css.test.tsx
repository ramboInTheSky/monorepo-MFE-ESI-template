import React from "react"
import {ServerStyleSheets} from "@mui/styles"
import ReactDOMServer from "react-dom/server"
import {ServerStyleSheet} from "styled-components"
import BFFLogger from "../../core/BFFLogger"
import getServerSideProps from "../../../App.server"
import {makeStore} from "../../../ducks"

import renderMiddleware from "./css"

const mockPreLoadedState = {testState: "test"}
const mockStore = {getState: jest.fn(() => mockPreLoadedState)}
jest.mock("../../../ducks", () => ({
    makeStore: jest.fn(() => mockStore),
}))
jest.mock("../../../App", () => {
    const mockApp = () => {
        return <div />
    }
    return {
        __esModule: true,
        default: mockApp,
    }
})
jest.mock("../../../App.server", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        default: jest.fn(async req => {
            if (req.throwError) throw new Error("MY TEST ERRPR")
            return {mockAppProps: "EXPECTED SSR PROPS"}
        }),
        // eslint-disable-next-line @typescript-eslint/require-await
        getServerSideProps: jest.fn(async req => {
            if (req.throwError) throw new Error("MY TEST ERRPR")
            return {mockAppProps: "EXPECTED SSR PROPS"}
        }),
    }
})
jest.mock("styled-components", () => ({
    ServerStyleSheet: jest.fn(() => ({
        collectStyles: jest.fn(),
        getStyleElement: jest.fn(),
        getStyleTags: jest.fn(() => "<style> this is my CSS </style>"),
        seal: jest.fn(),
    })),
}))
jest.mock("@material-ui/styles", () => ({
    ServerStyleSheets: jest.fn(() => ({
        collect: jest.fn(),
        getStyleElement: jest.fn(),
        toString: jest.fn(() => "This is the MAterial UI CSS yayyy "),
    })),
    createGenerateClassName: jest.fn(() => ({generateClassName: jest.fn()})),
}))

const mockMinify = jest.fn(() => ({
    styles: "THESE ARE MY MINIFIED STYLES YAYY",
}))

jest.mock("clean-css", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        minify: mockMinify,
    })),
}))

jest.mock("../../../config/env", () => ({
    REACT_APP_CDN_BASEURL: "xcdn-url/content",
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
}))
jest.mock("react-dom/server", () => ({
    renderToString: jest.fn(() => "MY APP RENDERED HTML"),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("react-redux")

let actualSendCSS
const mockSend = jest.fn(CSS => {
    actualSendCSS = CSS
})
const mockResponse = {
    status: jest.fn(_statusCode => ({send: mockSend})),
    header: jest.fn(),
    locals: {
        configuration: {
            "productsummary.frontend.appCacheTTL": {Value: "3600"},
        },
    },
}

const expectedCSS = "TEST CSS"

const mockRequest = {
    html: expectedCSS,
    params: {pid: "123"},
    siteUrl: {
        url: "http://localhost:123",
        token: "/productsummary",
    },
}

describe("Given a renderMiddleware", () => {
    describe("When running as middleware", () => {
        beforeAll(async done => {
            await renderMiddleware(mockRequest as any, mockResponse as any, {} as any)
            done()
        })

        it("should call makeStore", () => {
            expect(makeStore).toBeCalled()
        })

        it("should call App getServerSideProps", () => {
            expect(getServerSideProps).toHaveBeenCalledWith(mockRequest, mockResponse, mockStore)
        })

        it("should create a ServerStyleSheet", () => {
            expect(ServerStyleSheet).toHaveBeenCalled()
        })

        it("should create a ServerStyleSheets", () => {
            expect(ServerStyleSheets).toHaveBeenCalled()
        })

        it("should call ReactDOMServer renderToString", () => {
            expect(ReactDOMServer.renderToString).toHaveBeenCalled()
        })

        it("should call header", () => {
            expect(mockResponse.header).toHaveBeenCalledTimes(2)
        })

        it("should call status", () => {
            expect(mockResponse.status).toHaveBeenCalledWith(200)
        })

        it("should call the minified with MaterialUI CSS", () => {
            expect(mockMinify).toHaveBeenCalledWith(" this is my CSS ")
        })

        it("should call response send with expected css", () => {
            expect(mockSend).toBeCalled()
            expect(actualSendCSS).toMatchSnapshot()
        })
    })

    describe("When requesting material ui css", () => {
        const mockMaterialUIRequest = {
            html: expectedCSS,
            params: {pid: "123", type: "materialui"},
            siteUrl: {
                url: "http://localhost:123",
                token: "/productsummary",
            },
        }
        beforeAll(async done => {
            await renderMiddleware(mockMaterialUIRequest as any, mockResponse as any, {} as any)
            done()
        })

        it("should call the minified with MaterialUI CSS", () => {
            expect(mockMinify).toHaveBeenCalledWith("This is the MAterial UI CSS yayyy ")
        })
    })

    describe("When an error is thrown", () => {
        beforeAll(async done => {
            const mockErrorRequest = {throwError: true}
            await renderMiddleware(mockErrorRequest as any, mockResponse as any, {} as any)
            done()
        })

        it("should log the error", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toHaveBeenCalledWith(expect.any(Error))
        })

        it("should call response status 500", () => {
            expect(mockResponse.status).toBeCalledWith(500)
        })
    })
})
