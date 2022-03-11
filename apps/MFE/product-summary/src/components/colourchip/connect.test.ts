import {mockState} from "../../../__mocks__/mockStore"
import {mergeProps} from "./connect"

const mockDispatch = jest.fn()
const mockSelectedColourwayAction = jest.fn()
jest.mock("../../ducks/productSummary", () => ({
    setSelectedColourwayAction: jest.fn(() => mockSelectedColourwayAction),
    setAnimateFavouriteIcon: jest.fn()
}))

describe("Given connect - mergeProps()", () => {
    let response

    beforeAll(() => {
        response = mergeProps(mockState, {dispatch: mockDispatch}, {test: "test"})
    })
    it("should project state and return expected object", () => {
        expect(response).toEqual({
            ...mockState,
            test: "test",
            setMatchingColourWay: expect.any(Function),
        })
    })
    it("should return setMatchingColourWay", () => {
        response.setMatchingColourWay()
        expect(mockDispatch).toHaveBeenCalledWith(mockSelectedColourwayAction)
    })
})
