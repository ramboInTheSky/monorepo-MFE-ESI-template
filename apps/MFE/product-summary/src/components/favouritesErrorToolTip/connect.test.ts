import {mockState} from "../../../__mocks__/mockStore"
import {mapDispatchToProps, mapStateToProps} from "./connect"
import text from "../../../__mocks__/default-text.json"

const mockDispatch = jest.fn()
const mockssetShowFavErrorToolTip = jest.fn()
jest.mock("../../ducks/productSummary", () => ({
    setShowFavErrorToolTip: jest.fn(() => mockssetShowFavErrorToolTip),
}))

describe("Given connect - mapStateToProps()", () => {
    const mappedProps = mapStateToProps(mockState)

    it("should project state and only return pid", () => {
        expect(mappedProps).toEqual({
            showFavErrorToolTip: mockState.productSummary.showFavErrorToolTip,
            baseUrl: mockState.productSummary.summaryData.baseUrl,
            text
        })
    })
})

describe("Given connect - mapDispatchToProps()", () => {
    let response

    beforeAll(() => {
        response = mapDispatchToProps(mockDispatch)
    })
    it("should project state and return expected object", () => {
        expect(response).toEqual({
            setShowFavErrorToolTip: expect.any(Function),
        })
    })
    it("should return setShowFavErrorToolTip", () => {
        response.setShowFavErrorToolTip()
        expect(mockDispatch).toHaveBeenCalledWith(mockssetShowFavErrorToolTip)
    })
})
