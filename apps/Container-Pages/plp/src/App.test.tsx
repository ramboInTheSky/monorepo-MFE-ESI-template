import React from "react"
import ReactDOMServer from "react-dom/server"
import {Provider} from "react-redux"
import {SCThemeProvider} from "@monorepo/theme-provider"
import mockStore, {mockTextAlignment, mockTheme} from "../__mocks__/mockStore"
import isRequestValid from "./utils/validateRequest"
import {updateTextAlignment} from "./ducks/text-alignment"
import {updateRequest} from "./ducks/request"
import {updateFeatureSwitch} from "./ducks/feature-switch"
import {getServerSideProps as plpGetServerSideProps} from "./compositions/plp/index.server"
import {getServerSideProps as getSSProps} from "./App.server"
import App from "./App"
import BFFLogger from "./server/core/BFFLogger"
import getFeatureSwitch from "./utils/getFeatureSwitch"
import {getItemsPerRowConfig} from "./utils/getItemsPerRow"
import getInPageFilters from "./utils/getInPageFilters"

jest.mock("./utils/getFeatureSwitch", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => ({
        enablePageInFilters: true,
    })),
}))
jest.mock("./utils/getItemsPerRow", () => ({
    __esModule: true,
    getItemsPerRowConfig: jest.fn(() => ({
        inPageFiltersEnabled: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 6,
            xl: 8,
        },
        default: {
            xs: 4,
            sm: 4,
            md: 6,
            lg: 6,
            xl: 8,
        },
    })),
}))
jest.mock("./utils/getInPageFilters", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => ({
        enabled: {
            breakpoint: "md",
        },
        disabled: {
            breakpoint: "lg",
        },
    })),
}))

jest.mock("./utils/validateRequest", () => ({
    __esModule: true,
    default: jest.fn(request => {
        if (request.isError) throw new Error("ERROR")
        return !request.isInvalid
    }),
}))

jest.mock("./ducks/text-alignment", () => ({
    updateTextAlignment: jest.fn(),
}))

