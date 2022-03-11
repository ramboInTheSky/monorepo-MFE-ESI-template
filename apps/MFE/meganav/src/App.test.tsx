import React from "react"
import ReactDOMServer from "react-dom/server"
import {Provider} from "react-redux"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {getSettingsHeadersAsObject} from "@monorepo/utils"
import BFFLogger from "./server/core/BFFLogger"
import mockStore, {mockTheme} from "../__mocks__/mockStore"
import {updateTextAlignment} from "./ducks/text-alignment"
import {isSettingsError} from "./utils/setApiUrlSettings"
import {setRequestAction} from "./ducks/request"
import {getServerSideProps as meganavGetServerSideProps} from "./compositions/meganav/index.server"
import App from "./App"
import {getServerSideProps as getSSProps} from "./App.server"

jest.mock("./utils/setApiUrlSettings", () => ({
    isSettingsError: jest.fn(configuration => {
        if (!configuration) throw new Error("ERROR")
        return false
    }),
}))

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
jest.mock("./ducks/text-alignment", () => ({
    updateTextAlignment: jest.fn(),
}))
jest.mock("./ducks/request", () => ({
    setRequestAction: jest.fn(),
}))
jest.mock("./server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("./compositions/meganav/index.server", () => {
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

it("renders without crashing", () => {
    ;(window as any).themeColours = {
        "v1.1.1": {
            color: "red",
        },
    }
    const props = {
        themeVersion: "v1.1.1",
        themeColours: mockTheme,
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
    theme: {theme: mockTheme},
}

const configuration = {
    "meganav.frontend.appCacheTTL": {Value: "3600"},
    "meganav.frontend.themeVersion": {Value: "v8.0.0"},
    "meganav.frontend.cache-control.max-age": {Value: "3600"},
    "meganav.frontend.cache-control.default-meganav.max-age": {Value: "no-store"},
    "meganav.frontend.defaultPrimaryVersion": {Value: "v1.0.0"},
    "meganav.frontend.defaultSecondaryVersion": {Value: "v1.0.0"},
    "meganav.api.realmName": {Value: "amido"},
    "meganav.api.territoryName": {Value: "MX"},
    "meganav.alternativeLanguages": [{Value: "7"}],
    "meganav.api.languageName": {Value: "en"},
    "meganav.api.direction": {Value: "ltr"},
}

const mockResponse = {
    req: {
        test: "TEST REQUEST",
        headers: {
            "x-monorepo-realm": "amido",
            "x-monorepo-territory": "gb",
            "x-monorepo-language": "en",
        },
    },
    locals: {
        configuration,
    },
}

describe("Given an App", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("When getting server side props", () => {
        describe("When configuration is valid", () => {
            let response = {}
            beforeEach(async done => {
                jest.clearAllMocks()
                response = await getSSProps(mockRequest, mockResponse, mockStore)
                done()
            })
            it("should check for settings errors", () => {
                expect(isSettingsError).toBeCalledWith(mockResponse.locals.configuration)
            })

            it("Should call updateTextAlignment", () => {
                expect(updateTextAlignment).toBeCalledWith(mockStore, mockResponse.locals.configuration)
            })

            it("Should call updateRequest", () => {
                expect(setRequestAction).toBeCalledWith(mockStore, mockResponse.req)
            })

            it("Should call MegaNav getServerSideProps", () => {
                expect(meganavGetServerSideProps).toBeCalledWith(mockRequest, mockResponse, mockStore)
            })

            it("should return ssr props ", () => {
                expect(response).toEqual({
                    props: "EXPECTED SSR PROPS",
                    textAlignment: "ltr",
                    themeColours: {theme: mockTheme},
                    realm: "amido",
                    themeVersion: "v8.0.0",
                })
            })
        })
    })

    describe("When configuration is invalid", () => {
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
        it("Should call getSettingsHeadersAsObject and called BFFlogger.error", async () => {
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
            expect(BFFLogger.error).toBeCalledWith(`Meganav called with bad headers: ${newMockResponse.req.headers}`)
        })

        it("should check for settings errors", () => {
            expect(isSettingsError).not.toBeCalled()
        })
    })
})
