import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {SaleBagWarningModal} from "."
import {mockTheme, mockText} from "../../../__mocks__/mockStore"

jest.mock("../Modal", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({open, children}) => <>{open && <div data-testid="modal">{children}</div>}</>,
}))

describe("Components - SaleBagWarningModal: ", () => {
    describe("closed modal", () => {
        const props = {
            text: mockText.saleBagWarning,
            remainOnMainSiteAction: jest.fn(),
            openModal: false,
            vipSitePath: "abc123",
        }

        it("should not render anything as openModal is false", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SaleBagWarningModal {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
            const modal = screen.queryByTestId("modal")
            expect(modal).toBeFalsy()
        })
    })

    describe("open modal", () => {
        const props = {
            text: mockText.saleBagWarning,
            remainOnMainSiteAction: jest.fn(),
            openModal: true,
            vipSitePath: "abc123",
        }

        const {location} = window
        beforeAll((): void => {
            delete window.location
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            window.location = {href: jest.fn()}
        })

        afterAll((): void => {
            window.location = location
        })
        it("should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <SaleBagWarningModal {...props} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()

            const modal = screen.getByTestId("modal")
            expect(modal).toBeTruthy()
        })
        it("should have data testid modal", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <SaleBagWarningModal {...props} />
                </SCThemeProvider>,
            )

            const modal = screen.getByTestId("modal")
            expect(modal).toBeTruthy()
        })
        it("should have data testid header_SaleBagWarningModal_goToVipButton and called window.location.href", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <SaleBagWarningModal {...props} />
                </SCThemeProvider>,
            )

            const goToVipButton = screen.getByTestId("header_SaleBagWarningModal_goToVipButton")
            expect(goToVipButton).toBeTruthy()

            fireEvent.click(goToVipButton)

            expect(window.location.href).toEqual(props.vipSitePath)
        })
        it("should have data testid header_SaleBagWarningModal_stayMainSiteButton and called remainOnMainSiteAction function", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <SaleBagWarningModal {...props} />
                </SCThemeProvider>,
            )

            const stayMainSiteButton = screen.getByTestId("header_SaleBagWarningModal_stayMainSiteButton")
            expect(stayMainSiteButton).toBeTruthy()

            fireEvent.click(stayMainSiteButton)

            expect(props.remainOnMainSiteAction).toHaveBeenCalled()
        })
    })
})
