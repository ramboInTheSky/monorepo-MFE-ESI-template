import React from "react"
import {render, cleanup, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {ColourwayTitle} from "."
import {handleProductClick} from "../../events"

jest.mock("../../events", () => ({
    handleProductClick: jest.fn(),
}))

const props = {
    linkUrl: "test_linkUrl",
    title: "test_title",
    tooltipTitle: "test_tooltip_title",
    id: "000000",
    price: "£123",
    colour: "white",
    currencyCode: "GBP",
    department: "menswear",
}

describe("ColourwayTitle: ", () => {
    afterEach(() => {
        cleanup()
    })
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwayTitle {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("When clicked", () => {
    it("should call the handleProductClick event", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <ColourwayTitle {...props} />
            </ThemeProvider>,
        )

        fireEvent.click(getByTestId("product_summary_title"))

        expect(handleProductClick).toHaveBeenCalled()
    })
})
