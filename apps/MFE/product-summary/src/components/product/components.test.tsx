import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import { mockTheme, centralisedMockTheme } from "../../../__mocks__/mockStore"
import {TileCard, TileCardContent, TileCardBrandName} from "./components"

describe("Given a Product Component - TileCard", () => {
    it("should render as expected", () => {
        const { asFragment } = render(<TileCard />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Product Component - TileCardContent", () => {
    it("should render as expected", () => {
        const {asFragment} = render(<TileCardContent />)
        expect(asFragment()).toMatchSnapshot()
    })
})
describe("Given a Product Component - TileCardBrandName", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <TileCardBrandName />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Product Component - TileCardContent with Centered Theme", () => {
    it("should render as expected", () => {
        const { asFragment } = render(<ThemeProvider theme={centralisedMockTheme}><TileCardContent /></ThemeProvider>)
        expect(asFragment()).toMatchSnapshot()
    })
})