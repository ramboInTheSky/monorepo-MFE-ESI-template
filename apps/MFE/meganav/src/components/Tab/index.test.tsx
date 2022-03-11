import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import Tab, {TabProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Components - Tab: ", () => {
    let props: TabProps
    beforeEach(() => {
        props = {
            text: "all",
            handleTabClick: jest.fn(),
            isActive: false,
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Tab {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot for active state", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Tab {...props} isActive />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should show call handleTabClick on mouse hover", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Tab {...props} />
            </SCThemeProvider>,
        )
        const element = screen.getByText(props.text)
        fireEvent.mouseEnter(element)
        expect(props.handleTabClick).toHaveBeenCalledTimes(1)
    })
})
