import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"
import {PublishToModalsClosed} from "../../events/modalsClosed"

jest.mock("../../ducks/recents", () => {
    const createRecentQueryMock = jest.fn()
    const setRecentsDisplayMock = jest.fn()
    const showRecentSearchesMock = jest.fn()

    createRecentQueryMock.mockImplementationOnce(() => {
        return "createRecentQuery"
    })
    showRecentSearchesMock.mockReturnValue({
        type: "SHOW_PANEL",
        payload: "test",
    })
    return {
        createRecentQuery: createRecentQueryMock,
        setRecentsDisplay: setRecentsDisplayMock,
        showRecentSearches: showRecentSearchesMock,
    }
})

jest.mock("../../events/modalsClosed", () => {
    return {
        PublishToModalsClosed: jest.fn(),
    }
})

jest.mock("../../ducks/search", () => {
    const searchMock = jest.fn()
    const typingMock = jest.fn()
    const openDrawerMock = jest.fn()

    searchMock.mockImplementationOnce(() => {
        return "searchMock"
    })
    typingMock.mockImplementationOnce(() => {
        return "typingMock"
    })
    openDrawerMock.mockImplementationOnce(() => {
        return "openDrawerMock"
    })

    return {
        search: searchMock,
        typing: typingMock,
        openDrawer: openDrawerMock,
    }
})
jest.mock("../../ducks/autocomplete", () => {
    const getAutoCompleteThunkMock = jest.fn()
    const showAutoCompleteMock = jest.fn()
    const clearSuggestionsMock = jest.fn()

    getAutoCompleteThunkMock.mockReturnValue({
        type: "SET_AUTO_COMPLETE_DATA",
        payload: {
            suggestions: [
                {
                    dq: "abc",
                },
            ],
        },
    })
    showAutoCompleteMock.mockReturnValue({
        type: "SHOW_PANEL",
        payload: "test",
    })
    clearSuggestionsMock.mockReturnValue({
        type: "CLEAR_SUGGESTIONS",
    })
    return {
        getAutoCompleteThunk: getAutoCompleteThunkMock,
        showAutoComplete: showAutoCompleteMock,
        clearSuggestions: clearSuggestionsMock,
    }
})

describe("Components/SearchBox - Given connect - mapStateToProps()", () => {
    it("should return SearchBox props from the mockState", () => {
        const {parameters} = mockState.autocomplete
        const expected = {
            autocompleteParameters: parameters,
            cookie: undefined,
            siteUrl: "fakeamido.com",
            typedCharacters: "",
            backgroundImage: "/static-content/icons/header/amido/default/search-input-button.svg",
            text: mockText.searchBox,
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })
})

describe("Given connect - mergeProps", () => {
    const mockDispatch = jest.fn()

    afterEach(() => {
        mockDispatch.mockClear()
    })
    it("should merge the properties", () => {
        expect(mergeProps(mockState, {dispatch: ""}, {test: "test"})).toEqual({
            ...mockState,
            test: "test",
            dispatch: "",
            autocompleteTyping: expect.any(Function),
            handleClick: expect.any(Function),
            openDrawer: expect.any(Function),
            typing: expect.any(Function),
        })
    })
    it("should called two dispatch when handleClick is called", () => {
        mergeProps(mockState, {dispatch: mockDispatch}, {test: "test"}).handleClick("Socks")

        expect(mockDispatch).toHaveBeenCalledTimes(2)

        expect(mockDispatch.mock.calls[0]).toEqual(["createRecentQuery"])
        expect(mockDispatch.mock.calls[1]).toEqual(["searchMock"])
    })
    it("should called once dispatch when autocompleteTyping is called", () => {
        mergeProps(
            {
                ...mockState,
                autocompleteParameters: mockState.autocomplete.parameters,
                cookie: "Mock_COOKIE",
            },
            {dispatch: mockDispatch},
            {test: "test"},
        ).autocompleteTyping("Socks")

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith({
            payload: {
                suggestions: [
                    {
                        dq: "abc",
                    },
                ],
            },
            type: "SET_AUTO_COMPLETE_DATA",
        })
    })
    it("should called once dispatch and call PublishToModalsClosed  when openDrawer is called", () => {
        mergeProps(mockState, {dispatch: mockDispatch}, {test: "test"}).openDrawer()

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith("openDrawerMock")
        expect(PublishToModalsClosed).toHaveBeenCalled()
    })
    it("should called once dispatch when typing is called", () => {
        mergeProps(mockState, {dispatch: mockDispatch}, {test: "test"}).typing()

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith("typingMock")
    })
})
