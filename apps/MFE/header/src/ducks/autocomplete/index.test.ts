/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/unbound-method */
import logger from "@monorepo/core-logger"
import reducer, {
    getAutoCompleteThunk,
    SET_AUTO_COMPLETE_DATA,
    CLEAR_SUGGESTIONS,
    SET_PARAMETER_VALUES,
    SET_LOADING,
    clearSuggestions,
    setAutoCompleteData,
} from "."
import {showAutoComplete} from "../search"

const mockStoreDispatch = jest.fn()

const mockData = {
    response: {
        q: "ani",
        suggestions: [
            {
                dq: "abc",
                q: "abc",
            },
        ],
        numFound: 1,
        products: [
            {
                pid: "289313",
                sale_price: 38,
                thumb_image: "https://xcdn.amido.com/Common/Items/Default/Default/ItemImages/AltItemZoom/289313.jpg",
                title: "tan ditsy animal midi shirt dress",
                url: "https://",
            },
            {
                pid: "2893453",
                sale_price: 76,
                thumb_image: "https://xcdn.amido.com/Common/Items/Defaultasdsad/289313.jpg",
                title: "tan ditsy animal midi shirt dress",
                url: "https://abc",
            },
        ],
    },
}

const mockStore = {
    dispatch: mockStoreDispatch,
    getState: jest.fn(() => ({request: {headers: ""}, autocomplete: initialState})),
}

const initialState = {
    isLoading: false,
    parameters: {
        accountId: "",
        domainKey: "",
        authKey: "",
    },
    q: "",
    suggestions: null,
    numFound: 0,
    products: null,
}

jest.mock("../../api/autocomplete", () => ({
    getAutocompleteData: jest.fn(async () => Promise.resolve(mockData)),
}))

jest.mock("../search", () => ({
    showAutoComplete: jest.fn(),
    showRecentSearch: jest.fn(),
}))

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

