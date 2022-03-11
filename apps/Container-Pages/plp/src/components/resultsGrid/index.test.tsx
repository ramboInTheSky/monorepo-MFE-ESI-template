import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import ResultsGrid from "."

describe("Snapshots - ResultsGrid", () => {
    test("ResultsGrid", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ResultsGrid>Test</ResultsGrid>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
