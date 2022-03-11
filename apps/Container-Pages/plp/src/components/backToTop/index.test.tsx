import {render, fireEvent} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"

import {BackToTop} from "."
import {mockTheme} from "../../../__mocks__/mockStore"
import text from "../../../__mocks__/default-text.json"

import * as WindowUtils from "../../utils/window"

jest.mock("@mui/material/useScrollTrigger")
jest.mock("@mui/material/Zoom", () => {
    const MockComponent = ({children}) => <div>{children}</div>
    return {
        __esModule: true,
        default: MockComponent,
    }
})
const mockGetWindowReturnedValue = value => {
    const spy = jest.spyOn(WindowUtils, "getWindow")
    spy.mockImplementation(() => value)

    return () => spy.mockRestore()
}

describe("Given a BackToTop component", () => {
    describe("When window is not available", () => {
        const mockLoadFirstPage = jest.fn()
        it("should return nothing", () => {
            mockGetWindowReturnedValue(null)

            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <BackToTop startPage={1} loadFirstPage={mockLoadFirstPage} text={text}/>
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchInlineSnapshot("<DocumentFragment />")
        })
    })

    describe("When window is available", () => {
        let mockRestorer
        const mockLoadFirstPage = jest.fn()
        const mockWindow = {
            ...window,
            scrollTo: jest.fn(),
            innerHeight: 0,
        }

        beforeAll(() => {
            mockRestorer = mockGetWindowReturnedValue(mockWindow)
        })

        afterAll(() => {
            mockRestorer()
        })
        describe("When user has not scrolled", () => {
            it("should render component correctly to match snapshot", () => {
                const {asFragment} = render(
                    <ThemeProvider theme={mockTheme}>
                        <BackToTop startPage={1} loadFirstPage={mockLoadFirstPage} text={text} />
                    </ThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
            })
        })

        describe("When user has scrolled", () => {
            it("should render component to match snapshot", () => {
                const {asFragment} = render(
                    <ThemeProvider theme={mockTheme}>
                        <BackToTop startPage={1} loadFirstPage={mockLoadFirstPage} text={text} />
                    </ThemeProvider>,
                )

                expect(asFragment()).toMatchSnapshot()
            })

            describe("and When user clicks the back to top button", () => {
                it("should trigger the back to top callback", () => {
                    const {getByTestId} = render(
                        <ThemeProvider theme={mockTheme}>
                            <BackToTop startPage={1} loadFirstPage={mockLoadFirstPage} text={text} />
                        </ThemeProvider>,
                    )

                    fireEvent(
                        getByTestId("plp-back-to-top-btn"),
                        new MouseEvent("click", {
                            bubbles: true,
                            cancelable: true,
                        }),
                    )

                    expect(mockWindow.scrollTo).toHaveBeenCalledWith(0, 0)
                })
            })
        })
    })

    describe("When page one is not loaded", () => {
        const mockLoadFirstPage = jest.fn()
        const mockWindow = {
            ...window,
            scrollTo: jest.fn(),
            innerHeight: 0,
        }

        beforeEach(() => {
            jest.clearAllMocks()
        })
        it("should trigger a new search request with the correct page", () => {
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <BackToTop startPage={2} loadFirstPage={mockLoadFirstPage} text={text} />
                </ThemeProvider>,
            )

            fireEvent(
                getByTestId("plp-back-to-top-btn"),
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                }),
            )

            expect(mockWindow.scrollTo).not.toHaveBeenCalled()
            expect(mockLoadFirstPage).toHaveBeenCalledWith("http://localhost/?p=1")
        })
    })
})
