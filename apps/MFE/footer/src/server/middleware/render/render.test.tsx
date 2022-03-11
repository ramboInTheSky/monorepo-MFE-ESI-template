import React from "react"
import {ServerStyleSheets} from "@mui/styles"
import ReactDOMServer from "react-dom/server"
import {ServerStyleSheet} from "styled-components"
import BFFLogger from "../../core/BFFLogger"
import {makeStore} from "../../../ducks"
import getServerSideProps from "../../../App.server"
import renderMiddleware from "./render"

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

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("../../core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

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
        getStyleTags: jest.fn(),
        seal: jest.fn(),
    })),
}))

jest.mock("clean-css", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        minify: jest.fn(() => ({
            styles: "THESE ARE MY MINIFIED STYLES YAYY",
        })),
    })),
}))

jest.mock("@material-ui/styles", () => ({
    ServerStyleSheets: jest.fn(() => ({
        collect: jest.fn(),
        getStyleElement: jest.fn(),
        toString: jest.fn(),
    })),
    createGenerateClassName: jest.fn(() => ({generateClassName: jest.fn()})),
}))
jest.mock("../../../config/env", () => ({
    REACT_APP_CDN_BASEURL: "XCDN/content",
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
}))

jest.mock("react-dom/server", () => ({
    renderToString: jest.fn(() => "MY APP RENDERED HTML"),
}))
jest.mock("@monorepo/themes", () => ({
    FONTS: "<style>mock font</style>",
}))
jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("react-redux")

let actualSendHtml

const mockResponse = {status: jest.fn(_statusCode => ({send: jest.fn()})), html: actualSendHtml}
const expectedHtml = `TEST HTML
__HTML_CONTENT__
__INITIAL_STATE__
__SHEETS__
__FONTS__
__APP_PROPS__
/footer
`

const mockRequest = {
    html: expectedHtml,
    params: {pid: "123"},
    siteUrl: {
        url: "http://localhost:123",
        token: "/footer",
    },
}

const mockNext = jest.fn()

describe("Given a renderMiddleware", () => {
    describe("When running as middleware", () => {
        beforeAll(async done => {
            await renderMiddleware(mockRequest as any, mockResponse as any, mockNext)
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

        it("should call store getState", () => {
            expect(mockStore.getState).toHaveBeenCalled()
        })
        // it("should call response status 200", () => {
        //     expect(mockResponse.status).toBeCalledWith(200)
        // })

        it("should generate the expected html", () => {
            // expect(mockSend).toBeCalled()
            expect(actualSendHtml).toMatchSnapshot()
        })
    })

    describe("When an error is thrown", () => {
        beforeAll(async done => {
            const mockErrorRequest = {throwError: true}
            await renderMiddleware(mockErrorRequest as any, mockResponse as any, mockNext)
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
