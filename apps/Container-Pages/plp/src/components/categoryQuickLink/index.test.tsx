import React from "react"
import {render, screen} from "@testing-library/react"
import useMediaQuery from "@mui/material/useMediaQuery"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {breakpoints, mockTheme} from "@monorepo/themes"
import CategoryQuickLink from "."

jest.mock("@mui/material/useMediaQuery", () => ({
    __esModule: true,
    default: jest.fn(),
}))

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
    description: () => {
        return screen.queryByTestId("plp-category-quick-link-item-description")
    },
}

const defaultProps = {
    href: "/some/href",
    title: "Women",
    description: "some description",
    imageSrc: "/some/image",
    imageAlt: "women",
}

describe("Given <CategoryQuickLink />", () => {
    describe("by default", () => {
        it("should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLink {...defaultProps} />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("when in a device smaller than medium", () => {
        it("should not render the description", () => {
            mockScenario({minBreakpoint: breakpoints.values.sm})
            render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLink {...defaultProps} />
                </SCThemeProvider>,
            )
            expect(the.description()).not.toBeInTheDocument()
            jest.clearAllMocks()
        })
    })

    describe("when in a medium device and up", () => {
        it("should render the description", () => {
            mockScenario({minBreakpoint: breakpoints.values.md})
            render(
                <SCThemeProvider theme={mockTheme}>
                    <CategoryQuickLink {...defaultProps} />
                </SCThemeProvider>,
            )
            expect(the.description()).toBeInTheDocument()
            jest.clearAllMocks()
        })
    })
})
