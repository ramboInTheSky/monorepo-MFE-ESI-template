import React from "react"
import {Provider} from "react-redux"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"

import FilterDetails from "."
import mockStore, {mockText, mockTheme} from "../../../../__mocks__/mockStore"

describe("Given a Tabbed Brand Search Bar Component when the filter is a brand filter", () => {
    const componentToTest = (
        <Provider store={mockStore}>
            <ThemeProvider theme={mockTheme}>
                <FilterDetails
                    name="brand"
                    showLoadingText={false}
                    disabled={false}
                    facets={[
                        "brand:znth",
                        "brand:one",
                        "brand:oops",
                        "brand:two",
                        "brand:tcas",
                        "brand:three",
                        "brand:four",
                        "brand:five",
                        "brand:six",
                        "brand:2 size",
                    ]}
                    text={mockText}
                />
            </ThemeProvider>
        </Provider>
    )
    it("should render the component correctly to match the snapshot", () => {
        const {asFragment} = render(componentToTest)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given TabbedFilters when the filter is a not a brand filter", () => {
    const componentToTest = (
        <Provider store={mockStore}>
            <ThemeProvider theme={mockTheme}>
                <FilterDetails
                    name="sizetype"
                    showLoadingText={false}
                    disabled={false}
                    facets={[
                        "sizetype:znth",
                        "sizetype:one",
                        "sizetype:oops",
                        "sizetype:two",
                        "sizetype:tcas",
                        "sizetype:three",
                        "sizetype:four",
                        "sizetype:five",
                        "sizetype:six",
                        "sizetype:2 size",
                    ]}
                    text={mockText}
                />
            </ThemeProvider>
        </Provider>
    )
    it("should render the component correctly to match the snapshot", () => {
        const {asFragment} = render(componentToTest)
        expect(asFragment()).toMatchSnapshot()
    })
})
