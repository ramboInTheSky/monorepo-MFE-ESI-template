import React from "react"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"

import {mockTheme} from "../../../__mocks__/mockStore"
import {
    EmptyDivider,
    NewInLabel,
    TileCardMedia,
    TileImage,
    SwiperContainer,
    ThumbsContainer,
    ThumbImageWrapper,
    ThumbsComponent,
    ThumbImage,
} from "./components"

describe("Given a Colourway Carousel Component - TileCardMedia", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <TileCardMedia tabIndex={0} component="a" href="ww.test.com" />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    describe("When is supposed to position absolutely", () => {
        it("should render as expected", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <TileCardMedia tabIndex={0} component="a" href="ww.test.com" $isPositionAbsolute />
                </ThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})

describe("Given a Colourway Carousel Component - TileImage", () => {
    it("should render as expected", () => {
        const {asFragment} = render(<TileImage src="myimage.jpg" alt="title text" />)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colourway Carousel Component - SwiperContainer", () => {
    it("should render as expected", () => {
        const {asFragment} = render(<SwiperContainer>Test</SwiperContainer>)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colourway Carousel Component - ThumbsContainer", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ThumbsContainer width={200}>Test</ThumbsContainer>
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colourway Carousel Component - ThumbImageWrapper", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThumbImageWrapper>
                <img src="test" alt="test" />
            </ThumbImageWrapper>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colourway Carousel Component - ThumbsComponent", () => {
    it("should render as expected", () => {
        const {asFragment} = render(<ThumbsComponent>Test</ThumbsComponent>)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colourway Carousel Component - EmptyDivider", () => {
    it("should render as expected", () => {
        const {asFragment} = render(<EmptyDivider>Test</EmptyDivider>)
        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colourway Carousel Component - NewInLabel", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <NewInLabel>Test</NewInLabel>
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})

describe("Given a Colourway Carousel Component - ThumbImage", () => {
    it("should render as expected", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ThumbImage src="test-url" />
            </ThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
