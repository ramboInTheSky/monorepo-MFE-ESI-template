import {render, screen, within} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"
import {TabbedFilterBrand} from "."
import text from "../../../../__mocks__/default-text.json"
import {mockTheme} from "../../../../__mocks__/mockStore"

jest.mock("../tabbedFilter", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({filterName}) => <div>{filterName}</div>,
}))
jest.mock("../tabbedFilterBrandSearch", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({children}) => <div>{children}</div>,
}))

const props = {
    setBrandNameForSearch: jest.fn(),
    filtersBrand: {
        restOfFilteredBrands: [
            "nike:restOfBrand1",
            "nike:restOfBrand2",
            "nike:restOfBrand3",
            "nike:restOfBrand4",
            "nike:restOfBrand5",
            "nike:3 nike",
            "nike:nike boots",
            "nike:1 nike",
        ],
        filteredBrandsOfTopFive: ["nike:top1", "nike:top2", "nike:top3", "nike:top4", "nike:top5"],
    },
    brandSearch: "nike",
    text,
}

describe("Given a TabbedFilterBrand component", () => {
    it("should render correctly to match the snapshot", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilterBrand {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render the text on the top five filters", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilterBrand {...props} />
            </ThemeProvider>,
        )

        const topFiveElement = screen.getByTestId("plp-tabbed-facets-panel-promoted-brands")
        const utils = within(topFiveElement)
        props.filtersBrand.filteredBrandsOfTopFive.forEach(brandText => {
            expect(utils.getByText(brandText)).toBeInTheDocument()
        })
    })
    it("should render the text on the other brands", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <TabbedFilterBrand {...props} />
            </ThemeProvider>,
        )

        const restOfBrandsElement = screen.getByTestId("plp-tabbed-facets-other-brands")
        const utils = within(restOfBrandsElement)
        props.filtersBrand.restOfFilteredBrands.forEach(brandText => {
            expect(utils.getByText(brandText)).toBeInTheDocument()
        })

        // Alphabet title
        expect(utils.getByTestId("plp-tabbed-brand-alphabet-title-0-9")).toBeInTheDocument()
        expect(utils.getByTestId("plp-tabbed-brand-alphabet-title-N")).toBeInTheDocument()
        expect(utils.getByTestId("plp-tabbed-brand-alphabet-title-R")).toBeInTheDocument()
    })
})
