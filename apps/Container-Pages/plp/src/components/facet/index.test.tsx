import React from "react"
import {render, cleanup, fireEvent} from "@testing-library/react"
import {Provider} from "react-redux"
import {ThemeProvider} from "styled-components"
import mockStore, {mockTheme, mockState} from "../../../__mocks__/mockStore"

import {Facet} from "."

describe("Facet: ", () => {
    const handleSetFacet = jest.fn()
    const filterTooltipHandler = jest.fn()
    let filterValueTooltipOpen = ""
    const facet = mockState.viewAllModal.facets.opt1
    const facetBackInStock = {
        n: "Back In Stock",
        c: 1,
        v: "feat:backinstock",
        incompatibleWith: [""],
        d: false,
    }
    afterEach(() => {
        cleanup()
        jest.clearAllMocks()
    })
    it("should render correctly", () => {
        const {asFragment, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <Facet
                    facet={facet}
                    handleSetFacet={handleSetFacet}
                    enabledTooltips={false}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect((getByTestId("plp-facet-checkbox-opt1") as HTMLInputElement).checked).toEqual(false)
        expect(getByTestId("plp-facet-checkbox-opt1") as HTMLInputElement).toHaveProperty(
            "name",
            "plp-facet-checkbox-opt1",
        )
    })

    it("should render correctly if a facet with tooltip", () => {
        const {asFragment, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <Facet
                    facet={facetBackInStock}
                    handleSetFacet={handleSetFacet}
                    enabledTooltips={false}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect((getByTestId("plp-facet-checkbox-feat:backinstock") as HTMLInputElement).checked).toEqual(false)
        expect(getByTestId("plp-facet-checkbox-feat:backinstock") as HTMLInputElement).toHaveProperty(
            "name",
            "plp-facet-checkbox-feat:backinstock",
        )
    })

    it("should render correctly as a modal facet", () => {
        const {asFragment, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <Facet
                    facet={facet}
                    handleSetFacet={handleSetFacet}
                    modal
                    enabledTooltips={false}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect(getByTestId("plp-facet-checkbox-modal-opt1") as HTMLInputElement).toHaveProperty(
            "name",
            "plp-facet-checkbox-modal-opt1",
        )
    })

    it("should render correctly when a facet is selected", () => {
        const {asFragment, getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <Facet
                    facet={{...facet, s: true}}
                    handleSetFacet={handleSetFacet}
                    enabledTooltips={false}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect((getByTestId("plp-facet-checkbox-opt1") as HTMLInputElement).checked).toEqual(true)
    })

    it("should render correctly when disabled", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <Facet
                    facet={{...facet, d: true}}
                    handleSetFacet={handleSetFacet}
                    enabledTooltips={false}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should call 'handleSetFacet' prop when check box changes", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <Facet
                    facet={facet}
                    handleSetFacet={handleSetFacet}
                    enabledTooltips={false}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            </ThemeProvider>,
        )

        fireEvent.click(getByTestId("plp-facet-checkbox-opt1"))

        expect(handleSetFacet).toHaveBeenCalledWith(facet.v)
    })

    it("should call 'handleSetFacet' prop when check box changes with a keypress - enter", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <Facet
                    facet={facet}
                    handleSetFacet={handleSetFacet}
                    enabledTooltips={false}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            </ThemeProvider>,
        )

        fireEvent.keyDown(getByTestId("plp-facet-checkbox-opt1"), {key: "Enter"})

        expect(handleSetFacet).toHaveBeenCalledWith(facet.v)
    })

    it("should not call 'handleSetFacet' prop when check box changes with a keypress - Down", () => {
        const {getByTestId} = render(
            <ThemeProvider theme={mockTheme}>
                <Facet
                    facet={facet}
                    handleSetFacet={handleSetFacet}
                    enabledTooltips={false}
                    filterTooltipHandler={filterTooltipHandler}
                    filterValueTooltipOpen={filterValueTooltipOpen}
                />
            </ThemeProvider>,
        )

        fireEvent.keyDown(getByTestId("plp-facet-checkbox-opt1"), {key: "Down"})

        expect(handleSetFacet).not.toHaveBeenCalledWith(facet.v)
    })

    it("should render correctly if a facet with tooltip and tooltip is open", () => {
        const initialStateForVisibleTooltip = true
        const initialStateForTooltipOpen = true
        filterValueTooltipOpen = "feat:backinstock"

        React.useState = jest
            .fn()
            .mockReturnValueOnce([initialStateForVisibleTooltip, {}])
            .mockReturnValueOnce([initialStateForTooltipOpen, {}])

        const {asFragment, getByTestId} = render(
            <Provider store={mockStore}>
                <ThemeProvider theme={mockTheme}>
                    <Facet
                        facet={facetBackInStock}
                        handleSetFacet={handleSetFacet}
                        enabledTooltips
                        filterTooltipHandler={filterTooltipHandler}
                        filterValueTooltipOpen={filterValueTooltipOpen}
                    />
                </ThemeProvider>
            </Provider>,
        )
        expect(asFragment()).toMatchSnapshot()
        expect((getByTestId("plp-facet-checkbox-feat:backinstock") as HTMLInputElement).checked).toEqual(false)
        expect(getByTestId("plp-facet-checkbox-feat:backinstock") as HTMLInputElement).toHaveProperty(
            "name",
            "plp-facet-checkbox-feat:backinstock",
        )

        fireEvent.click(getByTestId("plp-facet-tooltip-icon-feat:backinstock"))

        fireEvent.click(getByTestId("plp-filters-close-button"))
    })
})
