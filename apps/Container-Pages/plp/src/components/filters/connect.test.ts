import {mockState, mockText} from "../../../__mocks__/mockStore"
import {setFilterClearAllAction} from "../../ducks/search"
import {mapStateToProps, mergeProps} from "./connect"
import State from "../../models/State"

jest.mock("../../ducks/search", () => ({
    setFilterClearAllAction: jest.fn(),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return filters", () => {
        expect(mapStateToProps(mockState)).toEqual({
            totalResults: mockState.search.totalResults,
            filters: mockState.search.filters,
            consolidatedFilters: ["Test2"],
            isFilterSelected: false,
            text: mockText,
        })
    })

    it("should return the price filter", () => {
        const priceMockState = {
            ...mockState,
            search: {
                ...mockState.search,
                filtersSort: ["Test3"],
            },
        }
        expect(mapStateToProps(priceMockState)).toEqual({
            totalResults: mockState.search.totalResults,
            filters: mockState.search.filters,
            consolidatedFilters: ["Test3"],
            isFilterSelected: false,
            text: mockText,
        })
    })

    it("should project state and return isFilterSelected: true", () => {
        const newMockState: State = {
            ...mockState,
            search: {
                ...mockState.search,
                facets: {
                    ...mockState.search.facets,
                    opt1: {
                        n: "opt1",
                        c: 1,
                        v: "opt1",
                        s: true,
                        incompatibleWith: [],
                        d: false,
                    },
                    opt2: {
                        n: "opt2",
                        c: 1,
                        v: "opt2",
                        s: true,
                        incompatibleWith: ["opt3"],
                        d: false,
                    },
                    opt3: {
                        n: "opt3",
                        c: 1,
                        v: "opt3",
                        incompatibleWith: ["opt2"],
                        d: false,
                    },
                },
            },
        }
        expect(mapStateToProps(newMockState)).toEqual({
            totalResults: mockState.search.totalResults,
            filters: mockState.search.filters,
            consolidatedFilters: ["Test1", "Test2"],
            isFilterSelected: true,
            text: mockText,
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {}
const ownProps = {}
describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, ownProps)
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...ownProps,
            clearAllFilters: expect.any(Function),
        })
    })
    it("should dispatch setFilterClearAllAction", () => {
        actualMergeProps.clearAllFilters()
        expect(setFilterClearAllAction).toHaveBeenCalledWith()
        expect(mockDispatch).toHaveBeenCalled()
    })
})
