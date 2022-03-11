import {Store} from "redux"
import Logger from "@monorepo/core-logger"
import reducer, {SET_FEATURE_SWITCH, updateFeatureSwitch} from "."

const mockStoreDispatch = jest.fn()
const store = {dispatch: mockStoreDispatch} as unknown as Store

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const initialState = {
    SearchBar: {
        Value: "",
    },
}
const mockResponse = {
    locals: {
        configuration: {
            "header.frontend.featureSwitch": {
                SearchBar: {
                    SimpleSearch: {
                        Value: true,
                    },
                    EnrichSearch: {
                        Value: false,
                    },
                },
                RandomFeature: {
                    A: {
                        Value: false,
                    },
                    B: {
                        Value: true,
                    },
                },
            },
        },
    },
}

describe("reducers: favourites", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    featureSwitchData: {
                        SearchBar: {
                            Value: "",
                        },
                    },
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    featureSwitchData: false,
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_FEATURE_SWITCH", () => {
        const expectedState = {
            SearchBar: {
                Value: "SimpleSearch",
            },
            RandomFeature: {
                Value: "B",
            },
        }
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_FEATURE_SWITCH,
                    featureSwitchData: {
                        SearchBar: {
                            Value: "SimpleSearch",
                        },
                        RandomFeature: {
                            Value: "B",
                        },
                    },
                }),
            ).toEqual({
                ...expectedState,
            })
        })
    })

    describe("Store: Helpers: updateFavourites() - ", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })
        describe("When updateFavourites is called", () => {
            it("dispatch should be called with SET_FAVOURITES ", () => {
                updateFeatureSwitch(store, mockResponse.locals.configuration)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_FEATURE_SWITCH,
                    featureSwitchData: {
                        SearchBar: {
                            Value: "SimpleSearch",
                        },
                        RandomFeature: {
                            Value: "B",
                        },
                    },
                })
            })
        })
        describe("When updateFavourites is called with non true Value", () => {
            it("dispatch should be called with SET_FAVOURITES ", () => {
                const newMockResponse = {
                    locals: {
                        configuration: {
                            "header.frontend.featureSwitch": {
                                SearchBar: {
                                    SimpleSearch: {
                                        Value: false,
                                    },
                                    EnrichSearch: {
                                        Value: false,
                                    },
                                },
                                RandomFeature: {
                                    A: {
                                        Value: false,
                                    },
                                    B: {
                                        Value: true,
                                    },
                                },
                            },
                        },
                    },
                }
                updateFeatureSwitch(store, newMockResponse.locals.configuration)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_FEATURE_SWITCH,
                    featureSwitchData: {
                        SearchBar: {
                            Value: "SimpleSearch",
                        },
                        RandomFeature: {
                            Value: "B",
                        },
                    },
                })

                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(Logger.error).toHaveBeenCalled()

                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(Logger.error).toHaveBeenCalledWith(
                    "Header: Incorrect set up for feature switch SearchBar, default to SimpleSearch",
                )
            })
        })
    })
})
