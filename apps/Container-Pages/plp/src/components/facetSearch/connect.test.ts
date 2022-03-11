import {setFilterModal} from "../../ducks/viewAllModal"
import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"

const mockDispatch = jest.fn()
const mockMappedState = {
    testState: "test"
}
const mockOwnProps = {
    test: "test"
}

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return filters", () => {
        expect(mapStateToProps(mockState)).toMatchSnapshot()
    })
})

describe("Given connect - mergeProps()", () => {
    let actualMergeProps
    beforeAll(() => {
        actualMergeProps = mergeProps(mockMappedState, {dispatch: mockDispatch} as any, mockOwnProps)
    })
    
    it("should add state functions", () => {
        expect(actualMergeProps).toEqual({
            ...mockMappedState,
            ...mockOwnProps,
            handleSetFilterModal: expect.any(Function)
        })
    })

    it("should create a handleSetFilterModal function", () => {
        actualMergeProps.handleSetFilterModal('test-filter')
        expect(mockDispatch).toHaveBeenCalledWith(setFilterModal('test-filter'))
    })
})
