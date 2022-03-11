import _TrackFilterSelection from "../../events/trackEvent/events/trackFilterSelection"
import _TrackFilterDeselect from "../../events/trackEvent/events/trackFilterDeselect"
import _TrackIsViewMoreTriggeredFilter from "../../events/trackEvent/events/trackIsViewMoreTriggeredFilter"
import _TrackIsViewLessTriggeredFilter from "../../events/trackEvent/events/trackIsViewLessTriggeredFilter"
import {applyAllFilters, SET_ALL_FILTERS} from "../search"
import reducer, {
    SET_VIEW_ALL_CLOSE,
    setViewAllCloseAction,
    SET_VIEW_ALL_OPEN,
    setViewAllOpenAction,
    setViewAllOpen,
    CLEAR_FILTERS,
    clearFiltersAction,
    clearFilters,
    SET_FILTERS_ALPHABET,
    setFiltersAlphabetAction,
    ViewAllModalDuckState,
    setFilterModal,
    SET_FILTER_MODAL,
    setHideSearchFilterModalElements,
    SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS,
} from "."
import {FacetsState} from "../../models/FacetsState"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackFilterSelection", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackFilterDeselect", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackIsViewMoreTriggeredFilter", () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock("../../events/trackEvent/events/trackIsViewLessTriggeredFilter", () => ({
    __esModule: true,
    default: jest.fn(),
}))

const initialState: ViewAllModalDuckState = {
    isOpen: false,
    name: "",
    displayName: "",
    activeCharacter: "All",
    facets: new FacetsState(),
    hideSearchFilterModalElements: {
        searchBox: false,
        letterNav: false,
    },
}

const mockDispatch = jest.fn()
const mockGetState = jest.fn(() => ({
    search: {
        filters: {
            test: {
                displayName: "Test Name",
                facets: ["opt1", "opt2"],
            },
            test1: {
                displayName: "Test Name 1",
                facets: ["opt3"],
            },
        },
        facets: {
            opt1: {
                s: true,
                n: "Option 1",
            },
            opt2: {
                n: "Option 2",
            },
            opt3: {
                s: true,
                n: "Option 3",
            },
        },
    },
    viewAllModal: {
        displayName: "",
        name: "",
        isOpen: false,
        activeCharacter: "All",
        facets: {
            opt1: {n: "opt1", c: 1, v: "opt1", incompatibleWith: [], d: false},
            opt2: {n: "opt2", c: 1, v: "opt2", s: true, incompatibleWith: ["opt3"], d: false},
            opt3: {n: "opt3", c: 1, v: "opt3", s: true, incompatibleWith: ["opt2"], d: false},
        },
        hideSearchFilterModalElements: {
            searchBox: false,
            letterNav: false,
        },
    },
}))

