import {Store} from "redux"

import reducer, {
    SET_SECONDARY_NAV_DATA,
    GET_SECONDARY_NAV_DATA,
    SET_DEFAULT_SECONDARY_CONFIG,
    SET_IS_IN_SECONDARY_NAV,
    setDefaultConfig,
    setIsInSecondaryMeganav,
    getSecondaryNavDataThunk,
    initialState,
} from "."

import {SecondaryNav} from "../../models/secondary-nav"

const mockStoreDispatch = jest.fn()
const store = ({dispatch: mockStoreDispatch} as unknown) as Store

const mockData: SecondaryNav = {
    id: "",
    items: [
        {
            items: [{items: [], title: "", type: ""}],
            missions: {categoryLink: {target: "", title: ""}, title: "", items: [], noOfColumns: 0},
            title: "men",
            type: "",
        },
    ],
    language: "",
    realm: "",
    target: "",
    territory: "",
    title: "men",
    viewType: "",
    banner: null,
}

jest.mock("../../api/appdata", () => {
    return {getSecondaryNavData: jest.fn(async () => Promise.resolve({items: mockData}))}
})

describe("reducers: secondary nav", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "test" as any,
                    payload: false,
                }),
            ).toEqual(initialState)
        })
    })

    describe("When called with an action to ignore", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(initialState, {
                    type: "TEST" as any,
                    payload: false,
                }),
            ).toEqual(initialState)
        })
    })
    describe("When called with GET_SECONDARY_NAV_DATA", () => {
        it(`should update isPending to true`, () => {
            expect(
                reducer(initialState, {
                    type: GET_SECONDARY_NAV_DATA,
                    payload: true,
                }),
            ).toEqual({...initialState, isPending: true})
        })
        it(`should update isPending to false`, () => {
            expect(
                reducer(initialState, {
                    type: GET_SECONDARY_NAV_DATA,
                    payload: false,
                }),
            ).toEqual({...initialState, isPending: false})
        })
    })
    describe("When called with SET_SECONDARY_NAV_DATA", () => {
        const payload = mockData
        const expected = {
            ...initialState,
            catalogues: {
                men: mockData,
            },
            departmentIds: ["men"],
        }
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_SECONDARY_NAV_DATA,
                    payload,
                }),
            ).toEqual(expected)
        })
    })

    describe("When called with SET_IS_IN_SECONDARY_NAV", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_IS_IN_SECONDARY_NAV,
                    payload: false,
                }),
            ).toEqual({...initialState, isInSecondaryNav: false})
        })
    })
    describe("When called with SET_DEFAULT_SECONDARY_CONFIG", () => {
        it(`should update the state`, () => {
            const config = {
                country: "mx",
                version: "v1.0.0",
            }
            expect(
                reducer(initialState, {
                    type: SET_DEFAULT_SECONDARY_CONFIG,
                    payload: config,
                }),
            ).toEqual({...initialState, config: {...config}})
        })
    })

    describe("When setIsInSecondaryMeganav is called", () => {
        it("Should return data", () => {
            const mockDispatch = jest.fn()
            const expected = {
                type: SET_IS_IN_SECONDARY_NAV,
                payload: false,
            }
            setIsInSecondaryMeganav(false)(mockDispatch)
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
                type: SET_DEFAULT_SECONDARY_CONFIG,
                payload: config,
            }
            setDefaultConfig(store, config)
            expect(mockStoreDispatch).toHaveBeenCalledWith(expected)
        })
    })
})

describe("Store: getSecondaryNavDataThunk() ", () => {
    beforeEach(() => jest.clearAllMocks())
    describe("When getting data", () => {
        it("should call the store dispatch", async () => {
            const departmentId = "unsetdepartment"
            const dispatch = jest.fn()
            const mockStore = jest.fn(() => {
                return {
                    request: {headers: {}, siteUrl: "sampleurl"},
                    secondarynav: {catalogues: {men: []}},
                }
            })
            await getSecondaryNavDataThunk(departmentId)(dispatch, mockStore)

            expect(dispatch).toHaveBeenCalledTimes(2)

            expect(dispatch.mock.calls[0]).toEqual([
                {
                    type: GET_SECONDARY_NAV_DATA,
                    payload: true,
                },
            ])
            expect(dispatch.mock.calls[1]).toEqual([
                {
                    type: SET_SECONDARY_NAV_DATA,
                    payload: {
                        banner: {
                            imageUrl: "",
                            target: "",
                        },
                        id: "",
                        items: [
                            {
                                items: [
                                    {
                                        items: [
                                            {
                                                fontFamily: "",
                                                fontWeight: "",
                                                icon: null,
                                                items: [
                                                    {
                                                        fontFamily: "",
                                                        fontWeight: "",
                                                        linkColour: "",
                                                        icon: null,
                                                        target: "",
                                                        title: "",
                                                        type: "",
                                                    },
                                                ],
                                                linkColour: "",
                                                title: "",
                                                type: "",
                                            },
                                        ],
                                        title: "",
                                        type: "",
                                    },
                                ],
                                missions: null,
                                title: "",
                                type: "",
                            },
                        ],
                        language: "",
                        realm: "",
                        target: "",
                        territory: "",
                        title: "",
                        viewType: "",
                    },
                },
            ])
        })
    })
})
