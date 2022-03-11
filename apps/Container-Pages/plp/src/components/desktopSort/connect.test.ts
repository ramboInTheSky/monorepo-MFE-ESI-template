import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {setSelectedSortingAction} from "../../ducks/search"

const mockSelectedSortingAction = jest.fn()

jest.mock("../../ducks/search", () => ({
    setSelectedSortingAction: jest.fn(() => mockSelectedSortingAction),
}))

const mockDispatch = jest.fn()
const mockMappedState = {
    baseUrl: "www.test.com",
    sortOptions: {
        selected: "red",
    },
    type: mockState.request.type,
}

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return pids", () => {
        expect(mapStateToProps(mockState)).toEqual({
            sortOptions: mockState.search.sorting,
            text: mockText
        })
    })
})

describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, {test: "test"})
    })
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            test: "test",
            onSelect: expect.any(Function),
        })
    })
    it("should create a onSelect function", () => {
        actualMergeProps.onSelect("test")
        expect(setSelectedSortingAction).toHaveBeenCalledWith("test")
        expect(mockDispatch).toHaveBeenCalledWith(mockSelectedSortingAction)
    })
})
