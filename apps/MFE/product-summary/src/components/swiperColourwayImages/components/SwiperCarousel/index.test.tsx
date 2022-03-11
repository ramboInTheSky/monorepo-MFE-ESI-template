import React from "react"
import {render} from "@testing-library/react"
import useMediaQuery from "@mui/material/useMediaQuery"
import * as Redux from "react-redux"

import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../../../__mocks__/mockStore"
import {SwiperCarousel} from "."
import {mockSlides, mockThumbsGallery} from "../../helpers/mocks"
import {mockUseDispatchReturnValue} from "../../../../../__mocks__/reduxMocks"
import * as ProductSummaryDuck from "../../../../ducks/productSummary"
import * as TextAlignmentDuck from "../../../../ducks/text-alignment"
import text from "../../../../../__mocks__/default-text.json"

jest.mock("@material-ui/core/useMediaQuery")

jest.mock("../ColourwayImageSlide", () => ({
    // eslint-disable-next-line react/display-name
    ColourwayImageSlide: () => <div>ColourwayImageSlide</div>,
}))
jest.mock("../ColourwaySwiperDetails", () => ({
    // eslint-disable-next-line react/display-name
    ColourwaySwiperDetails: () => <div>ColourwaySwiperDetails</div>,
}))
jest.mock("../ThumbColourChip", () => ({
    // eslint-disable-next-line react/display-name
    ThumbColourChip: () => <div>ThumbColourChip</div>,
}))
jest.mock("@material-ui/core/useMediaQuery")

const mockedUseMediaQuery = useMediaQuery as jest.Mock

describe("Given a SwiperCarousel component", () => {
    beforeAll(() => {
        jest.spyOn(ProductSummaryDuck, "selectCanLoadVisibleColourways").mockReturnValue(false)
        jest.spyOn(TextAlignmentDuck, "selectIsLeftToRight").mockReturnValue(false)
        jest.spyOn(Redux, "useSelector").mockImplementation((selector: Function) => selector())
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    describe("When is desktop breakpoint", () => {
        beforeEach(() => {
            mockUseDispatchReturnValue()
            mockedUseMediaQuery.mockReturnValue(true)
        })

        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperCarousel
                        slides={mockSlides}
                        thumbsGallery={mockThumbsGallery}
                        currentSlideIndex={0}
                        displayNewIn={false}
                        fits={[]}
                        isOnSale={false}
                        showFitsIcons={false}
                        lazyloadProductImages
                        text={text}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should render the component correctly to match the snapshot with SALE item", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperCarousel
                        slides={mockSlides}
                        thumbsGallery={mockThumbsGallery}
                        currentSlideIndex={0}
                        displayNewIn={false}
                        fits={[]}
                        isOnSale
                        showFitsIcons={false}
                        lazyloadProductImages
                        text={text}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("when is not desktop breakpoint", () => {
        beforeEach(() => {
            mockUseDispatchReturnValue()
            mockedUseMediaQuery.mockReturnValue(false)
        })

        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperCarousel
                        slides={mockSlides}
                        thumbsGallery={mockThumbsGallery}
                        currentSlideIndex={0}
                        displayNewIn={false}
                        fits={[]}
                        isOnSale={false}
                        showFitsIcons={false}
                        lazyloadProductImages
                        text={text}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("should render the component correctly to match the snapshot with SALE item", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperCarousel
                        slides={mockSlides}
                        thumbsGallery={mockThumbsGallery}
                        currentSlideIndex={0}
                        displayNewIn={false}
                        fits={[]}
                        isOnSale
                        showFitsIcons
                        lazyloadProductImages
                        text={text}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
