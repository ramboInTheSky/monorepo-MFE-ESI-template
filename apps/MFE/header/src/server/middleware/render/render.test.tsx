import React from "react"
import {ServerStyleSheets} from "@mui/styles"
import ReactDOMServer from "react-dom/server"
import {ServerStyleSheet} from "styled-components"
import BFFLogger from "../../core/BFFLogger"
import {makeStore} from "../../../ducks"
import getServerSideProps from "../../../App.server"
import renderMiddleware from "./render"
import getGoogleAnalyticsConfig from "../../../utils/getGoogleAnalyticsConfig"
import {SettingsSdkKeys} from "../../../models/settings"

const mockPreLoadedState = {testState: "test"}
const mockStore = {getState: jest.fn(() => mockPreLoadedState)}

jest.mock("@monorepo/utils", () => ({
    getSettingsHeadersAsObject: jest.fn(headers => {
        const realm = "x-monorepo-realm"
        const territory = "x-monorepo-territory"
        const language = "x-monorepo-language"

        if (!headers[realm] || !headers[territory] || !headers[language]) {
            throw new Error("error")
        }

        return {
            realm: headers[realm],
            territory: headers[territory],
            language: headers[language],
        }
    }),
}))

jest.mock("../../../ducks", () => ({
    makeStore: jest.fn(() => mockStore),
}))

jest.mock("../../../utils/getGoogleAnalyticsConfig", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        useGoogleAnalytics: true,
        account: "test account",
        environmentKey: "test env key",
    })),
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
    REACT_APP_CDN_BASEURL: "xcdn-url/content",
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
    DEVELOPMENT: true,
}))
jest.mock("react-dom/server", () => ({
    renderToString: jest.fn(() => "MY APP RENDERED HTML"),
}))
jest.mock("@monorepo/themes", () => ({
    FONTS: jest.fn(() => "<style>mock font</style>"),
}))
jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("react-redux")

let actualSendHtml

const mockResponse = {
    status: jest.fn(_statusCode => ({send: jest.fn()})),
    html: actualSendHtml,
    locals: {
        configuration: {
            [SettingsSdkKeys.bookmarkTitle]: "Next",
        },
    },
}
const expectedHtml = `TEST HTML
__DEVELOPER_MODE__ 
__ESI_MUI_CSS__ 
__SHEETS__ 
__ESI_CUSTOM_CSS__
__SPLASH_SCREEN_HTML__
<script>
  window.ssrClientSettings = window.ssrClientSettings || {}
  window.ssrClientSettings.header = {
    _STATE_: __INITIAL_STATE__,
    appProps: __APP_PROPS__,
  }
  window.AmidoFavourites = window.AmidoFavourites || {}
</script>

<noscript>You need to enable JavaScript to run thisapp.</noscript>
<div id="header-entrypoint">__HTML_CONTENT__</div>
__GTM__ __END_DEVELOPER_MODE__
/header
`

const mockRequest = {
    html: expectedHtml,
    params: {pid: "123"},
    siteUrl: {
        url: "http://localhost:123",
        token: "/header",
    },
    headers: {
        "test-with-local-esi": false,
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "gb",
        "x-monorepo-language": "en",
    },
}

const mockRequestWithAppScope = {
    html: expectedHtml,
    params: {pid: "123"},
    siteUrl: {
        url: "http://localhost:123",
        token: "/header",
    },
    headers: {
        "test-with-local-esi": false,
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "gb",
        "x-monorepo-language": "en",
    },
    appScope: "test-static-test",
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

        it("should call getGoogleAnalyticsConfig", () => {
            expect(getGoogleAnalyticsConfig).toHaveBeenCalled()
        })

        it("should generate the expected html", () => {
            expect(mockResponse.html).toMatchSnapshot()
        })

        it("should call next()", () => {
            expect(mockNext).toHaveBeenCalled()
        })
    })

    describe("When running as middleware with AppScope", () => {
        beforeAll(async done => {
            await renderMiddleware(mockRequestWithAppScope as any, mockResponse as any, mockNext)
            done()
        })

        it("should call App getServerSideProps", () => {
            expect(getServerSideProps).toHaveBeenCalledWith(mockRequestWithAppScope, mockResponse, mockStore)
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
