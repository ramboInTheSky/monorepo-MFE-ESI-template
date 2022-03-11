import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {FilterFeatsContainer} from "./components"

describe("Facets Feats Components", () => {
    test("FilterFeatsContainer", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FilterFeatsContainer>Test</FilterFeatsContainer>
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
