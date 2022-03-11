import React from "react"
import {render, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {SuitPrice} from "."
import text from "../../../__mocks__/default-text.json"

describe("SuitPrice: ", () => {
    const props = {
        suitPrice: "£40.99",
        wasSuitPrice: null,
        saleSuitPrice: null,
        linkUrl: "www.test.com",
        tooltipTitle: "test title",
        trouserPrice: "£10",
        wasTrouserPrice: null,
        saleTrouserPrice: null,
        jacketPrice: "£20.99",
        saleJacketPrice: null,
        wasJacketPrice: null,
        text,
        jacketsHasSale: false,
        trousersHasSale: false
    }

    it("should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <SuitPrice {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should show jacket sale price and was price if jacket is on sale ", () => {
        const newProps = {
            ...props,
            wasJacketPrice: "£20",
            saleJacketPrice: "£11"
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <SuitPrice {...newProps} />
            </ThemeProvider>
        )
        expect(screen.getByText(`Was ${newProps.wasJacketPrice}`)).toBeInTheDocument()
        expect(screen.getByText(`Now ${newProps.saleJacketPrice}`)).toBeInTheDocument()
    })

    it("should show trouser sale price and was price if trouser is on sale ", () => {
        const newProps = {
            ...props,
            wasTrouserPrice: "£20",
            saleTrouserPrice: "£11"
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <SuitPrice {...newProps} />
            </ThemeProvider>
        )
        expect(screen.getByText(`Was ${newProps.wasTrouserPrice}`)).toBeInTheDocument()
        expect(screen.getByText(`Now ${newProps.saleTrouserPrice}`)).toBeInTheDocument()
    })

    it("should show suit sale price and was price if suit is on sale ", () => {
        const newProps = {
            ...props,
            wasSuitPrice: "£20",
            saleSuitPrice: "£11"
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <SuitPrice {...newProps} />
            </ThemeProvider>
        )
        expect(screen.getByText(`Was ${newProps.wasSuitPrice}`)).toBeInTheDocument()
        expect(screen.getByText(`Now ${newProps.saleSuitPrice}`)).toBeInTheDocument()
    })

    it("should show suit sale placeholder if other colourway trousers are on sale ", () => {
        const newProps = {
            ...props,
            saleSuitPrice: null,
            trousersHasSale: true,
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <SuitPrice {...newProps} />
            </ThemeProvider>
        )
        expect(screen.queryByTestId("suit_summary_suit_placeholder")).toBeInTheDocument()
    })


    it("should show suit sale placeholder if other colourway jackets are on sale ", () => {
        const newProps = {
            ...props,
            saleSuitPrice: null,
            jacketsHasSale: true,
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <SuitPrice {...newProps} />
            </ThemeProvider>
        )
        expect(screen.queryByTestId("suit_summary_suit_placeholder")).toBeInTheDocument()
    })

    it ("should not show suit sale placeholder if suit is on sale and other colourway trousers are on sale ", () => {
         const newProps = {
            ...props,
            saleSuitPrice: "£10",
            trousersHasSale: true,
        }
        render(
            <ThemeProvider theme={mockTheme}>
                <SuitPrice {...newProps} />
            </ThemeProvider>
        )
        expect(screen.queryByTestId("suit_summary_suit_placeholder")).not.toBeInTheDocument()
    })
})
