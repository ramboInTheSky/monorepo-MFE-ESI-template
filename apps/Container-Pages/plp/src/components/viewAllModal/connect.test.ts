import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {setViewAllCloseAction} from "../../ducks/viewAllModal"

const mockSetViewAllCloseAction = jest.fn()
const mockApplyAllFilters = jest.fn()

jest.mock("../../ducks/viewAllModal", () => ({
    setViewAllCloseAction: jest.fn(() => mockSetViewAllCloseAction),
}))

jest.mock("../../ducks/search", () => ({
    applyAllFilters: jest.fn(() => mockApplyAllFilters),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return filters", () => {
        expect(mapStateToProps(mockState)).toEqual({
            isViewMoreOpen: mockState.viewAllModal.isOpen,
            title: mockState.viewAllModal.displayName,
            hideLetterNav: false,
            hideSearchBox: false,
            text: mockText
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {
    testState: "test",
}
const mockPreventDefault = jest.fn()
const mockEvent = {
    preventDefault: mockPreventDefault,
}

describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, {test: "test"})
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            test: "test",
            onClose: expect.any(Function),
            onCloseResize: expect.any(Function),
            onCloseApplyFilter: expect.any(Function),
        })
    })
    it("should create a onClose function", () => {
        actualMergeProps.onClose(mockEvent)
        expect(mockPreventDefault).toHaveBeenCalled()
        expect(setViewAllCloseAction).toHaveBeenCalled()

        expect(mockDispatch).toHaveBeenCalledWith(mockSetViewAllCloseAction)
    })

    it("should create a onCloseResize function", () => {
        actualMergeProps.onCloseResize()
        expect(setViewAllCloseAction).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(mockSetViewAllCloseAction)
    })

    it("should create a onCloseApplyFilter function", () => {
        actualMergeProps.onCloseApplyFilter()
        expect(setViewAllCloseAction).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith(mockApplyAllFilters)
    })
})