describe("reducers: search", () => {
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

    describe("When called with SET_AUTO_COMPLETE_DATA", () => {
        it(`should update the state with the data returning from api`, () => {
            const expectedState = {
                ...initialState,
                ...mockData.response,
            }
            expect(
                reducer(initialState, {
                    type: SET_AUTO_COMPLETE_DATA,
                    payload: mockData,
                }),
            ).toEqual(expectedState)
        })
        it(`should update the state with the empty response from the api`, () => {
            const expectedState = {
                isLoading: false,
                numFound: 0,
                parameters: {
                    accountId: "",
                    domainKey: "",
                    authKey: "",
                },
                products: [],
                q: "",
                suggestions: [],
            }

            expect(
                reducer(initialState, {
                    type: SET_AUTO_COMPLETE_DATA,
                    payload: {
                        response: {},
                    },
                }),
            ).toEqual(expectedState)
        })
    })
    describe("When called with CLEAR_SUGGESTIONS", () => {
        const expectedState = {
            isLoading: false,
            numFound: 0,
            parameters: {
                accountId: "",
                domainKey: "",
                authKey: "",
            },
            products: null,
            q: "",
            suggestions: [],
        }
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: CLEAR_SUGGESTIONS,
                    payload: initialState,
                }),
            ).toEqual(expectedState)
        })
    })
    describe("When called with SET_PARAMETER_VALUES", () => {
        const expectedState = {
            isLoading: false,
            numFound: 0,
            parameters: {
                accountId: 6116,
                domainKey: "amido_global",
                authKey: "harovpat1tpa716o",
            },
            products: null,
            q: "",
            suggestions: null,
        }
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_PARAMETER_VALUES,
                    payload: {
                        accountId: 6116,
                        domainKey: "amido_global",
                        authKey: "harovpat1tpa716o",
                    },
                }),
            ).toEqual(expectedState)
        })
    })
    describe("When called with SET_LOADING", () => {
        const expectedState = {
            isLoading: true,
            numFound: 0,
            parameters: {
                accountId: "",
                authKey: "",
                domainKey: "",
            },
            products: null,
            q: "",
            suggestions: null,
        }
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_LOADING,
                    payload: true,
                }),
            ).toEqual(expectedState)
        })
    })

    describe("Store: getAutoCompleteThunk() ", () => {
        const searchValue = "socks"
        const accountId = "AccountId"
        const domainKey = "domainKey"
        const authKey = "authKey"
        const uid2 = "uid2"
        describe("When loading products", () => {
            beforeEach(() => mockStoreDispatch.mockClear())
            it("should call the store dispatch when updateProductsOnly is false", async () => {
                await getAutoCompleteThunk(
                    searchValue,
                    accountId,
                    domainKey,
                    authKey,
                    uid2,
                )(mockStore.dispatch, mockStore.getState)

                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_AUTO_COMPLETE_DATA,
                    payload: mockData,
                })
            })
            it("should call the store dispatch when updateProductsOnly is true", async () => {
                const updateProductsOnly = true
                await getAutoCompleteThunk(
                    searchValue,
                    accountId,
                    domainKey,
                    authKey,
                    uid2,
                    updateProductsOnly,
                )(mockStore.dispatch, mockStore.getState)

                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_AUTO_COMPLETE_DATA,
                    payload: {
                        response: {
                            ...initialState,
                            products: mockData.response.products,
                            q: mockData.response.q,
                        },
                    },
                })
            })
        })
    })

    describe("Store: getAutoCompleteThunk() - Error ", () => {
        const searchValue = "socks"
        const accountId = "AccountId"
        const domainKey = "domainKey"
        const authKey = "authKey"
        const uid2 = "uid2"
        describe("When loading products", () => {
            const getStateMock = jest.fn(() => {
                throw new Error()
            })
            beforeEach(() => mockStoreDispatch.mockClear())
            it("should call the logger error method", async () => {
                await getAutoCompleteThunk(
                    searchValue,
                    accountId,
                    domainKey,
                    authKey,
                    uid2,
                )(mockStore.dispatch, getStateMock)

                expect(logger.error).toHaveBeenCalled()
            })

            it("should call the showAutoComplete method with false", async () => {
                await getAutoCompleteThunk(
                    searchValue,
                    accountId,
                    domainKey,
                    authKey,
                    uid2,
                )(mockStore.dispatch, getStateMock)

                expect(mockStore.dispatch).toHaveBeenCalledWith(showAutoComplete(false))
            })

            it("should call dispatch with SET_AUTO_COMPLETE_DATA set to initial", async () => {
                await getAutoCompleteThunk(
                    searchValue,
                    accountId,
                    domainKey,
                    authKey,
                    uid2,
                )(mockStore.dispatch, getStateMock)

                expect(mockStore.dispatch).toHaveBeenCalledWith({type: SET_AUTO_COMPLETE_DATA, payload: initialState})
            })

            it("should call dispatch with SET_LOADING set to false", async () => {
                await getAutoCompleteThunk(
                    searchValue,
                    accountId,
                    domainKey,
                    authKey,
                    uid2,
                )(mockStore.dispatch, getStateMock)

                expect(mockStore.dispatch).toHaveBeenCalledWith({type: SET_LOADING, payload: false})
            })
        })
    })

    describe("Store: functions ", () => {
        it("should return type and payloaod when setAutoCompleteData ", () => {
            const payload = {
                response: {
                    q: "",
                    suggestions: [],
                    numFound: 0,
                    products: [],
                    parameters: {
                        accountId: "",
                        domainKey: "",
                        authKey: "",
                    },
                    isLoading: false,
                },
            }
            expect(setAutoCompleteData(payload)).toEqual({
                type: SET_AUTO_COMPLETE_DATA,
                payload,
            })
        })
        it("should only return type when clearSuggestions ", () => {
            expect(clearSuggestions()).toEqual({
                type: CLEAR_SUGGESTIONS,
            })
        })
    })
})
