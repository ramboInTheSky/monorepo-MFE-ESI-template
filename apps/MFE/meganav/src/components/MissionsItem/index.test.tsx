import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {MissionsItem} from "."
import {SELECTED_DEPARTMENT_DETAILS, VISITED_PAGES} from "../../config/constants"

describe("MissionsItem", () => {
    let props
    beforeEach(() => {
        props = {
            siteUrl: "http:/amido.com/en/gb",
            imageUrl: "/sampleurl",
            target: "/sampletarget",
            title: "sample title",
            department: "sample department",
            noOfColumns: 3,
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
                <MissionsItem {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot with different no of columns", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsItem {...props} noOfColumns={4} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should be have required attributes", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsItem {...props} />
            </SCThemeProvider>,
        )
        const title = screen.getByText(props.title)
        expect(title).toBeInTheDocument()

        const missionsItem = screen.getByTestId("missions-item")
        expect(missionsItem).toHaveAttribute("data-ga-v2", props.department)
    })
    it("should call function when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsItem {...props} />
            </SCThemeProvider>,
        )
        const missionsItem = screen.getByTestId("missions-item")
        fireEvent.click(missionsItem)
        /* eslint-disable */
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(localStorage.setItem).toHaveBeenCalledWith(
            SELECTED_DEPARTMENT_DETAILS,
            '{"path":"/en/gb/sampletarget","dept":"sample department"}',
        )
        expect(localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(localStorage.removeItem).toHaveBeenCalledWith(VISITED_PAGES)
        /* eslint-enable */
    })
})
