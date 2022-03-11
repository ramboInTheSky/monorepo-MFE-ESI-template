import React from "react"
import ReactDOMServer from "react-dom/server"
import {Provider} from "react-redux"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import BFFLogger from "./server/core/BFFLogger"
import mockStore from "../__mocks__/mockStore"
import {updateTextAlignment} from "./ducks/text-alignment"
import {isSettingsError} from "./utils/setApiUrlSettings"
import {setRequestAction} from "./ducks/request"
import {getServerSideProps as footerGetServerSideProps} from "./compositions/footer/index.server"
import {setLanguageSettings} from "./utils/languageSelector"
import App from "./App"
import {getServerSideProps as getSSProps} from "./App.server"

jest.mock("@monorepo/utils", () => ({
    getSettingsHeadersAsObject: jest.fn(() => ({realm: "amido"})),
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
        if (configuration.isError) throw new Error("ERROR")
        return configuration.isInvalid
    }),
}))

jest.mock("./ducks/text-alignment", () => ({
    updateTextAlignment: jest.fn(),
}))
jest.mock("./utils/getTextAlignment", () => {
    return {
        __esModule: true,
        default: () => mockTheme.direction,
    }
})

jest.mock("./ducks/text-alignment", () => ({
    updateTextAlignment: jest.fn(),
}))
jest.mock("./ducks/request", () => ({
    setRequestAction: jest.fn(),
}))
jest.mock("./utils/languageSelector", () => ({
    setLanguageSettings: jest.fn(),
}))
jest.mock("./server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("./compositions/footer/index.server", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        getServerSideProps: jest.fn(async () => {
            return "EXPECTED SSR PROPS"
        }),
    }
})

jest.mock("./compositions/footer", () => {
    const mockApp = () => {
        return <div />
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    mockApp.getServerSideProps = jest.fn(async () => "EXPECTED SSR PROPS")
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

const mockRequest = {headers: {"x-monorepo-realm": "amido"}, theme: mockTheme}
const mockResponse = {
    req: {
        test: "TEST REQUEST",
        headers: {"x-monorepo-siteurl": "Test siteurl"},
    },
    locals: {
        configuration: {
            isInvalid: false,
            isError: false,
            "footer.frontend.realmName": {
                Value: "amido",
            },
            "footer.frontend.themeVersion": {
                Value: "v1.1.0",
            },
            "footer.frontend.variant": {
                Value: "default",
            },
        },
    },
}

describe("Given an App", () => {
    describe("When getting server side props", () => {
        describe("When configuration is invalid", () => {
            let response = {}
            const mockErrorResponse = {
                locals: {
                    configuration: {
                        isError: false,
                        isInvalid: true,
                    },
                },
            }

            beforeAll(async done => {
                jest.clearAllMocks()
                response = await getSSProps(mockRequest, mockErrorResponse, mockStore)
                done()
            })

            it("should return an error object", () => {
                expect(response).toEqual({isConfError: true})
            })
        })

        describe("When configuration is valid", () => {
            let response = {}
            beforeAll(async done => {
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

            it("Should call Footer getServerSideProps", () => {
                expect(footerGetServerSideProps).toBeCalledWith(mockRequest, mockResponse, mockStore)
            })

            it("Should call setLanguageSettings", () => {
                expect(setLanguageSettings).toBeCalledWith(mockStore, mockResponse.locals.configuration, "Test siteurl")
            })

            it("should return ssr props ", () => {
                expect(response).toEqual({
                    "0": "E",
                    "1": "X",
                    "2": "P",
                    "3": "E",
                    "4": "C",
                    "5": "T",
                    "6": "E",
                    "7": "D",
                    "8": " ",
                    "9": "S",
                    "10": "S",
                    "11": "R",
                    "12": " ",
                    "13": "P",
                    "14": "R",
                    "15": "O",
                    "16": "P",
                    "17": "S",
                    realm: "amido",
                    textAlignment: mockTheme.direction,
                    themeColours: mockTheme,
                    themeVersion: "v1.1.0",
                })
            })
        })
    })

    describe("When getting server side props throws an error", () => {
        let response = {}
        const mockErrorResponse = {
            locals: {
                configuration: {
                    isError: true,
                },
            },
        }

        beforeAll(async done => {
            jest.clearAllMocks()
            response = await getSSProps(mockRequest, mockErrorResponse, mockStore)
            done()
        })

        it("should call the error logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toBeCalledWith(expect.any(Error))
        })

        it("should return an error object", () => {
            expect(response).toEqual({isConfError: true})
        })
    })
})