describe("Given a View All Modal Duck", () => {
    describe("Given setViewAllCloseAction", () => {
        it("should create a Set View All Closed action", () => {
            expect(setViewAllCloseAction()).toEqual({type: SET_VIEW_ALL_CLOSE})
        })
    })

    describe("Given setViewAllOpenAction", () => {
        it("should create a Set View All Open action", () => {
            expect(setViewAllOpenAction(initialState)).toEqual({type: SET_VIEW_ALL_OPEN, data: initialState})
        })
    })

    describe("Given setFiltersAlphabetAction", () => {
        it("should create a Set Filters Alphabet action", () => {
            expect(setFiltersAlphabetAction("All")).toEqual({type: SET_FILTERS_ALPHABET, activeCharacter: "All"})
        })
    })

    describe("Given setFilterModal", () => {
        it("should create a set filter modal action", () => {
            expect(setFilterModal("opt1")).toEqual({type: SET_FILTER_MODAL, value: "opt1"})
        })
    })

    describe("Given clearFiltersAction", () => {
        it("should create a Clear Filters Alphabet action", () => {
            expect(clearFiltersAction({facets: initialState.facets})).toEqual({
                type: CLEAR_FILTERS,
                data: {facets: initialState.facets},
            })
        })
    })

    describe("Given a applyAllFilters", () => {
        const cleanDispatch = jest.fn()
        beforeAll(() => {
            applyAllFilters()(cleanDispatch, mockGetState as any)
        })
        it("Should call Dispatch with expected action", () => {
            const expectedActionData = {
                facets: {
                    opt1: {
                        n: "opt1",
                        c: 1,
                        v: "opt1",
                        incompatibleWith: [],
                        d: false,
                    },
                    opt2: {
                        n: "opt2",
                        c: 1,
                        v: "opt2",
                        s: true,
                        incompatibleWith: ["opt3"],
                        d: false,
                    },
                    opt3: {
                        n: "opt3",
                        c: 1,
                        v: "opt3",
                        s: true,
                        incompatibleWith: ["opt2"],
                        d: false,
                    },
                },
            }
            expect(cleanDispatch).toHaveBeenCalledWith({
                type: SET_ALL_FILTERS,
                value: expectedActionData,
            })
            expect(cleanDispatch).toHaveBeenCalledWith({
                type: SET_VIEW_ALL_CLOSE,
            })
        })
    })

    describe("Given a clearFilters", () => {
        beforeAll(() => {
            clearFilters()(mockDispatch, mockGetState)
        })
        it("should revert selected to false on all filters", () => {
            const expectedActionData = {
                facets: {
                    opt1: {
                        n: "opt1",
                        c: 1,
                        v: "opt1",
                        incompatibleWith: [],
                        d: false,
                        s: false,
                    },
                    opt2: {
                        n: "opt2",
                        c: 1,
                        v: "opt2",
                        incompatibleWith: ["opt3"],
                        d: false,
                        s: false,
                    },
                    opt3: {
                        n: "opt3",
                        c: 1,
                        v: "opt3",
                        incompatibleWith: ["opt2"],
                        d: false,
                        s: false,
                    },
                },
            }
            expect(mockDispatch).toHaveBeenCalledWith({
                type: CLEAR_FILTERS,
                data: expectedActionData,
            })
        })
    })

    describe("Given a setViewAllOpen", () => {
        const mockExpectedName = "test"

        beforeAll(() => {
            jest.clearAllMocks()
            setViewAllOpen(mockExpectedName)(mockDispatch, mockGetState)
        })
        it("Should call Dispatch with expected action", () => {
            const expectedActionData = {
                isOpen: true,
                name: mockExpectedName,
                displayName: "Test Name",
                activeCharacter: "All",
                facets: {
                    opt1: {
                        s: true,
                        n: "Option 1",
                    },
                    opt2: {
                        n: "Option 2",
                    },
                },
                hideSearchFilterModalElements: {
                    letterNav: false,
                    searchBox: false,
                },
            }
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_VIEW_ALL_OPEN,
                data: expectedActionData,
            })
        })
    })

    describe("Given a setHideSearchFilterModalElements", () => {
        it("Should call Dispatch with expected action", () => {
            mockDispatch(setHideSearchFilterModalElements({letterNav: false, searchBox: false}))
            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS,
                data: {letterNav: false, searchBox: false},
            })
        })
    })

    describe("Given a reducer", () => {
        const expectedActionData: ViewAllModalDuckState = {
            isOpen: true,
            name: "test",
            displayName: "Test Name",
            activeCharacter: "All",
            facets: {
                opt1: {
                    s: true,
                    n: "opt1",
                    c: 123,
                    v: "opt1",
                    incompatibleWith: [],
                    d: false,
                },
                opt2: {n: "opt2", c: 4, v: "opt2", incompatibleWith: [], d: false},
            },
            hideSearchFilterModalElements: {
                searchBox: true,
                letterNav: true,
            },
        }

        describe("When called with SET_VIEW_ALL_OPEN", () => {
            const mockAction = {
                type: SET_VIEW_ALL_OPEN as typeof SET_VIEW_ALL_OPEN,
                data: expectedActionData,
            }
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual(expectedActionData)
            })
        })

        describe("When called with SET_FILTER_MODAL", () => {
            const initialState2: ViewAllModalDuckState = {
                isOpen: true,
                name: "test",
                displayName: "Test Name",
                activeCharacter: "All",
                facets: {
                    opt1: {
                        n: "opt1",
                        c: 123,
                        v: "opt1",
                        incompatibleWith: [],
                        d: false,
                    },
                    opt2: {
                        n: "opt2",
                        c: 4,
                        v: "opt2",
                        incompatibleWith: [],
                        d: false,
                    },
                },
                hideSearchFilterModalElements: {
                    searchBox: true,
                    letterNav: true,
                },
            }
            const expectedActionData2: ViewAllModalDuckState = {
                isOpen: true,
                name: "test",
                displayName: "Test Name",
                activeCharacter: "All",
                facets: {
                    opt1: {
                        s: true,
                        n: "opt1",
                        c: 123,
                        v: "opt1",
                        incompatibleWith: [],
                        d: false,
                    },
                    opt2: {
                        n: "opt2",
                        c: 4,
                        v: "opt2",
                        incompatibleWith: [],
                        d: false,
                    },
                },
                hideSearchFilterModalElements: {
                    searchBox: true,
                    letterNav: true,
                },
            }
            const mockAction = {
                type: SET_FILTER_MODAL as typeof SET_FILTER_MODAL,
                value: "opt1",
            }
            it("should set state correctly", () => {
                expect(reducer(initialState2, mockAction)).toEqual(expectedActionData2)
            })
        })

        describe("When called with SET_VIEW_ALL_CLOSE", () => {
            const mockAction = {
                type: SET_VIEW_ALL_CLOSE as typeof SET_VIEW_ALL_CLOSE,
                data: expectedActionData,
            }
            it("should set state correctly", () => {
                expect(reducer(expectedActionData, mockAction)).toEqual({
                    ...initialState,
                    hideSearchFilterModalElements: {
                        letterNav: true,
                        searchBox: true,
                    },
                })
            })
        })

        describe("When called with SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS", () => {
            const mockAction = {
                type: SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS as typeof SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS,
                data: {
                    searchBox: false,
                    letterNav: true,
                },
            }
            it("should set state correctly", () => {
                expect(reducer(initialState, mockAction)).toEqual({
                    ...initialState,
                    hideSearchFilterModalElements: {
                        searchBox: false,
                        letterNav: true,
                    },
                })
            })
        })

        describe("When called with SET_FILTERS_ALPHABET", () => {
            const previousState: ViewAllModalDuckState = {
                isOpen: true,
                name: "Style",
                displayName: "Style",
                activeCharacter: "All",
                facets: {
                    opt1: {
                        n: "AA1",
                        c: 123,
                        v: "value1",
                        incompatibleWith: [],
                        d: false,
                    },
                },
                hideSearchFilterModalElements: {
                    searchBox: true,
                    letterNav: true,
                },
            }

            const expectedState: ViewAllModalDuckState = {
                isOpen: true,
                name: "Style",
                displayName: "Style",
                activeCharacter: "T",
                facets: {
                    opt1: {
                        n: "AA1",
                        c: 123,
                        v: "value1",
                        incompatibleWith: [],
                        d: false,
                    },
                },
                hideSearchFilterModalElements: {
                    searchBox: true,
                    letterNav: true,
                },
            }

            const mockAction = {
                type: SET_FILTERS_ALPHABET as typeof SET_FILTERS_ALPHABET,
                activeCharacter: "T",
            }
            it("should set state correctly", () => {
                expect(reducer(previousState, mockAction)).toEqual(expectedState)
            })
        })

        describe("When called with CLEAR_FILTERS", () => {
            it("should return the correct state", () => {
                const expectedState = {
                    isOpen: false,
                    name: "",
                    displayName: "",
                    activeCharacter: "All",
                    facets: new FacetsState(),
                    hideSearchFilterModalElements: {
                        letterNav: false,
                        searchBox: false,
                    },
                }

                expect(
                    reducer(initialState, {
                        type: CLEAR_FILTERS,
                        data: [],
                    }),
                ).toEqual(expectedState)
            })
        })
    })
})
