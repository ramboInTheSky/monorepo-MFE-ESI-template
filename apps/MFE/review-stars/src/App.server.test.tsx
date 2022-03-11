import React from "react"
import ReactDOMServer from "react-dom/server"
import {Provider} from "react-redux"
import {ThemeProvider} from "styled-components"
import isRequestValid from "./utils/validateRequest"
import mockStore, {mockTheme, mockTextAlignment} from "../__mocks__/mockStore"
import {updateTextAlignment} from "./ducks/text-alignment"
import App from "./App"
import {getServerSideProps as reviewStarsGetServerSideProps} from "./compositions/reviewStars/index.server"
import {getServerSideProps as getSSProps} from "./App.server"
import BFFLogger from "./server/core/BFFLogger"

jest.mock("./utils/validateRequest", () => ({
    __esModule: true,
    default: jest.fn(request => {
        if (request.isError) throw new Error("ERROR")
        return !request.isInvalid
    }),
}))

jest.mock("./compositions/reviewStars/index.server", () => ({
    getServerSideProps: jest.fn(),
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
jest.mock("./server/core/BFFLogger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

jest.mock("./compositions/reviewStars", () => {
    const mockApp = () => {
        return <div />
    }
    // eslint-disable-next-line @typescript-eslint/require-await
    mockApp.getServerSideProps = jest.fn(async () => ({mockAppProps: "EXPECTED SSR PROPS", isConfError: false}))
    return {
        __esModule: true,
        default: mockApp,
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
    }
})

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
    }
    expect(
        ReactDOMServer.renderToString(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <App {...props} />
                </ThemeProvider>
            </Provider>,
        ),
    ).toMatchSnapshot()
})

const mockRequest = {
    params: {itemNumber: "1234"},
    headers: {"x-monorepo-siteurl": "Test siteurl"},
    theme: mockTheme,
}
const mockResponse = {
    req: {
        test: "TEST REQUEST",
        headers: {"x-monorepo-siteurl": "Test siteurl"},
        params: {itemNumber: "1234"},
    },
    locals: {
        configuration: {
            isInvalid: false,
            isError: false,
            "reviewstars.frontend.realmName": {
                Value: "amido",
            },
            "reviewstars.frontend.themeVersion": {
                Value: "v1.1.1",
            },
        },
    },
}

describe("Given an App", () => {
    describe("When getting server side props", () => {
        describe("When configuration is invalid", () => {
            let response = {}
            const mockErrorRequest = {
                params: {itemNumber: "1234"},
                isError: false,
                isInvalid: true,
            }

            beforeAll(async done => {
                jest.clearAllMocks()
                response = await getSSProps(mockErrorRequest, mockResponse, mockStore)
                done()
            })

            it("should return an error object", () => {
                expect(response).toEqual({isConfError: true, textAlignment: "ltr"})
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

            it("Should call reviewStarsGetServerSideProps", () => {
                expect(reviewStarsGetServerSideProps).toBeCalledWith(mockRequest, mockResponse, mockStore)
            })

            it("should return ssr props ", () => {
                expect(response).toEqual({
                    realm: "amido",
                    itemNumber: mockRequest.params.itemNumber,
                    themeColours: mockTheme,
                    textAlignment: mockTextAlignment,
                    themeVersion: "v1.1.1",
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
            expect(response).toEqual({isConfError: true})
        })
    })
})
