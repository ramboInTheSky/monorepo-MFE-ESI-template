import {ThemeColor, mockColors} from "@monorepo/themes"
import {ESI_MUI_CSS, ESI_CUSTOM_CSS, BUNDLE, BUNDLE_VENDOR, PRELOAD_VENDOR, PRELOAD, SPLASH_SCREEN_HTML} from "./assets"

jest.mock("../../../../package.json", () => ({
    version: "1.1.0",
}))
jest.mock("../../../config/env", () => ({
    REACT_APP_CDN_BASEURL: "xcdn-url/content",
    REACT_APP_BLOB_STORAGE_PATH: "/static-content",
    DEVELOPMENT: true,
    REACT_APP_BLOB_STORAGE_SSR_BASEURL: "https://ecmbrowsefdsxeuw.azurefd.net",
    REACT_APP_MEGANAV_ASSETS_PATH: "/meganavstatic",
}))

const mockAnalyticsData = {
    siteLayout: "Mobile",
    siteCountry: "Mexico",
    siteLanguage: "spanish",
    softwareVersion: "PLAT MOD",
}

describe(" Assets Middleware", () => {
    describe("SPLASH_SCREEN_HTML", () => {
        it("match snapshot", () => {
            const realm = "amido"
            expect(SPLASH_SCREEN_HTML(realm)).toMatchSnapshot()
        })
    })
    describe("ESI_MUI_CSS", () => {
        it("match snapshot", () => {
            expect(ESI_MUI_CSS).toMatchSnapshot()
        })
    })
    describe("ESI_CUSTOM_CSS", () => {
        it("match snapshot", () => {
            expect(ESI_CUSTOM_CSS).toMatchSnapshot()
        })
    })
    describe("BUNDLE", () => {
        it("match snapshot", () => {
            expect(BUNDLE("http://amido.com/en", false)).toMatchSnapshot()
        })
        it("when using the dev esi, it should match snapshot", () => {
            expect(BUNDLE("http://amido.com/en", true)).toMatchSnapshot()
        })
    })
    describe("BUNDLE_VENDOR", () => {
        it("match snapshot", () => {
            expect(BUNDLE_VENDOR("http://amido.com/en", false)).toMatchSnapshot()
        })
        it("when using the dev esi, it should match snapshot", () => {
            expect(BUNDLE_VENDOR("http://amido.com/en", true)).toMatchSnapshot()
        })
    })
    describe("PRELOAD_VENDOR", () => {
        const testColours: ThemeColor = mockColors
        it("match snapshot", () => {
            expect(
                PRELOAD_VENDOR(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    false,
                    true,
                    "//se.test.net/js/2/testId/p/test.ae/test.js",
                    true,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    false,
                    "realm_amido",
                    "Amido",
                    false,
                    "",
                    false,
                    false,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })
        it("when using the dev esi, it should match snapshot", () => {
            expect(
                PRELOAD_VENDOR(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    true,
                    true,
                    "//se.test.net/js/2/testId/p/test.ae/test.js",
                    true,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    false,
                    "realm_amido",
                    "Amido",
                    false,
                    "",
                    false,
                    false,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })
    })
    describe("PRELOAD", () => {
        const testColours: ThemeColor = mockColors
        it("match snapshot", () => {
            expect(
                PRELOAD(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    false,
                    true,
                    "test.js",
                    true,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    false,
                    "realm_amido",
                    "Amido",
                    false,
                    "",
                    false,
                    false,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })
        it("when using the dev esi, it should match snapshot", () => {
            expect(
                PRELOAD(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    true,
                    true,
                    "test.js",
                    true,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    false,
                    "realm_amido",
                    "Amido",
                    false,
                    "",
                    false,
                    false,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })
        it("When not using GA, it should match snapshot", () => {
            expect(
                PRELOAD(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    false,
                    false,
                    "test.js",
                    true,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    false,
                    "realm_amido",
                    "Amido",
                    false,
                    "",
                    false,
                    false,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })
        it("When not using Monetate, it should match snapshot", () => {
            expect(
                PRELOAD(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    false,
                    true,
                    "test.js",
                    false,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    false,
                    "realm_amido",
                    "Amido",
                    false,
                    "",
                    false,
                    false,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })

        it("When using QueueIt, it should match snapshot", () => {
            expect(
                PRELOAD(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    false,
                    false,
                    "test.js",
                    true,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    true,
                    "realm_amido",
                    "Amido",
                    false,
                    "",
                    false,
                    false,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })

        it("When using user consent management, it should match snapshot", () => {
            expect(
                PRELOAD(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    false,
                    true,
                    "//se.test.net/js/2/testId/p/test.ae/test.js",
                    true,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    false,
                    "realm_amido",
                    "Amido",
                    true,
                    "dataDomainScriptGuid",
                    true,
                    false,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })

        it("When using ABPlatformConfig, it should match snapshot", () => {
            expect(
                PRELOAD(
                    "http://amido.com/en",
                    testColours,
                    "v1.1.9",
                    false,
                    true,
                    "//se.test.net/js/2/testId/p/test.ae/test.js",
                    true,
                    "GA Account",
                    "GA ENV",
                    mockAnalyticsData,
                    false,
                    "realm_amido",
                    "Amido",
                    false,
                    "",
                    false,
                    true,
                    "/configs/abplatform/test.amido.com-abconfig.js",
                ),
            ).toMatchSnapshot()
        })
    })
})
