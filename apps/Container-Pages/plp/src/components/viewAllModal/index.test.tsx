import React from "react"
import {render} from "@testing-library/react"
import {breakpoints} from "@monorepo/themes"
import {ThemeProvider} from "styled-components"
import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {ViewAllModal} from "."
import FilterButton from "../filterButton"
import FacetSearch from "../facetSearch"
import * as WindowUtils from "../../utils/window"

jest.mock("../filterButton", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(({text}) => <div>TEST FILTER BUTTON - {text}</div>),
}))

jest.mock("../facetSearch", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => <div>TEST SEARCH MODAL</div>),
}))

jest.mock("../characterFilter", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => <div>TEST CHARACTER FILTER </div>),
}))

jest.mock("../selectedFacets", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => <div>TEST SELECTED FACETS</div>),
}))

jest.mock("../facetsGrid", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => <div>TEST FACETS GRID</div>),
}))

const mockOnClose = jest.fn()
const mockOnCloseApply = jest.fn()

describe("ViewAllModal: ", () => {
    it("when not open, it should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <ViewAllModal
                    title="test"
                    isViewMoreOpen={false}
                    onClose={mockOnClose}
                    onCloseResize={mockOnClose}
                    onCloseApplyFilter={mockOnCloseApply}
                    hideLetterNav={false}
                    hideSearchBox={false}
                    text={mockText}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("when open, it should match the snapshot ", () => {
        const {baseElement} = render(
            <ThemeProvider theme={mockTheme}>
                <ViewAllModal
                    title="test"
                    isViewMoreOpen
                    onClose={mockOnClose}
                    onCloseResize={mockOnClose}
                    onCloseApplyFilter={mockOnCloseApply}
                    hideLetterNav={false}
                    hideSearchBox={false}
                    text={mockText}
                />
            </ThemeProvider>,
        )
        expect(baseElement).toMatchSnapshot()
        expect(FacetSearch).toHaveBeenCalled()
        expect(FilterButton).toHaveBeenCalledWith(
            {
                onClick: mockOnClose,
                text: "Close",
                "data-testid": "plp-view-all-close",
            },
            {},
        )
        expect(FilterButton).toHaveBeenCalledWith(
            {
                onClick: mockOnCloseApply,
                text: "Confirm test",
                large: true,
            },
            {},
        )
    })

    it("should match the snapshot when letter nav is hidden", () => {
        const {baseElement} = render(
            <ThemeProvider theme={mockTheme}>
                <ViewAllModal
                    title="test"
                    isViewMoreOpen
                    onClose={mockOnClose}
                    onCloseResize={mockOnClose}
                    onCloseApplyFilter={mockOnCloseApply}
                    hideLetterNav
                    hideSearchBox={false}
                    text={mockText}
                />
            </ThemeProvider>,
        )
        expect(baseElement).toMatchSnapshot()
    })

    it("should match the snapshot when search box is hidden", () => {
        const {baseElement} = render(
            <ThemeProvider theme={mockTheme}>
                <ViewAllModal
                    title="test"
                    isViewMoreOpen
                    onClose={mockOnClose}
                    onCloseResize={mockOnClose}
                    onCloseApplyFilter={mockOnCloseApply}
                    hideLetterNav={false}
                    hideSearchBox
                    text={mockText}
                />
            </ThemeProvider>,
        )
        expect(baseElement).toMatchSnapshot()
    })

    describe("On mounting, when window innerWidth is less than large breakpoint", () => {
        it("should trigger the `onClose` callback", () => {
            const spy = jest.spyOn(WindowUtils, "getWindow").mockReturnValue({
                innerWidth: breakpoints.values.lg - 1,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
            } as any)
            render(
                <ThemeProvider theme={mockTheme}>
                    <ViewAllModal
                        title="test"
                        isViewMoreOpen
                        onClose={mockOnClose}
                        onCloseResize={mockOnClose}
                        onCloseApplyFilter={mockOnCloseApply}
                        hideLetterNav={false}
                        hideSearchBox={false}
                        text={mockText}
                    />
                </ThemeProvider>,
            )

            expect(mockOnClose).toHaveBeenCalledWith()
            spy.mockRestore()
        })
    })

    
})
