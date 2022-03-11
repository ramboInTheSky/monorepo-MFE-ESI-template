import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import Tabs, {TabsProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

describe("Tabs", () => {
    let props: TabsProps
    beforeEach(() => {
        props = {items: ["all", "more"], handleTabClick: jest.fn(), activeIndex: 0}
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Tabs {...props} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
    it("should call handleTabClick when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Tabs {...props} />
            </SCThemeProvider>,
        )
        const tabText = props.items[0]
        const tabIndex = 0
        const tab = screen.getByText(tabText)
        fireEvent.mouseEnter(tab)
        expect(props.handleTabClick).toHaveBeenCalledTimes(1)
        expect(props.handleTabClick).toHaveBeenCalledWith(tabIndex)
    })
})
