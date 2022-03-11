import {mapStateToProps, mergeProps} from "./connect"
import {setSelectedPriceFilterAction} from "../../ducks/search"
import {mockState, mockText} from "../../../__mocks__/mockStore"
import {FilterPrice} from "../../models/Filter"
import {searchForSelectedPrice} from "../../ducks/tabbedFilters"

jest.mock("../../ducks/search", () => ({
    setSelectedPriceFilterAction: jest.fn(),
}))
jest.mock("../../ducks/tabbedFilters", () => ({
    searchForSelectedPrice: jest.fn(),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return filters", () => {
        expect(mapStateToProps(mockState, {name: "Test3"})).toEqual({
            min: (mockState.search.filters.Test3 as FilterPrice).min,
            max: (mockState.search.filters.Test3 as FilterPrice).max,
            selectedMin: (mockState.search.filters.Test3 as FilterPrice).selectedMin,
            selectedMax: (mockState.search.filters.Test3 as FilterPrice).selectedMax,
            realm: "undefined",
            locale: "en-GB",
            currencyCode: "GBP",
            text: mockText
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {isOpen: true}
const ownProps = {name: "Size"}
describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, ownProps)
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...ownProps,
            updatePriceFilters: expect.any(Function),
        })
    })
    it("should create a updatePriceFilters function", () => {
        actualMergeProps.updatePriceFilters(15, 30)
        expect(setSelectedPriceFilterAction).toHaveBeenCalledWith("Size", 15, 30)
        expect(mockDispatch).toHaveBeenCalled()
    })

    describe("When is tabbed filter", () => {
        it("should create a updatePriceFilters function that ", () => {
            actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, {
                ...ownProps,
                isTabbedFilter: true,
            })

            actualMergeProps.updatePriceFilters(15, 30)
            expect(searchForSelectedPrice).toHaveBeenCalledWith("Size", 15, 30)
            expect(mockDispatch).toHaveBeenCalled()
        })
    })
})
