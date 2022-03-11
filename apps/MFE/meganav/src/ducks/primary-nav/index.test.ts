import {Store} from "redux"
import reducer, {
    initialState,
    SET_PRIMARY_NAV_DATA,
    SET_PRIMARY_NAV_ACTIVE_INDEX,
    setPrimaryNavIndex,
    setIsInPrimaryNav,
    setDefaultConfig,
    getPrimaryNavDataThunk,
    SET_IS_IN_PRIMARY_NAV,
    SET_DEFAULT_PRIMARY_CONFIG,
    setNextPrimaryNavIndex,
} from "."

const mockStoreDispatch = jest.fn()
const store = {dispatch: mockStoreDispatch} as unknown as Store

const mockStore = {
    dispatch: mockStoreDispatch,
    getState: jest.fn(() => ({request: {headers: ""}, primarynav: {config: {country: "gb", version: "v1.0.3"}}})),
}

const mockData = [
    {
        title: "New In",
        path: "New In1",
        target: "/new-in",
    },
    {
        title: "Girls",
        path: "Girls1",
        target: "/girls",
    },
]

jest.mock("../../api/appdata", () => {
    return {getPrimaryNavData: jest.fn(async () => Promise.resolve({items: mockData}))}
})

describe("reducers: primary nav", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "test" as any,
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

    describe("When called with SET_PRIMARY_NAV_ACTIVE_INDEX", () => {
        const expectedState = {...initialState, activeDepartmentIndex: 1, active: true, activeDepartment: "boys"}
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_PRIMARY_NAV_ACTIVE_INDEX,
                    payload: {
                        activeDepartment: "boys",
                        activeDepartmentIndex: 1,
                        active: true,
                    },
                }),
            ).toEqual(expectedState)
        })
    })
    describe("When called with SET_PRIMARY_NAV_DATA", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_PRIMARY_NAV_DATA,
                    payload: mockData,
                }),
            ).toEqual({...initialState, items: mockData})
        })
    })
    describe("When called with SET_IS_IN_PRIMARY_NAV", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_IS_IN_PRIMARY_NAV,
                    payload: false,
                }),
            ).toEqual({...initialState, isInPrimaryNav: false})
        })
    })
    describe("When called with SET_DEFAULT_PRIMARY_CONFIG", () => {
        it(`should update the state`, () => {
            const config = {
                country: "mx",
                version: "v1.0.0",
            }
            expect(
                reducer(initialState, {
                    type: SET_DEFAULT_PRIMARY_CONFIG,
                    payload: config,
                }),
            ).toEqual({...initialState, config: {...config}})
        })
    })
    describe("When setPrimaryNavIndex is called", () => {
        it("Should return data", () => {
            const mockDispatch = jest.fn()
            const activeDepartmentIndex = 2
            const activeDepartment = "boys"
            const expected = {
                type: SET_PRIMARY_NAV_ACTIVE_INDEX,
                payload: {activeDepartment, activeDepartmentIndex, active: true},
            }
            setPrimaryNavIndex(activeDepartmentIndex, activeDepartment)(mockDispatch)
            expect(mockDispatch).toHaveBeenCalledWith(expected)
        })
    })
    describe("When setIsInPrimaryNav is called", () => {
        it("Should return data", () => {
            const mockDispatch = jest.fn()
            const expected = {
                type: SET_IS_IN_PRIMARY_NAV,
                payload: false,
            }
            setIsInPrimaryNav(false)(mockDispatch)
            expect(mockDispatch).toHaveBeenCalledWith(expected)
        })
    })
    describe("When setDefaultConfig is called", () => {
        it("Should return data", () => {
            const config = {
                country: "mx",
                version: "v1.0.0",
            }
            const expected = {
                type: SET_DEFAULT_PRIMARY_CONFIG,
                payload: config,
            }
            setDefaultConfig(store, config)
            expect(mockStoreDispatch).toHaveBeenCalledWith(expected)
        })
    })

    describe("When setNextPrimaryNavIndex is called", () => {
        it("should set primary nav active index to next available", () => {
            const mockDispatch = jest.fn(cb => {
                if (cb && typeof cb === "function") {
                    cb(mockDispatch)
                }
            })
            const mockGetState = jest.fn(() => ({
                primarynav: {
                    activeDepartmentIndex: 0,
                    items: [
                        {
                            title: "test 0 title",
                            path: "test 0 path",
                        },
                        {
                            title: "test 1 title",
                            path: "test 1 path",
                        },
                    ],
                },
            }))
            setNextPrimaryNavIndex()(mockDispatch, mockGetState)

            expect(mockDispatch).toHaveBeenCalledWith({
                type: SET_PRIMARY_NAV_ACTIVE_INDEX,
                payload: {
                    activeDepartment: "test 1 title",
                    activeDepartmentIndex: 1,
                    active: true,
                },
            })
        })
    })
})

describe("Store: getPrimaryNavDataThunk() ", () => {
    beforeEach(() => jest.clearAllMocks())
    describe("When getting data", () => {
        it("should call the store dispatch", async () => {
            await getPrimaryNavDataThunk(mockStore as any)
            const expected = {
                type: SET_PRIMARY_NAV_DATA,
                payload: mockData,
            }
            expect(mockStoreDispatch).toHaveBeenCalledTimes(1)
            expect(mockStoreDispatch).toHaveBeenCalledWith(expected)
        })
    })
})
