import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {StyledCharacterFilterContainer} from "./components"

describe("Snapshots - Characte Filter", () => {
    test("StyledCharacterFilterContainer", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledCharacterFilterContainer>Test</StyledCharacterFilterContainer>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
