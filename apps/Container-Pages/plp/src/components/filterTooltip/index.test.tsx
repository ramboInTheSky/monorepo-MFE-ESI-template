import React from "react"
import {fireEvent, render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Provider} from "react-redux"
import mockStore, {mockTheme} from "../../../__mocks__/mockStore"
import TooltipComponent from "."

describe("TooltipComponent: ", () => {
    it("should render correctly if filter is 'feat:available', and trigger the correct function if the close button is clicked", () => {
        const handleTooltipCloseMock = jest.fn()
        const {asFragment, getByTestId} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <TooltipComponent handleTooltipClose={handleTooltipCloseMock} filterType="feat:available" />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()

        fireEvent.click(getByTestId("plp-filters-close-button"))
        expect(handleTooltipCloseMock).toBeCalled()
    })

    it("should render correctly if filter is 'feat:backinstock'", () => {
        const handleTooltipCloseMock = jest.fn()
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <TooltipComponent handleTooltipClose={handleTooltipCloseMock} filterType="feat:backinstock" />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should render correctly if filter is 'feat:deliveryby'", () => {
        const handleTooltipCloseMock = jest.fn()
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <TooltipComponent handleTooltipClose={handleTooltipCloseMock} filterType="feat:deliveryby" />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should not break if filter is some other value: 'feat:TEST'", () => {
        const handleTooltipCloseMock = jest.fn()
        const {asFragment} = render(
            <Provider store={mockStore}>
                <SCThemeProvider theme={mockTheme}>
                    <TooltipComponent handleTooltipClose={handleTooltipCloseMock} filterType="feat:TEST" />
                </SCThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
