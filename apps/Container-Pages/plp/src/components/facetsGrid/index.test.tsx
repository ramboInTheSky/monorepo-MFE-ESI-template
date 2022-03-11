import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import { Provider } from "react-redux"
import mockStore, {mockTheme, mockState} from "../../../__mocks__/mockStore"
import {FacetsGrid} from "."

describe("FacetsGrid: ", () => {
    it("should render correctly", () => {
        const facets = Object.values(mockState.viewAllModal.facets)
        const {asFragment} = render(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <FacetsGrid facets={facets} handleSetFacet={jest.fn()} />
                </ThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
