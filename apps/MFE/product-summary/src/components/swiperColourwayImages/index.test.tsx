import React from "react"
import {render} from "@testing-library/react"
import useMediaQuery from "@mui/material/useMediaQuery"
import * as Redux from "react-redux"

import {ThemeProvider} from "styled-components"
import {mockTheme} from "../../../__mocks__/mockStore"
import {SwiperColourwayImages} from "."
import {mockSlides, mockThumbsGallery} from "./helpers/mocks"
import {mockUseDispatchReturnValue} from "../../../__mocks__/reduxMocks"
import {Fits} from "../../config/constants"
import * as IsOnClientHook from "../../hooks/useIsOnClient"
import * as ProductSummaryDuck from "../../ducks/productSummary"
import text from "../../../__mocks__/default-text.json"

jest.mock("./components/SwiperCarousel", () => ({
    // eslint-disable-next-line react/display-name
    SwiperCarousel: () => <div>SwiperCarousel</div>,
}))
jest.mock("./components/ColourwaySingleSlide", () => ({
    // eslint-disable-next-line react/display-name
    ColourwaySingleSlide: () => <div>ColourwaySingleSlide</div>,
}))
jest.mock("@material-ui/core/useMediaQuery")
jest.mock("../../hooks/useLazyLoadImage", () => ({
    useLazyLoadImage: () => ({
        imageProps: {
            alt: "test-image-url",
            className: "c1 lazyload",
            "data-src": "test-image-url",
            src: "spiderman/Common/Items/Default/Default/ItemImages/AltItemSwatch/21x21/greySquarePlaceholder.jpg",
        },
    }),
}))

function mockUseIsOnClient(value: boolean) {
    jest.spyOn(IsOnClientHook, "useIsOnClient").mockReturnValue({
        isOnClient: value,
    })
}

const mockedUseMediaQuery = useMediaQuery as jest.Mock

beforeAll(() => {
    mockUseDispatchReturnValue()
    // to make thumbs visible in snapshots as not mobile:
    mockedUseMediaQuery.mockReturnValue(false)
    jest.spyOn(ProductSummaryDuck, "selectCanLoadVisibleColourways").mockReturnValue(false)
    jest.spyOn(Redux, "useSelector").mockImplementation((selector: Function) => selector())
})

afterAll(() => {
    jest.restoreAllMocks()
})

describe("Given a SwiperColourwayImages component", () => {
    describe("When component is rendered on the client", () => {
        beforeEach(() => {
            mockUseIsOnClient(true)
        })

        describe("and When only one slide exists", () => {
            it("should render the component correctly to match the snapshot", () => {
                const {asFragment} = render(
                    <ThemeProvider theme={mockTheme}>
                        <SwiperColourwayImages
                            slides={[mockSlides[0]]}
                            thumbsGallery={mockThumbsGallery}
                            currentSlideIndex={0}
                            displayNewIn
                            fits={[Fits.Tall]}
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

        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperColourwayImages
                        slides={mockSlides}
                        thumbsGallery={mockThumbsGallery}
                        currentSlideIndex={0}
                        displayNewIn
                        fits={[Fits.Tall]}
                        isOnSale
                        showFitsIcons
                        lazyloadProductImages
                        text={text}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })

        it("when displayNewIn is true, it should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperColourwayImages
                        slides={mockSlides}
                        thumbsGallery={mockThumbsGallery}
                        currentSlideIndex={0}
                        displayNewIn
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

        it("when isOnSale is true, it should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperColourwayImages
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

        it("when it has fits, it should match the snapshot ", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperColourwayImages
                        slides={mockSlides}
                        thumbsGallery={mockThumbsGallery}
                        currentSlideIndex={0}
                        displayNewIn={false}
                        fits={[Fits.Tall]}
                        isOnSale={false}
                        showFitsIcons
                        lazyloadProductImages={false}
                        text={text}
                    />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When it is server side rendered", () => {
        it("should match snapshot", () => {
            mockUseIsOnClient(false)

            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SwiperColourwayImages
                        slides={mockSlides}
                        thumbsGallery={mockThumbsGallery}
                        currentSlideIndex={0}
                        displayNewIn
                        fits={[Fits.Tall]}
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
