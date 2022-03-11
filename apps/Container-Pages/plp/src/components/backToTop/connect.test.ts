import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {setPageItemsThunk} from "../../ducks/search"
import text from "../../../__mocks__/default-text.json"

jest.mock("../../ducks/search", () => ({
    setPageItemsThunk: jest.fn(),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and return startPage & text", () => {
        expect(mapStateToProps(mockState)).toEqual({startPage: 1, text})
    })
})

describe("Given connect - mergeProps()", () => {
    const mockDispatch = jest.fn()
    const mockMappedState = {
        facets: mockState.viewAllModal.facets,
    }
    const mockOwnProps = {test: "test"}
    let actualMergeProps

    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, mockOwnProps)
    })

    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...mockOwnProps,
            loadFirstPage: expect.any(Function),
        })
    })

    describe("When loadFirstPage is called", () => {
        it("should dispatch the correct data", () => {
            actualMergeProps.loadFirstPage("test-url")
            expect(setPageItemsThunk).toHaveBeenCalledWith({
                historyUrl: "test-url",
                enableDebounce: false,
            })
        })
    })
})
