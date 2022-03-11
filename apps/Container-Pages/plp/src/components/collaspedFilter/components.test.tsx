import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {
    FacetList,
    FacetName,
} from "./components"

describe("collaspedFilter Components", () => {
    test("FacetName", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetName />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    test("FacetList", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <FacetList />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
