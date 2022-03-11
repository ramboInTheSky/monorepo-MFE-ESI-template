import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"

import _TrackFilterSelection from "../../events/trackEvent/events/trackFilterSelection"
import _TrackFilterDeselect from "../../events/trackEvent/events/trackFilterDeselect"
import _TrackIsViewMoreTriggeredFilter from "../../events/trackEvent/events/trackIsViewMoreTriggeredFilter"
import _TrackIsViewLessTriggeredFilter from "../../events/trackEvent/events/trackIsViewLessTriggeredFilter"

import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {DesktopSort} from "."
import TextAlignment from "../../models/textAlignment"
import TrackSortOpen from "../../events/trackEvent/events/trackSortOpen"
import TrackSortOption from "../../events/trackEvent/events/trackSortOption"

jest.mock("../../events/trackEvent/events/trackSortOpen")
jest.mock("../../events/trackEvent/events/trackSortOption")

jest.mock("../../events/trackEvent/events/trackIsViewLessTriggeredFilter", () => ({
    __esModule: true,
    TrackFilterSelection: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackFilterDeselect", () => ({
    __esModule: true,
    TrackFilterDeselect: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackIsViewMoreTriggeredFilter", () => ({
    __esModule: true,
    TrackIsViewMoreTriggeredFilter: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackIsViewLessTriggeredFilter", () => ({
    __esModule: true,
    TrackIsViewLessTriggeredFilter: jest.fn(),
}))

const mockOnSelect = jest.fn()
const componentToTest = (
    <ThemeProvider theme={mockTheme}>
        <DesktopSort
            onSelect={mockOnSelect}
            sortOptions={{
                selected: "red",
                options: [
                    {name: "red", value: "red"},
                    {name: "blue", value: "blue"},
                ],
            }}
            textAlignment={TextAlignment.Ltr}
            text={mockText}
        />
    </ThemeProvider>
)
describe("Given a Desktop Sort: ", () => {
    it("should match the snapshot ", () => {
        const {asFragment} = render(componentToTest)
        expect(asFragment()).toMatchSnapshot()
    })

    describe("When clicking the input", () => {
        it("should render the options", () => {
            const {getByLabelText} = render(componentToTest)
            // test clicking sort opens the expected list
            fireEvent.click(getByLabelText("Sort"))
            expect(screen.getByText(/blue/i)?.parentElement?.parentElement).toMatchSnapshot()
            // test click an option changes select
            fireEvent.click(screen.getByText(/blue/i))
            expect(mockOnSelect).toHaveBeenCalledWith("blue")
        })

        it("should publish track events", () => {
            const {getByLabelText} = render(componentToTest)
    
            fireEvent.click(getByLabelText("Sort"))
            expect(TrackSortOpen).toHaveBeenCalled()
    
            fireEvent.click(screen.queryByText(/blue/i) as HTMLElement)
            expect(TrackSortOption).toHaveBeenCalled()
        })
    })

    it("When clicking the input twice, it should close the options", () => {
        const {getByLabelText} = render(componentToTest)
        // test clicking sort opens the expected list
        fireEvent.click(getByLabelText("Sort"))
        let selectOption = screen.queryByText(/blue/i)
        expect(selectOption).toBeInTheDocument()

        fireEvent.click(getByLabelText("Sort"))
        selectOption = screen.queryByText(/blue/i)
        expect(selectOption).not.toBeInTheDocument()
    })
})
