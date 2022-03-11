/* eslint-disable jest/no-mocks-import */
import reducer, {createRecentQuery, deleteRecentQueries, updateRecentQueries, setRecent, SET_RECENT_SEARCH} from "."

const initialState = {
    queryIds: [],
}

const requestInitialState = {
    siteUrl: "localhost",
}

const featuresInitialData = {
    SearchBar: {
        Value: "",
        MaxItems: 6,
    },
}

describe("reducers: Recents", () => {
    let mockDispatch
    let mockGetState
    beforeEach(() => {
        mockDispatch = jest.fn()
        mockGetState = jest.fn(() => ({
            recents: initialState,
            features: featuresInitialData,
            request: requestInitialState,
        }))
    })
    describe("Action creators", () => {
        it("Should return setRecent action type", () => {
            const payload = {queryIds: ["one"]}
            const expected = {type: SET_RECENT_SEARCH, payload}
            const got = setRecent(payload)
            expect(expected).toEqual(got)
        })
    })
    describe("Dispatch functions", () => {
        it("Should add a recent query to cookies", () => {
            document.cookie = ""
            const term = "celio"
            const queryIds = ["celio"]
            const payload = {queryIds}
            const expectedArg = {
                type: SET_RECENT_SEARCH,
                payload,
            }
            const expected = "; recentSearches=[%22celio%22]"
            createRecentQuery(term)(mockDispatch, mockGetState)
            expect(mockDispatch).toHaveBeenCalled()
            expect(mockDispatch).toHaveBeenCalledWith(expectedArg)
            expect(document.cookie).toEqual(expected)
        })
        it("Should not add a recent query to cookies if it is just spaces", () => {
            document.cookie = ""
            const term = "         "
            const expectedArg = {
                type: SET_RECENT_SEARCH,
                payload: {"queryIds": []},
            }
            const expected = "; recentSearches=[]"
            createRecentQuery(term)(mockDispatch, mockGetState)
            expect(mockDispatch).toHaveBeenCalled()
            expect(mockDispatch).toHaveBeenCalledWith(expectedArg)
            expect(document.cookie).toEqual(expected)
        })
        it("Should delete all recent Queries in cookies", () => {
            document.cookie = "; recentSearches=[%22celio%22]"
            const payload = {...initialState}
            const expectedArgs = {
                type: SET_RECENT_SEARCH,
                payload,
            }
            const expected = ""
            deleteRecentQueries()(mockDispatch, mockGetState)
            expect(mockDispatch).toHaveBeenCalled()
            expect(mockDispatch).toHaveBeenCalledWith(expectedArgs)
            expect(document.cookie).toEqual(expected)
        })
        it("Update all recent queries when cookies is empty", () => {
            const payload = {queryIds: []}

            const expected = {
                type: SET_RECENT_SEARCH,
                payload,
            }
            updateRecentQueries()(mockDispatch)
            expect(mockDispatch).toHaveBeenCalled()
            expect(mockDispatch).toHaveBeenCalledWith(expected)
        })
        it("Delete cookie", () => {
            document.cookie =
                "recentSearches=%5B%7B%22term%22%3A%22blue%20trousers%22%2C%22af%22%3A%22%22%2C%22name%22%3A%22%22%7D%2C%7B%22term%22%3A%22red%20dress%22%2C%22af%22%3A%22%22%2C%22name%22%3A%22%22%7D%5D"
            const payload = {queryIds: []}

            const expected = {
                type: SET_RECENT_SEARCH,
                payload,
            }
            updateRecentQueries()(mockDispatch)
            expect(mockDispatch).toHaveBeenCalledWith(expected)
        })
        it("Update all recent queries when cookies is not empty", () => {
            updateRecentQueries()(mockDispatch)
            expect(mockDispatch).toHaveBeenCalled()
        })
    })
    describe("When called with SET_RECENT_SEARCH", () => {
        it(`should update the state`, () => {
            const payload = {
                queryIds: ["celio"],
            }
            const expected = payload
            const got = reducer(initialState, {
                type: SET_RECENT_SEARCH,
                payload,
            })
            expect(got).toEqual(expected)
        })
    })
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    payload: null as any,
                }),
            ).toEqual(initialState)
        })
    })
    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    payload: null as any,
                }),
            ).toEqual(initialState)
        })
    })
})
