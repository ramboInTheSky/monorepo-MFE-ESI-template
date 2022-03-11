import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {MissionsCTA} from "."
import {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {SELECTED_DEPARTMENT_DETAILS, VISITED_PAGES} from "../../config/constants"

describe("MissionsCTA", () => {
    let props
    beforeEach(() => {
        props = {
            title: "sample title",
            target: "sampleurl",
            siteUrl: "http://IAmSiteUrl",
            department: "sampledept",
            text: {arrowIconUrlAltText: mockText.arrowIconUrlAltText},
        }
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
        localStorage.setItem = jest.fn()
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsCTA {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should have required attributes", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsCTA {...props} />
            </SCThemeProvider>,
        )
        const button = screen.getByText("sample title").closest("a")
        expect(button).toHaveAttribute("href", `${props.siteUrl}${props.target}`)
    })
    it("should have the title as it is sent from CMS", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsCTA {...props} />
            </SCThemeProvider>,
        )
        const buttonText = screen.getByTestId("missions-cta-buttonText").textContent
        expect(buttonText).toBe("sample title")
    })
    it("should call function when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsCTA {...props} />
            </SCThemeProvider>,
        )
        const missionsCTA = screen.getByTestId("missions-cta")
        fireEvent.click(missionsCTA)
        /* eslint-disable */
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            SELECTED_DEPARTMENT_DETAILS,
            '{"path":"sampleurl","dept":"sampledept"}',
        )
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(localStorage.removeItem).toHaveBeenCalledWith(VISITED_PAGES)
        /* eslint-enable */
    })
})
