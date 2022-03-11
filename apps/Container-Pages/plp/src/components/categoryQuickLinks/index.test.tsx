import React from "react"
import useMediaQuery from "@mui/material/useMediaQuery"
import {Swiper} from "swiper/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {breakpoints, mockTheme} from "@monorepo/themes"
import {render, screen} from "@testing-library/react"
import {CategoryQuickLinks} from "."
import { mockText } from "../../../__mocks__/mockStore"
import { SWIPER_ITEMS_PER_PAGE } from "../../config/constants"

jest.mock("swiper/react", () => ({
    Swiper: jest.fn(({children}) => <div className="swiper">{children}</div>),
    SwiperSlide: jest.fn(({children}) => <div className="swiper-slide">{children}</div>),
}))

jest.mock("@mui/material/useMediaQuery", () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockItems = (length) => {
    return Array(length).fill(
        {
            href: "",
            title: "Women",
            description: "Womens description...",
            imageSrc: "/some/image/src.jpg",
            imageAlt: "women",
        }
    // href is used as key in render so needs to be unique
    ).map((item, index) => ({...item, href: `/women/${index}`}))
}

interface Scenario {
    minBreakpoint?: number
}

function mockScenario({minBreakpoint = breakpoints.values.xs}: Scenario) {
    ;(useMediaQuery as jest.Mock).mockImplementation(query => {
        if (query === `(min-width: ${minBreakpoint}px)`) {
            return true
        }
        return false
    })
}

const the = {
    categoryQuickLinks: () => {
        return screen.queryByTestId("plp-category-quick-links")
    },
}

describe("Given <CategoryQuickLinks />", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("by default", () => {
        it("should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLinks items={mockItems(2)} text={mockText} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("when there are no items", () => {
        it("should render nothing", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLinks items={[]} text={mockText} />
                </SCThemeProvider>,
            )
            expect(the.categoryQuickLinks()).not.toBeInTheDocument()
        })
    })

    describe("when in a medium device and above", () => {
        it("should render a gap of 32px between the swiper slides", () => {
            mockScenario({minBreakpoint: breakpoints.values.md})
            render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLinks items={mockItems(2)} text={mockText}/>
                </SCThemeProvider>,
            )
            expect(Swiper).toHaveBeenCalledWith(expect.objectContaining({spaceBetween: 32}), {})
        })
    })

    describe("when in a device that is below medium", () => {
        it("should render a gap of 16px between the swiper slides", () => {
            mockScenario({minBreakpoint: breakpoints.values.sm})
            render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLinks items={mockItems(2)} text={mockText} />
                </SCThemeProvider>,
            )
            expect(Swiper).toHaveBeenCalledWith(expect.objectContaining({spaceBetween: 16}), {})
        })
    })

    describe("when there are SWIPER_ITEMS_PER_PAGE items or less", () => {
        it("should set navigation to false", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLinks items={mockItems(SWIPER_ITEMS_PER_PAGE)} text={mockText} />
                </SCThemeProvider>,
            )
            expect(Swiper).toHaveBeenCalledWith(expect.objectContaining({navigation: false}), {})
        })
    })

    describe("when there are more than SWIPER_ITEMS_PER_PAGE items", () => {
        it("should set navigation to true", () => {
            render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLinks items={mockItems(SWIPER_ITEMS_PER_PAGE + 1)} text={mockText} />
                </SCThemeProvider>,
            )
            expect(Swiper).toHaveBeenCalledWith(expect.objectContaining({navigation: true}), {})
        })
    })
})
