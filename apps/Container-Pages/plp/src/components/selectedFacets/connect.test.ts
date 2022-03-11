import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {clearFilters, setFilterModal} from "../../ducks/viewAllModal"
import TrackViewAllModalRemoveAll from "../../events/trackEvent/events/viewAllModalRemoveAll"

jest.mock("../../events/trackEvent/events/viewAllModalRemoveAll")
const mockClearFiltersAction = jest.fn()
const mockSetFilterModal = jest.fn()

jest.mock("../../ducks/viewAllModal", () => ({
    clearFilters: jest.fn(() => mockClearFiltersAction),
    setFilterModal: jest.fn(() => mockSetFilterModal),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return filters", () => {
        expect(mapStateToProps(mockState)).toMatchSnapshot()
    })
})

const mockDispatch = jest.fn()
const mockPreventDefault = jest.fn()
const mockEvent = {
    preventDefault: mockPreventDefault,
}

describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeAll(() => {
        actualMergeProps = mergeProps(mockState, {dispatch: mockDispatch} as any, {test: "test"})
    })

    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockState,
            selectFacet: expect.any(Function),
            onClearFacets: expect.any(Function),
            test: "test",
        })
    })

    it("should create an onClearFacets function", () => {
        actualMergeProps.onClearFacets(mockEvent)
        expect(mockPreventDefault).toHaveBeenCalled()
        expect(clearFilters).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(mockClearFiltersAction)
        expect(TrackViewAllModalRemoveAll).toHaveBeenCalled()
    })

    it("should create a selectFacet function", () => {
        actualMergeProps.selectFacet(mockEvent)
        expect(setFilterModal).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(mockSetFilterModal)
    })
})
