import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Container, PriceLink, PriceLabel, PriceValue, PriceContainer, WasPriceValue, SalePriceValue} from "./components"

describe("Given Suit Title components", () => {
    describe("Container", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<Container>TEST CONTAINER</Container>)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("PriceLink", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<PriceLink>TEST LINK</PriceLink>)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("PriceLabel", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <PriceLabel>TEST LABEL</PriceLabel>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("PriceContainer ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(<PriceContainer>TEST CONTAINER</PriceContainer>)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("WasPriceValue ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <WasPriceValue>£TEST PRICE</WasPriceValue>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("SalePriceValue ", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SalePriceValue>£TEST PRICE</SalePriceValue>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("", () => {
        it("should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <PriceValue>£TEST PRICE</PriceValue>
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
