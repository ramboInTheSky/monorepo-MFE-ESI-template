import React from "react"
import {formatTextTestIds} from "@nmonorepoext/utils"
import {TextField} from "@mui/material"
import {cleanup, render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {FacetSearchAutocomplete} from "./components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {SearchValue} from "../../ducks/viewAllModal"

describe("Search modal", () => {
    const mockSearchFilterOptions: SearchValue[] = [
        {
            n: "Amido",
            v: "brand:amido",
        },
        {
            n: "Nike",
            v: "brand:nike",
        },
        {
            n: "Adidas",
            v: "brand:adidas",
        },
    ]
    afterEach(() => {
        cleanup()
    })
    it("should render FacetSearchAutocomplete correctly", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetSearchAutocomplete
                    id="facet-search"
                    autoHighlight
                    disablePortal
                    freeSolo
                    options={mockSearchFilterOptions}
                    data-testid={formatTextTestIds("plp-facet-search")}
                    getOptionLabel={(option: any) => option.title}
                    renderInput={params => (
                        <TextField {...params} InputLabelProps={{shrink: false}} margin="dense" variant="outlined" />
                    )}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
