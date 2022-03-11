import {mapDispatchToProps} from "./connect"
import {setPageItemsThunk} from "../../ducks/search"

const mockSetPageItemsThunk = jest.fn()

jest.mock("../../ducks/search", () => ({
    setPageItemsThunk: jest.fn(() => mockSetPageItemsThunk),
}))

describe("Given connect - mapDispatchToProps()", () => {
    it("should add state functions", () => {
        expect(mapDispatchToProps).toEqual({
            loadPageFromUrl: expect.any(Function),
        })
    })
    it("should create a loadPageFromUrl function", () => {
        mapDispatchToProps.loadPageFromUrl("test")
        expect(setPageItemsThunk).toHaveBeenCalledWith({historyUrl: "test"})
    })
})
