import React from "react"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import ReactDOMServer from "react-dom/server"
import {Provider} from "react-redux"
import {SCThemeProvider} from "@monorepo/theme-provider"
import mockStore, {mockTextAlignment, mockRealmStyles, mockTheme} from "../__mocks__/mockStore"
import {updateTextAlignment} from "./ducks/text-alignment"
import {isSettingsError} from "./utils/setApiUrlSettings"
import {
    setRequestAction,
    setGeolocationUrlAction,
    setUseTimeMachineCookieAction,
    setBrCookieInfoAction,
    setBloomreachInfoAction,
    setTerritoryDetailsAction,
    setMonetateInfoAction,
    setCokieDomainAction,
    setSaleWarningModalAction,
} from "./ducks/request"
import {setLanguageSettings} from "./utils/languageSelector"
import App from "./App"
import BFFLogger from "./server/core/BFFLogger"
import {getServerSideProps as headerGetServerSideProps} from "./compositions/header/index.server"
import {getServerSideProps as getSSProps} from "./App.server"
import {updateFeatureSwitch} from "./ducks/feature-switch"
import {setFavouritesSettings} from "./ducks/favourites"
import {updateCountrySelectorSettings} from "./ducks/country-selector"

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
jest.mock("./GlobalStyle", () => {
    const mockApp = () => {
        return <div />
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    return {GlobalStyle: mockApp}
})
jest.mock("@monorepo/theme-provider", () => {
    const mockApp = () => {
        return <div> dasd </div>
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    return {
        __esModule: true,
        default: mockApp,
        // eslint-disable-next-line react/display-name
        SCThemeProvider: ({theme, children}) => (
            <div>
                {theme.toString()}
                {children}
            </div>
        ),
    }
})
jest.mock("./utils/window", () => ({
    IS_BROWSER: () => false,
}))
jest.mock("./utils/setApiUrlSettings", () => ({
    isSettingsError: jest.fn(configuration => {
        if (!configuration) return true
        return false
    }),
}))
jest.mock("./ducks/text-alignment", () => ({
    updateTextAlignment: jest.fn(),
}))
jest.mock("./ducks/country-selector", () => ({
    updateCountrySelectorSettings: jest.fn(),
}))
jest.mock("./utils/getTextAlignment", () => {
    return {
        __esModule: true,
        default: () => mockTextAlignment,
    }
})
jest.mock("./ducks/request", () => ({
    setRequestAction: jest.fn(),
    setGeolocationUrlAction: jest.fn(),
    setUseTimeMachineCookieAction: jest.fn(),
    setBrCookieInfoAction: jest.fn(),
    setBloomreachInfoAction: jest.fn(),
    setTerritoryDetailsAction: jest.fn(),
    setMonetateInfoAction: jest.fn(),
    setCokieDomainAction: jest.fn(),
    setSaleWarningModalAction: jest.fn(),
}))
jest.mock("./utils/languageSelector", () => ({
    setLanguageSettings: jest.fn(),
}))
jest.mock("./utils/setBloomreachCookie", () => ({
    setBloomreachCookie: jest.fn(),
}))
jest.mock("./server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))
jest.mock("./ducks/favourites", () => ({
    setFavouritesSettings: jest.fn(),
}))
jest.mock("./ducks/feature-switch", () => ({
    updateFeatureSwitch: jest.fn(),
}))
jest.mock("./utils/cookies/getCookieDomain", () => ({
    getCookieDomain: jest.fn(() => "www.cookie.com"),
}))

jest.mock("./compositions/header/index.server", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        getServerSideProps: jest.fn(async () => {
            return {
                props: "EXPECTED SSR PROPS",
            }
        }),
    }
})

jest.mock("./compositions/header", () => {
    const mockApp = () => {
        return <div />
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    mockApp.getServerSideProps = jest.fn(() => ({
        props: "EXPECTED SSR PROPS",
    }))
    return {
        __esModule: true,
        default: mockApp,
    }
})

it("renders without crashing", () => {
    ;(window as any).themeColours = {
        "v1.1.1": {
            color: "red",
        },
    }
    const props = {
        themeVersion: "v1.1.1",
        themeColours: mockTheme,
        appScope: "header",
        styles: mockRealmStyles,
    }
    expect(
        ReactDOMServer.renderToString(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <App {...props} />
                </SCThemeProvider>
            </Provider>,
        ),
    ).toMatchSnapshot()
})

const mockRequest = {
    headers: {
        "x-monorepo-realm": "amido",
        "x-monorepo-territory": "gb",
        "x-monorepo-language": "en",
    },
    theme: mockTheme,
    siteUrl: {
        url: "www.siteUrl.com",
    },
}
const mockResponse = {
    req: {
        test: "TEST REQUEST",
        headers: {
            "x-monorepo-siteurl": "Test siteurl",
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "gb",
            "x-monorepo-language": "en",
        },
    },
    locals: {
        configuration: {
            "header.frontend.countrySelector": {Value: "true"},
            "header.frontend.appCacheTTL": {Value: "3600"},
            "header.frontend.themeVersion": {Value: "v9.0.1"},
            "header.frontend.cache-control.max-age": {Value: "no-store"},
            "header.frontend.cache-control.default-header.max-age": {Value: "no-store"},
            "header.frontend.enableFavourites": {Value: true},
            "header.frontend.featureSwitch": {
                SearchBar: {
                    SimpleSearch: {
                        Value: true,
                        RecentSearch: {
                            MaxItems: 6,
                        },
                        Autocomplete: {
                            MaxItems: 10,
                        },
                    },
                    EnrichSearch: {
                        Value: false,
                        RecentSearch: {
                            MaxItems: 12,
                        },
                        Autocomplete: {
                            MaxItems: 10,
                            ProductsMaxItems: {
                                xs: 8,
                                sm: 8,
                                md: 4,
                                lg: 4,
                                xl: 5,
                            },
                        },
                    },
                },
            },
            "header.frontend.realmName": {Value: "amido"},
            "header.frontend.autoComplete": {
                accountId: 6042,
                domainKey: "amido",
                authKey: "vyzz50jis1i9dbxj",
            },
            "header.frontend.territoryName": {Value: "GB"},
            "header.alternativeLanguages": [{Value: "7"}],
            "header.frontend.languageName": {Value: "en"},
            "header.frontend.direction": {Value: "ltr"},
        },
    },
}

describe("Given an App", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("When configuration is valid", () => {
        let response = {}
        beforeEach(async done => {
            response = await getSSProps(mockRequest, mockResponse, mockStore)
            done()
        })
        it("should check for settings errors", () => {
            expect(isSettingsError).toBeCalledWith(mockResponse.locals.configuration)
        })
        it("Should call updateTextAlignment", () => {
            expect(updateTextAlignment).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call updateCountrySelectorSettings", () => {
            expect(updateCountrySelectorSettings).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call updateRequest", () => {
            expect(setRequestAction).toBeCalledWith(mockStore, mockResponse.req)
        })
        it("Should call setCokieDomainAction", () => {
            expect(setCokieDomainAction).toBeCalledWith(mockStore, "www.cookie.com")
        })
        it("Should call setSaleWarningModalAction", () => {
            expect(setSaleWarningModalAction).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call Header getServerSideProps", () => {
            expect(headerGetServerSideProps).toBeCalledWith(mockRequest, mockResponse, mockStore)
        })
        it("Should call setLanguageSettings", () => {
            expect(setLanguageSettings).toBeCalledWith(mockStore, mockResponse.locals.configuration, "Test siteurl")
        })
        it("Should call setFavouritesSettings", () => {
            expect(setFavouritesSettings).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call setGeolocationUrlAction", () => {
            expect(setGeolocationUrlAction).toBeCalledWith(
                mockStore,
                "https://services-uat.test.ecomm.systems/geolocation",
                mockResponse.locals.configuration,
            )
        })
        it("Should call setUseTimeMachineCookieAction", () => {
            expect(setUseTimeMachineCookieAction).toBeCalledWith(mockStore, "false")
        })
        it("Should call setBrCookieInfoAction", () => {
            expect(setBrCookieInfoAction).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call setBloomreachInfoAction", () => {
            expect(setBloomreachInfoAction).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call setTerritoryDetailsAction", () => {
            expect(setTerritoryDetailsAction).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call setMonetateInfoAction", () => {
            expect(setMonetateInfoAction).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call updateFeatureSwitch", () => {
            expect(updateFeatureSwitch).toBeCalledWith(mockStore, mockResponse.locals.configuration)
        })
        it("Should call getSettingsHeadersAsObject", () => {
            expect(getSettingsHeadersAsObject).toHaveBeenCalled()
        })
        it("should return ssr props ", () => {
            expect(response).toEqual({
                props: "EXPECTED SSR PROPS",
                themeColours: mockTheme,
                textAlignment: mockTextAlignment,
                realm: "amido",
                themeVersion: "v9.0.1",
            })
        })
    })

    describe("When configuration is invalid", () => {
        describe("When configuration is null", () => {
            it("Should call getSettingsHeadersAsObject and call BFFlogger.error", async () => {
                const newMockResponse = {
                    locals: {
                        configuration: null,
                    },
                    req: {
                        headers: {
                            "x-monorepo-realm": "amido",
                            "x-monorepo-territory": "gb",
                            "x-monorepo-language": "en",
                        },
                    },
                }
                await expect(getSSProps(mockRequest, newMockResponse, mockStore)).rejects.toThrow()
                expect(getSettingsHeadersAsObject).toBeCalled()
                expect(getSettingsHeadersAsObject).toBeCalledWith({
                    "x-monorepo-language": "en",
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "gb",
                })
                expect(BFFLogger.error).toBeCalledWith(expect.any(Error))
            })
        })

        describe("When enable favourites is null", () => {
            it("Should call isSettingsError and call BFFlogger.error", async () => {
                const removeProp = "header.frontend.enableFavourites"
                const {[removeProp]: remove, ...newMockConfiguration} = mockResponse.locals.configuration
                const newMockResponse = {
                    locals: {
                        configuration: newMockConfiguration,
                    },
                    req: {
                        headers: {
                            "x-monorepo-realm": "amido",
                            "x-monorepo-territory": "gb",
                            "x-monorepo-language": "en",
                        },
                    },
                }
                await getSSProps(mockRequest, newMockResponse, mockStore)
                expect(isSettingsError).toBeCalled()
                expect(isSettingsError).toBeCalledWith(newMockConfiguration)
            })
        })
    })

    describe("When missing language from headers", () => {
        const newMockResponse = {
            locals: {
                configuration: {
                    ...mockResponse.locals.configuration,
                },
            },
            req: {
                headers: {
                    "x-monorepo-realm": "amido",
                    "x-monorepo-territory": "gb",
                },
            },
        }

        it("Should call getSettingsHeadersAsObject and called BFFlogger.error", async () => {
            await expect(getSSProps(mockRequest, newMockResponse, mockStore)).rejects.toThrow()
            expect(getSettingsHeadersAsObject).toBeCalled()
            expect(getSettingsHeadersAsObject).toBeCalledWith({
                "x-monorepo-realm": "amido",
                "x-monorepo-territory": "gb",
            })
            expect(BFFLogger.error).toBeCalledWith(`Header called with bad headers: ${newMockResponse.req.headers}`)
        })

        it("should check for settings errors", () => {
            expect(isSettingsError).not.toBeCalled()
        })
    })
})
