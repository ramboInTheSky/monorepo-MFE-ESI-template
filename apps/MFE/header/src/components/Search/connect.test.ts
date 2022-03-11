import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mapDispatchToProps} from "./connect"

describe("Components/Search - Given connect - mapStateToProps()", () => {
    it("should return required state from mockState", () => {
        const {
            searchBox: {closeButton, smallPlaceholder, bigPlaceholder},
            drawer,
        } = mockState.text

        const expected = {
            showAutoComplete: mockState.search.showAutocomplete,
            showRecentSearch: mockState.search.showRecentSearch,
            iconUrl: "/static-content/icons/header/undefined/default/search.svg",
            anchor: "right",
            typedCharacters: "",
            searchBarType: "SimpleSearch",
            checkRecentSearch: true,
            text: {closeButton, smallPlaceholder, drawer, bigPlaceholder},
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })
    it("should called the dispatch once when handleClose is called", () => {
        const mockDispatch = jest.fn()
        const got = mapDispatchToProps(mockDispatch)
        expect(got.handleClose).toBeTruthy()

        got.handleClose()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
    it("should called the dispatch once when openDrawer is called", () => {
        const mockDispatch = jest.fn()
        const got = mapDispatchToProps(mockDispatch)
        expect(got.openDrawer).toBeTruthy()

        got.openDrawer()
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
})
