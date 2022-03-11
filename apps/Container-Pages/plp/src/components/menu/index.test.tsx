import React from "react"
import {render, cleanup, fireEvent, screen} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {Menu} from "."
import TrackSortOpen from "../../events/trackEvent/events/trackSortOpen"

jest.mock("../../events/trackEvent/events/trackSortOpen")

const mockOnSelect = jest.fn()
const componentToTest = (
    <ThemeProvider theme={mockTheme}>
        <Menu
            buttonText="SORT"
            onSelect={mockOnSelect}
            options={{
                selected: "red",
                options: [
                    {name: "red", value: "red"},
                    {name: "blue", value: "blue"},
                ],
            }}
            text={mockText}
        />
    </ThemeProvider>
)
describe("Given a Menu: ", () => {
    afterEach(() => {
        cleanup()
    })

    it("should match the snapshot ", () => {
        const {asFragment} = render(componentToTest)
        expect(asFragment()).toMatchSnapshot()

        expect(screen.queryByTestId("plp-menu-options-sort")).not.toBeInTheDocument()
    })

    it("When clicking the button, it should render the options", () => {
        const {asFragment} = render(componentToTest)
        // test clicking sort opens the expected modal
        fireEvent.click(screen.getByText(/SORT/i))
        expect(asFragment()).toMatchSnapshot()
        expect(screen.getByTestId("plp-menu-options-sort")).toMatchSnapshot()
        expect(screen.queryByText(/SORT/i)).not.toBeInTheDocument()
        expect(TrackSortOpen).toHaveBeenCalled()

        // test tab closes modal
        fireEvent.keyDown(screen.getByTestId("menu-list-grow"), {key: "Tab", code: "KeyTab"})
        expect(screen.getByText(/SORT/i)).toBeInTheDocument()

        // test click outside modal closes modal
        fireEvent.click(screen.getByText(/SORT/i))
        fireEvent.click(screen.getByText(/CLOSE/i))
        expect(screen.getByText(/SORT/i)).toBeInTheDocument()

        // test click an option changes select
        fireEvent.click(screen.getByText(/SORT/i))
        fireEvent.click(screen.getByText(/blue/i))
        expect(screen.getByText(/SORT/i)).toBeInTheDocument()
        expect(mockOnSelect).toHaveBeenCalledWith("blue")
    })
})
