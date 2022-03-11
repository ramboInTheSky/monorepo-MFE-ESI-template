import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {setSelectedSortingAction} from "../../ducks/search"
import TrackSortOption from "../../events/trackEvent/events/trackSortOption"

jest.mock("../../events/trackEvent/events/trackSortOption")

const mockSelectedSortingAction = jest.fn()

jest.mock("../../ducks/search", () => ({
    setSelectedSortingAction: jest.fn(() => mockSelectedSortingAction),
}))
jest.mock("../../utils/window", () => ({
    getWindow: jest.fn(() => ({
        location: {
            assign: jest.fn(),
        },
    })),
}))
jest.mock("../../utils/urlBuilder", () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: jest.fn(() => {}),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return pids", () => {
        expect(mapStateToProps(mockState)).toEqual({
            sortOptions: mockState.search.sorting,
            text: mockText
        })
    })
})

const mockDispatch = jest.fn()
const mockMappedState = {
    sortOptions: {
        selected: "red",
    },
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
            onSelect: expect.any(Function),
        })
    })
    it("should create a onSelect function", () => {
        actualMergeProps.onSelect("test")
        expect(setSelectedSortingAction).toHaveBeenCalledWith("test")
        expect(mockDispatch).toHaveBeenCalledWith(mockSelectedSortingAction)
        expect(TrackSortOption).toHaveBeenCalledWith("test")
    })
})
