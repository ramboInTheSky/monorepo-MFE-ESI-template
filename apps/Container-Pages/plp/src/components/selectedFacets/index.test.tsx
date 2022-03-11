import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {SelectedFacets, SelectedFacetsProps} from "."
import TrackViewAllModalRemoveSelected from "../../events/trackEvent/events/viewAllModalRemoveSelected"

jest.mock("../../events/trackEvent/events/viewAllModalRemoveSelected")

jest.mock("../filterButton", () => ({
    __esModule: true,
    default: jest.fn(({text}) => <div>TEST FILTER BUTTON - {text}</div>),
}))

const mockFacets = {
    test1: {
        n: "Test1",
        c: 0,
        v: "test1",
        s: true,
        d: false,
        incompatibleWith: [],
    },
    test2: {
        n: "Test2",
        c: 0,
        v: "test2",
        s: true,
        d: false,
        incompatibleWith: [],
    },
}

describe("SelectedFacets: ", () => {
    let props: SelectedFacetsProps
    beforeEach(() => {
        props = {
            title: "test",
            selectedFacets: [mockFacets.test1, mockFacets.test2],
            selectFacet: jest.fn(),
            onClearFacets: jest.fn(),
            text: mockText
        }
    })

    it("should render correctly", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <SelectedFacets {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should remove the filter when remove filter button is clicked", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <SelectedFacets {...props} />
            </ThemeProvider>,
        )

        fireEvent.click(getByTestId("remove-button-test1"))

        expect(props.selectFacet).toHaveBeenCalledTimes(1)
        expect(props.selectFacet).toHaveBeenCalledWith(props.selectedFacets[0].v)
        expect(TrackViewAllModalRemoveSelected).toHaveBeenCalledWith(props.selectedFacets[0].v)
    })

    it("should hide the Remove label by default", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <SelectedFacets {...props} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect(screen.queryByText("Remove")).not.toBeInTheDocument()
    })

    it("should show the remove label when mousing over remove filter button", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <SelectedFacets {...props} />
            </ThemeProvider>,
        )

        fireEvent.mouseOver(getByTestId("remove-button-test1"))
        expect(screen.queryByText("Remove")).toBeInTheDocument()

        fireEvent.mouseOut(getByTestId("remove-button-test1"))
        expect(screen.queryByText("Remove")).not.toBeInTheDocument()
    })

    it("should show the remove label when focus is on the remove filter button", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <SelectedFacets {...props} />
            </ThemeProvider>,
        )

        fireEvent.focus(getByTestId("remove-button-test1"))
        expect(screen.queryByText("Remove")).toBeInTheDocument()

        fireEvent.blur(getByTestId("remove-button-test1"))
        expect(screen.queryByText("Remove")).not.toBeInTheDocument()
    })

    it("should still show the remove label after mousing out if focus is still on the remove filter button", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <SelectedFacets {...props} />
            </ThemeProvider>,
        )

        expect(screen.queryByText("Remove")).not.toBeInTheDocument()

        fireEvent.mouseOver(getByTestId("remove-button-test1"))
        expect(screen.queryByText("Remove")).toBeInTheDocument()

        fireEvent.focus(getByTestId("remove-button-test1"))
        expect(screen.queryByText("Remove")).toBeInTheDocument()

        fireEvent.mouseOut(getByTestId("remove-button-test1"))
        expect(screen.queryByText("Remove")).toBeInTheDocument()
    })
})
