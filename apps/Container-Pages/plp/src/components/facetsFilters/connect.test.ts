import {mapStateToProps, mergeProps} from "./connect"
import {setFilterIsOpenThunk, setFilterClearTypeAction} from "../../ducks/search"
import {mockState, mockText} from "../../../__mocks__/mockStore"
import TrackFilterExpanded from "../../events/trackEvent/events/trackFilterExpanded"

jest.mock("../../events/trackEvent/events/trackFilterExpanded", () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: jest.fn(() => {}),
}))

jest.mock("../../ducks/search", () => ({
    setFilterIsOpenThunk: jest.fn(),
    setFilterClearTypeAction: jest.fn(),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return filters", () => {
        expect(mapStateToProps(mockState, {name: "Test1"})).toEqual({
            displayName: mockState.search.filters.Test1.displayName,
            isOpen: mockState.search.filters.Test1.isFilterOpen,
            type: "feat",
            isFilterSelected: false,
            text: mockText
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {isOpen: true}
const ownProps = {name: "Size"}
const mockEvent = {preventDefault: jest.fn()}
describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, ownProps)
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...ownProps,
            toggleExpansionPanel: expect.any(Function),
            clearTypeFilters: expect.any(Function),
        })
    })
    it("should create a toggleExpansionPanel function", () => {
        actualMergeProps.toggleExpansionPanel(mockEvent)
        expect(mockEvent.preventDefault).toHaveBeenCalled()
        expect(setFilterIsOpenThunk).toHaveBeenCalledWith(false, "Size")
        expect(mockDispatch).toHaveBeenCalled()
        expect(TrackFilterExpanded).not.toHaveBeenCalled()
    })
    it("when panel is closed, it should create a toggleExpansionPanel function that tracks its opening", () => {
        const mockMappedStateFilterClosed = {isOpen: false}
        const actualMergePropsFilterClosed = mergeProps(
            mockMappedStateFilterClosed,
            {dispatch: mockDispatch} as any,
            ownProps,
        )
        actualMergePropsFilterClosed.toggleExpansionPanel(mockEvent)
        expect(TrackFilterExpanded).toHaveBeenCalledWith("Size")
    })
    it("should create a clearTypeFilters function", () => {
        actualMergeProps.clearTypeFilters()
        expect(mockEvent.preventDefault).toHaveBeenCalled()
        expect(setFilterClearTypeAction).toHaveBeenCalledWith("Size")
        expect(mockDispatch).toHaveBeenCalled()
    })
})
