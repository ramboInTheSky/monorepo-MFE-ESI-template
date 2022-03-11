import React from "react"
import {fireEvent, getByTestId, render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {SkipContent} from "."
import {IS_BROWSER} from "../../utils/window"

jest.mock("../../utils/window", () => ({
    IS_BROWSER: jest.fn(),
}))

describe("SkipContent", () => {
    const props = {
        text: {skipToMainContent: "text"},
    }
    beforeEach(() => {
        jest.clearAllMocks()
    })
    describe("Components - SkipContent, no PLP in querySelector", () => {
        it("should match snapshot if on browser", () => {
            ;(IS_BROWSER as any).mockImplementation(() => true)
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SkipContent {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
        it("should match snapshot if not on browser", () => {
            ;(IS_BROWSER as any).mockImplementation(() => false)
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SkipContent {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Components - SkipContent, PLP in querySelector", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })

        it("should match snapshot if on browser", () => {
            const mocks = {
                querySelector: jest.spyOn(document, "querySelector"),
            }

            mocks.querySelector.mockImplementation(() => {
                return (<div id="plp-entrypoint">TEST</div>) as unknown as HTMLElement
            })
            ;(IS_BROWSER as any).mockImplementation(() => true)
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SkipContent {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should trigger the function if enter is hit", () => {
            const plpEntry: HTMLInputElement = document.createElement("input")
            plpEntry.id = "plp-entrypoint"
            plpEntry.tabIndex = 0
            plpEntry.focus = jest.fn()

            const mocks = {
                querySelector: jest.spyOn(document, "querySelector"),
            }

            mocks.querySelector.mockImplementation(() => {
                return plpEntry
            })
            ;(IS_BROWSER as any).mockImplementation(() => true)
            const {container} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SkipContent {...props} />
                </SCThemeProvider>,
            )

            const input = getByTestId(container, "header-skip-to-content")
            fireEvent.keyDown(input, {key: "Enter", code: 13})
            /* eslint-disable @typescript-eslint/unbound-method */
            expect(plpEntry.focus).toBeCalled()
        })

        it("should not trigger the function if something else is hit", () => {
            const plpEntry: HTMLInputElement = document.createElement("input")
            plpEntry.id = "plp-entrypoint"
            plpEntry.tabIndex = 0
            plpEntry.focus = jest.fn()

            const mocks = {
                querySelector: jest.spyOn(document, "querySelector"),
            }

            mocks.querySelector.mockImplementation(() => {
                return plpEntry
            })
            ;(IS_BROWSER as any).mockImplementation(() => true)
            const {container} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SkipContent {...props} />
                </SCThemeProvider>,
            )

            const input = getByTestId(container, "header-skip-to-content")
            fireEvent.keyDown(input, {key: "Space", code: 32})
            /* eslint-disable @typescript-eslint/unbound-method */
            expect(plpEntry.focus).not.toBeCalled()
        })

        it("should not trigger the function if plpEntry element doesn't exist", () => {
            const plpEntry: HTMLInputElement = document.createElement("input")
            plpEntry.id = "invalid-element"
            plpEntry.tabIndex = 0
            plpEntry.focus = jest.fn()

            const mocks = {
                querySelector: jest.spyOn(document, "querySelector"),
            }

            mocks.querySelector.mockImplementation(() => {
                return plpEntry
            })
            ;(IS_BROWSER as any).mockImplementation(() => true)
            const {container} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SkipContent {...props} />
                </SCThemeProvider>,
            )

            const input = getByTestId(container, "header-skip-to-content")
            fireEvent.keyDown(input, {key: "Space", code: 32})
            /* eslint-disable @typescript-eslint/unbound-method */
            expect(plpEntry.focus).not.toBeCalled()
        })

        it("should match snapshot if not on browser", () => {
            ;(IS_BROWSER as any).mockImplementation(() => false)
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SkipContent {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
