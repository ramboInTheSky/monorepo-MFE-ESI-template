import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {centralisedMockTheme, mockTheme} from "../../../__mocks__/mockStore"
import {SalePrice, WasPrice, PriceLink, PriceValue, PriceContainer, RectangleDivider} from "./components"

describe("Given a PriceContainer component", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <PriceContainer />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
describe("Given a PriceContainer component with centralised theme", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={centralisedMockTheme}>
                <PriceContainer />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
describe("Given a SalePrice component", () => {
    it("should render as expected when brandNameEnabled is true", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SalePrice brandNameEnabled />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render as expected when brandNameEnabled is false", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SalePrice brandNameEnabled={false} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a WasPrice component", () => {
    it("should render as expected when brandNameEnabled is true", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <WasPrice brandNameEnabled />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render as expected when brandNameEnabled is false", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SalePrice brandNameEnabled={false} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a PriceLink component", () => {
    it("should render as expected with sale price", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <PriceLink saleprice="4.3" />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should render as expected with no sale price", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <PriceLink saleprice={null} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a PriceValue component", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <PriceValue />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a RectangleDivider component", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <RectangleDivider />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
