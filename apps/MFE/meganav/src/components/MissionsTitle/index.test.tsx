import React from "react"
import {render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import MissionsTitle from "."
import {mockTheme} from "../../../__mocks__/mockStore"

describe("MissionsTitle", () => {
    let props
    beforeEach(() => {
        props = {title: "sampletitle"}
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsTitle {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should contain text", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsTitle {...props} />
            </SCThemeProvider>,
        )
        const element = screen.getByText(props.title)
        expect(element).toBeInTheDocument()
    })
})
