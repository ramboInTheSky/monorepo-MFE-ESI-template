import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {TitleLink} from "./components"

describe("Given Suit Title components", () => {
    describe("TitleLink", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TitleLink>TEST TITLE LINK</TitleLink>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
