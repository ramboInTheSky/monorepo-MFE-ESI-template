import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {StyledFilterButton} from "./components"

describe("Snapshots - Filter Button", () => {
    test("StyledFilterButton", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <StyledFilterButton textcolour="red" backgroundcolour="red" focusoutlinecolour="pink">
                    Test
                </StyledFilterButton>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
