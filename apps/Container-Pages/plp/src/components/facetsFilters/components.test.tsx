import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {ExpansionPanel} from "@mui/material"
import {mockTheme} from "../../../__mocks__/mockStore"
import {StyledExpansionPanelSummary, StyledExpansionPanelDetails} from "./components"

describe("Facets Filters Components", () => {
    test("StyledExpansionPanel", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ExpansionPanel>
                    <StyledExpansionPanelSummary>TEST</StyledExpansionPanelSummary>
                    <StyledExpansionPanelDetails>TEST</StyledExpansionPanelDetails>
                </ExpansionPanel>
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
