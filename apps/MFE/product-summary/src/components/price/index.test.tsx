import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Price} from "."
import {handleProductClick} from "../../events"
import text from "../../../__mocks__/default-text.json"

jest.mock("../../events", () => ({
    handleProductClick: jest.fn(),
}))

describe("Price: ", () => {
    const props = {
        price: "£40.99",
        linkUrl: "www.test.com",
        tooltipTitle: "test title",
        salePrice: "£10",
        wasPrice: "£20.99",
        id: "00000",
        title: "test title",
        colour: "White",
        currencyCode: "GBP",
        text,
        colourwaysHasSale: true,
        department: "menswear",
        brandNameEnabled: false,
        isMade2Measure: false,
        minPrice: "£10",
    }

    const propsMadeToMeasure = {
        price: "£40.99",
        linkUrl: "www.test.com",
        tooltipTitle: "test title",
        salePrice: "£10",
        wasPrice: "£20.99",
        id: "00000",
        title: "test title",
        colour: "White",
        department: "menswear",
        currencyCode: "GBP",
        text,
        colourwaysHasSale: true,
        brandNameEnabled: false,
        isMade2Measure: true,
        minPrice: "£10",
    }
    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Price {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should show price if there isn't a sale price", () => {
        const newProps = {
            ...props,
            salePrice: null,
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <Price {...newProps} />
            </ThemeProvider>,
        )
        expect(screen.getByText(props.price)).toBeInTheDocument()
    })

    it("should not show price if there is a sale price", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <Price {...props} />
            </ThemeProvider>,
        )
        expect(screen.queryByText(props.price)).not.toBeInTheDocument()
    })

    it("should show was price and sale price", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <Price {...props} />
            </ThemeProvider>,
        )
        expect(screen.getAllByText(`Was ${props.wasPrice}`).length).toBeGreaterThan(1)
        expect(screen.getAllByText(`Now ${props.salePrice}`).length).toBeGreaterThan(1)
    })

    it("should show placeholder if no sale price but colourways are on sale", () => {
        const newProps = {
            ...props,
            salePrice: null,
            colourwaysHasSale: true,
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <Price {...newProps} />
            </ThemeProvider>,
        )
        expect(screen.queryByTestId("product_summary_sale_placeholder")).toBeInTheDocument()
    })

    it("should not show placeholder if no sale price and colourways are not on sale", () => {
        const newProps = {
            ...props,
            salePrice: null,
            colourwaysHasSale: false,
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <Price {...newProps} />
            </ThemeProvider>,
        )
        expect(screen.queryByTestId("product_summary_sale_placeholder")).not.toBeInTheDocument()
    })

    it("should not show placeholder if sale price and colourways are on sale", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <Price {...props} />
            </ThemeProvider>,
        )
        expect(screen.queryByTestId("product_summary_sale_placeholder")).not.toBeInTheDocument()
    })
    it("should show the correct items if madeToMeasure is true", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Price {...propsMadeToMeasure} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    

    it("should not show divider if brandNameEnabled ", () => {
        const newProps = {
            ...props,
            brandNameEnabled: true
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <Price {...newProps} />
            </ThemeProvider>,
        )
        expect(screen.queryByText(props.price)).not.toBeInTheDocument()
    })
    describe("When clicked", () => {
        it("should call the handleProductClick event", () => {
            const {getByTestId} = render(
                <ThemeProvider theme={mockTheme}>
                    <Price {...props} />
                </ThemeProvider>,
            )

            fireEvent.click(getByTestId("product_summary_price"))

            expect(handleProductClick).toHaveBeenCalled()
        })
    })
})