jest.mock("./utils/getTextAlignment", () => {
    return {
        __esModule: true,
        default: () => mockTextAlignment,
    }
})
jest.mock("./ducks/feature-switch", () => ({
    updateFeatureSwitch: jest.fn(),
}))
jest.mock("./ducks/request", () => ({
    updateRequest: jest.fn(),
}))
jest.mock("./server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))
jest.mock("./compositions/plp/index.server", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line @typescript-eslint/require-await
        getServerSideProps: jest.fn(async () => {
            return "EXPECTED SSR PROPS"
        }),
    }
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
jest.mock("./compositions/plp", () => {
    const mockApp = () => {
        return <div />
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    mockApp.getServerSideProps = jest.fn(async () => ({mockAppProps: "EXPECTED SSR PROPS"}))
    return {
        __esModule: true,
        default: mockApp,
    }
})
jest.mock("@monorepo/utils", () => ({
    getSettingsHeadersAsObject: jest.fn(() => ({
        realm: "amido",
    })),
}))
jest.mock("./utils/window", () => ({
    IS_BROWSER: () => false,
}))
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
    params: {pid: "1234"},
    isInvalid: false,
    isError: false,
    headers: {"x-monorepo-realm": "amido"},
    theme: mockTheme,
}
const mockResponse = {
    req: {
        test: "TEST REQUEST",
        headers: {"x-monorepo-siteurl": "Test siteurl"},
    },
    locals: {
        configuration: {
            isInvalid: false,
            isError: false,
            "monorepo.plp.frontend.realmName": {
                Value: "amido",
            },
            "monorepo.plp.frontend.themeVersion": {
                Value: "v8.0.0",
            },
            "monorepo.plp.frontend.featureSwitch": {
                enablePageInFilters: true,
            },
            "monorepo.plp.frontend.inPageFilters": {
                enabled: {
                    breakpoint: "md",
                },
                disabled: {
                    breakpoint: "lg",
                },
            },
            "monorepo.plp.frontend.fetchTriggerOffset": {
                inPageFiltersEnabled: {
                    xs: 4,
                    sm: 4,
                    md: 4,
                    lg: 6,
                    xl: 8,
                },
                default: {
                    xs: 4,
                    sm: 4,
                    md: 6,
                    lg: 6,
                    xl: 8,
                },
            },
            "monorepo.plp.frontend.fetchTriggerOffsetRows": {
                xs: 2,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2,
            },
            "monorepo.plp.frontend.itemsPerRow": {
                inPageFiltersEnabled: {
                    xs: 2,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 4,
                },
                default: {
                    xs: 2,
                    sm: 2,
                    md: 3,
                    lg: 3,
                    xl: 4,
                },
            },
        },
    },
}

describe("Given an App", () => {
    describe("When getting server side props", () => {
        describe("When configuration is invalid", () => {
            let response = {}
            const mockErrorRequest = {
                params: {pid: "1234"},
                isError: false,
                isInvalid: true,
            }

            beforeAll(async done => {
                jest.clearAllMocks()
                response = await getSSProps(mockErrorRequest, mockResponse, mockStore)
                done()
            })
            it("should return an error object", () => {
                expect(response).toEqual({
                    appProps: {
                        isConfError: true,
                        textAlignment: "ltr",
                        plpStyleConfig: {},
                        realm: "",
                        themeColours: undefined,
                        themeVersion: "",
                    },
                })
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
                expect(isRequestValid).toBeCalledWith(mockRequest, mockResponse)
            })

            it("Should call updateTextAlignment", () => {
                expect(updateTextAlignment).toBeCalledWith(mockStore, mockResponse.locals.configuration)
            })

            it("Should call updateRequest", () => {
                expect(updateRequest).toBeCalledWith(mockStore, mockResponse.req, mockResponse.locals.configuration)
            })

            it("Should call updateFeatureSwitch", () => {
                expect(updateFeatureSwitch).toBeCalledWith(mockStore, mockResponse.locals.configuration)
            })
            it("Should call plp getServerSideProps", () => {
                expect(plpGetServerSideProps).toBeCalledWith(mockRequest, mockResponse, mockStore)
            })

            it("should have called getFeatureSwitch", () => {
                expect(getFeatureSwitch).toHaveBeenCalledTimes(1)
                expect(getFeatureSwitch).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should have called getItemsPerRowConfig", () => {
                expect(getItemsPerRowConfig).toHaveBeenCalled()
                expect(getItemsPerRowConfig).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should have called getInPageFilters", () => {
                expect(getInPageFilters).toHaveBeenCalled()
                expect(getInPageFilters).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })

            it("should return ssr props ", () => {
                expect(response).toEqual({
                    appProps: {
                        themeColours: mockTheme,
                        textAlignment: mockTextAlignment,
                        plpStyleConfig: {
                            inPageFiltersBreakpoint: "md",
                            itemsPerRow: {
                                lg: 6,
                                md: 4,
                                sm: 4,
                                xl: 8,
                                xs: 4,
                            },
                            productWidthSize: 67,
                        },
                        realm: "amido",
                        themeVersion: "v8.0.0",
                        isConfError: undefined,
                    },
                    otherProps: {
                        isConfError: undefined,
                        searchResponse: undefined,
                    },
                })
            })
        })
    })

    describe("When getting server side props throws an error", () => {
        let response = {}
        const mockErrorRequest = {
            isError: true,
        }

        beforeAll(async done => {
            jest.clearAllMocks()
            response = await getSSProps(mockErrorRequest, mockResponse, mockStore)
            done()
        })

        it("should call the error logger", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(BFFLogger.error).toBeCalledWith(expect.any(Error))
        })

        it("should return an error object", () => {
            expect(response).toEqual({
                appProps: {
                    isConfError: true,
                    textAlignment: "ltr",
                    realm: "",
                    themeVersion: "",
                    plpStyleConfig: {},
                },
            })
        })
    })
})
