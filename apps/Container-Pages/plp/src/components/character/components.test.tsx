import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {CharacterLink} from "./components"

describe("Snapshots - CharacterLink", () => {
    it("should match snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CharacterLink component="button" textcolour="red" focusoutlinecolour="pink">
                    Test
                </CharacterLink>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match snapshot when disabled", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CharacterLink component="button" textcolour="red" focusoutlinecolour="pink" disabled>
                    Test
                </CharacterLink>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
