import React from "react"
import {ServerStyleSheets} from "@mui/styles"
import ReactDOMServer from "react-dom/server"
import {ServerStyleSheet} from "styled-components"
import BFFLogger from "../../core/BFFLogger"
import {makeStore} from "../../../ducks"
import getServerSideProps from "../../../App.server"
import renderMiddleware from "./render"
import {generateSeoMetaTagsHtml} from "../../../utils/seo/generateSeoMetaTagsHtml"
import {selectOverrideMetadata} from "../../../ducks/feature-switch"
import {selectSeoMetadata} from "../../../utils/seo/selectSeoMetadata"
import OVERRIDE_SEO_METADATA from "./seo-metadata"

const mockPreLoadedState = {
    testState: "test",
    search: {
        includedComponents: ["seo-metadata"],
    },
}
const mockStore = {getState: jest.fn(() => mockPreLoadedState)}

jest.mock("../../../utils/seo/generateSeoMetaTagsHtml")

jest.mock("../../../ducks/feature-switch")
jest.mock("../../../utils/seo/selectSeoMetadata")
jest.mock("./seo-metadata")

jest.mock("../../../ducks", () => ({
    makeStore: jest.fn(() => mockStore),
}))

jest.mock("../../core/BFFLogger", () => ({
    dependency: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
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
            if (req.redirect)
                return Promise.resolve({
                    appProps: {mockAppProps: "EXPECTED SSR PROPS"},
                    otherProps: {searchResponse: {doRedirect: true, statusCode: 302, url: "g12345/6789"}},
                })

            return Promise.resolve({appProps: {mockAppProps: "EXPECTED SSR PROPS"}})
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

jest.mock("@mui/styles", () => ({
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
    FONTS: jest.fn(() => "<style>mock font</style>"),
}))
jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("react-redux")
jest.mock("@monorepo/utils", () => ({
    getSettingsHeadersAsObject: jest.fn(() => ({
        realm: "testRealm",
    })),
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
let actualSendHtml
const mockSend = jest.fn(html => {
    actualSendHtml = html
})
const mockResponse = {
    status: jest.fn(_statusCode => ({send: mockSend})),
    redirect: jest.fn(),
    html: mockSend,
    locals: {
        configuration: {
            "monorepo.plp.frontend.featureSwitch": {
                enablePageInFilters: false,
                overrideSeo: {
                    metadata: true,
                    headings: true,
                },
            },
        },
    },
}
const expectedHtml = `TEST HTML
__lang__
__HTML_CONTENT__
__INITIAL_STATE__
__SHEETS__
__APP_PROPS__
__FONTS__
/productsummary
`

const mockRequest = {
    html: expectedHtml,
    params: {pid: "123"},
    siteUrl: {
        url: "http://localhost:123",
        token: "/plpstatic",
    },
    headers: {
        "test-with-local-esi": false,
    },
    theme: {
        font: {
            primary: {
                regular: {
                    family: '"AzoSansRegular"',
                    filename: "AzoSans-Regular-webfont",
                    formats: ["woff", "woff2"],
                    weight: 700,
                },
                light: {
                    family: '"AzoSans"',
                    filename: "AzoSans-Light-webfont",
                    formats: ["woff", "woff2", "eot"],
                    weight: 400,
                },
                medium: {
                    family: '"AzoSansMedium"',
                    filename: "AzoSans-Medium-webfont",
                    formats: ["woff", "woff2", "eot"],
                    weight: 500,
                },
                italic: {
                    family: '"AzoSansItalic"',
                    filename: "AzoSans-Italic-webfont",
                    formats: ["woff", "woff2", "eot"],
                    weight: 400,
                },
            },
            default: '"Helvetica Neue", Arial, sans-serif',
        },
    },
}

const mockNext = jest.fn()

function mockSelectOverrideMetadata(result: any) {
    ;(selectOverrideMetadata as jest.Mock).mockReturnValue(result)
}
function mockSelectSeoMetadataResult(result: any) {
    ;(selectSeoMetadata as jest.Mock).mockReturnValue(result)
}

function mockGenerateSeoMetaTagsHtmlResult(result: any) {
    ;(generateSeoMetaTagsHtml as jest.Mock).mockReturnValue(result)
}
describe("Given a renderMiddleware", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
    describe("When running as middleware", () => {
        const seoMetadata = {title: "foo"}
        const seoMetadataHtml = "<title>foo</title>"

        beforeAll(async done => {
            mockSelectOverrideMetadata(false)
            mockSelectSeoMetadataResult(seoMetadata)
            mockGenerateSeoMetaTagsHtmlResult(seoMetadataHtml)
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

        it("snapshotgetState", () => {
            expect(mockStore.getState).toMatchSnapshot()
        })

        it("should called next function", () => {
            expect(mockNext).toHaveBeenCalled()
        })
        it("should have not called OVERRIDE_SEO_METADATA", () => {
            expect(OVERRIDE_SEO_METADATA).not.toHaveBeenCalled()
        })
        it("should correctly generate the seo metadata tags", () => {
            expect(selectSeoMetadata).toHaveBeenCalledWith(mockStore.getState())
            expect(generateSeoMetaTagsHtml).toHaveBeenCalledWith(seoMetadata, "http://localhost:123", undefined)
        })
        it("should call response send with expected html", () => {
            expect(mockResponse.html).toMatchSnapshot()
        })

        it("should call response send with expected html for IE", () => {
            process.env.IE = "url"
            expect(mockResponse.html).toMatchSnapshot()
        })
    })

    describe("When override SEO metadata", () => {
        beforeAll(async done => {
            mockSelectOverrideMetadata(true)
            await renderMiddleware(mockRequest as any, mockResponse as any, mockNext)
            done()
        })

        it("should call makeStore", () => {
            expect(makeStore).toBeCalled()
        })

        it("should call App getServerSideProps", () => {
            expect(getServerSideProps).toHaveBeenCalledWith(mockRequest, mockResponse, mockStore)
        })

        it("should have called OVERRIDE_SEO_METADATA", () => {
            expect(OVERRIDE_SEO_METADATA).toHaveBeenCalled()
            expect(OVERRIDE_SEO_METADATA).toHaveBeenCalledWith(
                "http://localhost:123",
                undefined,
                {title: "foo"},
                undefined,
            )
        })
    })
    describe("When a redirect is returned", () => {
        const mockRedirectRequest = {...mockRequest, redirect: true}

        beforeAll(async done => {
            await renderMiddleware(mockRedirectRequest as any, mockResponse as any, mockNext)
            done()
        })

        it("should call makeStore", () => {
            expect(makeStore).toBeCalled()
        })

        it("should call App getServerSideProps", () => {
            expect(getServerSideProps).toHaveBeenCalledWith(mockRedirectRequest, mockResponse, mockStore)
        })

        it("should call redirect", () => {
            expect(mockResponse.redirect).toHaveBeenCalledWith(302, "http://localhost:123/g12345/6789")
        })
    })

    describe("When language header is set", () => {
        const mockRedirectRequest = {
            ...mockRequest,
            headers: {
                "x-monorepo-language": "en",
                "x-monorepo-territory": "gb",
            },
        }

        beforeAll(async done => {
            await renderMiddleware(mockRedirectRequest as any, mockResponse as any, mockNext)
            done()
        })

        it("should call add lang to the document", () => {
            expect(mockResponse.html).toContain(`lang="en-gb"`)
        })

        it("should match the snapshot", () => {
            expect(mockResponse.html).toMatchSnapshot()
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
