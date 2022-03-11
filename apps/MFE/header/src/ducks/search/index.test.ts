import reducer, {
    SET_TYPED_SEARCH,
    SHOW_AUTOCOMPLETE_PANEL,
    SHOW_RECENTSEARCH_PANEL,
    setSearch,
    getPlpUrl,
    search,
    typing,
    openDrawer,
    closeAllPanels,
} from "."

const initialState = {
    typedCharacters: "",
    showAutocomplete: false,
    showRecentSearch: false,
}

describe("reducers: search", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    payload: "",
                }),
            ).toEqual({
                typedCharacters: "",
                showAutocomplete: false,
                showRecentSearch: false,
            })
        })
        it(`should set the typedCharacters when type is SET_TYPED_SEARCH`, () => {
            expect(
                reducer(undefined, {
                    type: SET_TYPED_SEARCH,
                    payload: "shirt",
                }),
            ).toEqual({
                typedCharacters: "shirt",
                showAutocomplete: false,
                showRecentSearch: false,
            })
        })
        it(`should set the showAutocomplete when type is SHOW_AUTOCOMPLETE_PANEL`, () => {
            expect(
                reducer(undefined, {
                    type: SHOW_AUTOCOMPLETE_PANEL,
                    payload: true,
                }),
            ).toEqual({
                typedCharacters: "",
                showAutocomplete: true,
                showRecentSearch: false,
            })
        })
        it(`should set the showRecentSearch when type is SHOW_RECENTSEARCH_PANEL`, () => {
            expect(
                reducer(undefined, {
                    type: SHOW_RECENTSEARCH_PANEL,
                    payload: true,
                }),
            ).toEqual({
                typedCharacters: "",
                showAutocomplete: false,
                showRecentSearch: true,
            })
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    payload: "abc",
                }),
            ).toEqual(initialState)
        })
    })

    describe("Store: Helpers: setSearch() - ", () => {
        it("should return the type and payload", () => {
            const got = setSearch("abc")
            expect(got).toEqual({
                type: SET_TYPED_SEARCH,
                payload: "abc",
            })
        })
    })

    describe("Store: Helpers: closeAllPanels() - ", () => {
        it("should set autocomplete to false and recent search to false ", () => {
            const mockDispatch = jest.fn()
            closeAllPanels()(mockDispatch)
            expect(mockDispatch.mock.calls[0]).toEqual([
                {
                    payload: false,
                    type: "SHOW_RECENTSEARCH_PANEL",
                },
            ])
            expect(mockDispatch.mock.calls[1]).toEqual([
                {
                    payload: false,
                    type: "SHOW_AUTOCOMPLETE_PANEL",
                },
            ])
        })
    })

    describe("Store: Helpers: openDrawer() - ", () => {
        it("should set autocomplete to true and recent search to false ", () => {
            const mockDispatch = jest.fn()
            const mockState = () => ({
                search: {
                    typedCharacters: "shirt",
                },
            })
            openDrawer()(mockDispatch, mockState)
            expect(mockDispatch.mock.calls[1]).toEqual([
                {
                    payload: false,
                    type: "SHOW_RECENTSEARCH_PANEL",
                },
            ])
            expect(mockDispatch.mock.calls[0]).toEqual([
                {
                    payload: true,
                    type: "SHOW_AUTOCOMPLETE_PANEL",
                },
            ])
        })
        it("should set autocomplete to false and recent search to true", () => {
            const mockDispatch = jest.fn()
            const mockState = () => ({
                search: {
                    typedCharacters: "sh",
                },
            })
            openDrawer()(mockDispatch, mockState)
            expect(mockDispatch.mock.calls[0]).toEqual([
                {
                    payload: true,
                    type: "SHOW_RECENTSEARCH_PANEL",
                },
            ])
            expect(mockDispatch.mock.calls[1]).toEqual([
                {
                    payload: false,
                    type: "SHOW_AUTOCOMPLETE_PANEL",
                },
            ])
        })
    })
    describe("Store: Helpers: getPlpUrl() - ", () => {
        it("should return the plp url", () => {
            const got = getPlpUrl("PLP.URL")("SOCKS")
            expect(got).toEqual("PLP.URL/search?w=SOCKS")
        })
        it("should return the plp url when searched with ampersand ", () => {
            const got = getPlpUrl("PLP.URL")("SOCKS&")
            expect(got).toEqual("PLP.URL/search?w=SOCKS%26")
        })
        it("should return the plp url when searched with plus sign", () => {
            const got = getPlpUrl("PLP.URL")("SOCKS+")
            expect(got).toEqual("PLP.URL/search?w=SOCKS%2B")
        })
        it("should return the plp url when searched with hash sign", () => {
            const got = getPlpUrl("PLP.URL")("SOCKS#")
            expect(got).toEqual("PLP.URL/search?w=SOCKS%23")
        })
    })
    describe("Store: Helpers: typing() - ", () => {
        it("should return the type and payload", () => {
            const mockDispatch = jest.fn()
            typing("SOCKS")(mockDispatch)
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_TYPED_SEARCH,
                payload: "SOCKS",
            })
        })
    })
    describe("Store: Helpers: search() - ", () => {
        const {location} = window
        beforeAll((): void => {
            delete window.location
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            window.location = {href: jest.fn()}
        })

        afterAll((): void => {
            window.location = location
        })

        it("should set window.location.href", () => {
            search("PLP.URL", "SOCKS")()
            expect(window.location.href).toEqual("PLP.URL/search?w=SOCKS")
        })
    })
})
