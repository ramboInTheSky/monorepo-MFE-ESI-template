import {getSettingsHeaders} from "@monorepo/utils"
import {SettingsSdkKeys} from "../../models/settings"
import State from "../../models/State"
import reducer, {
    SET_REQUEST,
    updateRequest,
    parsePageParam,
    selectRequestedPage,
    selectRealm,
    selectTerritory,
    ASSIGN_REQUEST_STATE,
} from "."
import {REALM_HEADER, SearchApiRequestTypes, TERRITORY_HEADER} from "../../config/constants"

jest.mock("@monorepo/utils", () => ({
    getSettingsHeaders: jest.fn(() => ({myHeader: "test 2"})),
}))

const mockDispatch = jest.fn()
const mockStore = {
    dispatch: mockDispatch,
}

const mockRequest = {
    siteUrl: {url: "www.test.co.uk"},
    headers: {myHeader: "test 2"},
    originalUrl: "/search?w=red",
    query: {
        w: "TEST SEARCH TERM",
    },
}

const mockSettingConfig = {
    [SettingsSdkKeys.TerritoryDescription]: {
        Value: "United Kingdom",
    },
    [SettingsSdkKeys.BloomreachPersonalizationCookies]: {
        bloomreachPersonalizationEnabled: false,
    },
}

const expectedRequest = {
    url: "www.test.co.uk/search?w=red",
    siteUrl: "www.test.co.uk",
    headers: {myHeader: "test 2"},
    category: "",
    gender: null,
    searchTerm: "TEST SEARCH TERM",
    territoryName: "United Kingdom",
    type: SearchApiRequestTypes.Keyword,
    useDevEsi: false,
    viewportSize: "desktop",
    bloomreachPersonalizationEnabled: false,
}

const initialState = {
    headers: {},
    category: null,
    gender: null,
    siteUrl: "",
    url: "",
    page: 1,
    searchTerm: null,
    territoryName: "",
    type: SearchApiRequestTypes.Category,
    useDevEsi: false,
    viewportSize: "",
    bloomreachPersonalizationEnabled: false,
}

const expectedState = {
    headers: {myHeader: "test 2"},
    siteUrl: "www.test.co.uk",
    category: "",
    gender: null,
    url: "www.test.co.uk/search?w=red",
    searchTerm: "TEST SEARCH TERM",
    territoryName: "United Kingdom",
    type: SearchApiRequestTypes.Keyword,
    useDevEsi: false,
    viewportSize: "desktop",
    bloomreachPersonalizationEnabled: false,
}

describe("reducers: request", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    request: null as any,
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
                    request: null as any,
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with ASSIGN_REQUEST_STATE", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: ASSIGN_REQUEST_STATE,
                    state: {...initialState, viewportSize: "xl"},
                }),
            ).toEqual({
                ...initialState,
                viewportSize: "xl",
            })
        })
    })
    describe("When called with SET_REQUEST", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_REQUEST,
                    request: {...expectedRequest, page: "5"},
                }),
            ).toEqual({
                ...expectedState,
                page: parsePageParam("5"),
            })
        })
    })
})

describe("Request - setRequestAction()", () => {
    describe("When called without viewportSizeHeader", () => {
        beforeAll(() => {
            updateRequest(mockStore as any, mockRequest, mockSettingConfig)
        })
        it("should call dispatch with a set request action with default viewport size to desktop", () => {
            expect(mockDispatch).toBeCalledWith({
                type: SET_REQUEST,
                request: expectedRequest,
            })
        })

        it("should call getSettingsHeaders", () => {
            expect(getSettingsHeaders).toBeCalledWith(mockRequest.headers)
        })
    })
    describe("When called With viewportSize Header", () => {
        beforeAll(() => {
            const newMockRequest = {
                ...mockRequest,
                headers: {...mockRequest.headers, "x-monorepo-viewport-size": "tablet"},
                originalUrl: "/shop/gender-women-productaffiliation-coatsandjackets",
            }
            updateRequest(mockStore as any, newMockRequest, mockSettingConfig)
        })
        it("should call dispatch with a set request action with viewportSize as tablet", () => {
            expect(mockDispatch).toBeCalledWith({
                type: SET_REQUEST,
                request: {
                    ...expectedRequest,
                    viewportSize: "tablet",
                    type: "Category",
                    category: "Coatsandjackets",
                    gender: ["women"],
                    url: "www.test.co.uk/shop/gender-women-productaffiliation-coatsandjackets",
                },
            })
        })

        it("should call getSettingsHeaders", () => {
            expect(getSettingsHeaders).toBeCalledWith(mockRequest.headers)
        })
    })
})

describe("Given `parsePageParam`", () => {
    describe("When called with nothing", () => {
        it("should return 1", () => {
            expect(parsePageParam()).toBe(1)
        })
    })
    describe("When the value is not an integer string", () => {
        it("should return 1", () => {
            expect(parsePageParam("f")).toBe(1)
            expect(parsePageParam(";")).toBe(1)
            expect(parsePageParam("3.2")).toBe(1)
        })
    })

    describe("When the value is less than 1", () => {
        it("should return 1", () => {
            expect(parsePageParam("0")).toBe(1)
            expect(parsePageParam("-1")).toBe(1)
        })
    })

    describe("When value is an integer", () => {
        it("should return the value as a number", () => {
            expect(parsePageParam("5")).toBe(5)
        })
    })
})

describe("Given `selectRequestedPage`", () => {
    it("should return the requested page", () => {
        const state = {request: {...initialState, page: 6}} as State
        const result = selectRequestedPage(state)
        expect(result).toBe(6)
    })
})

describe("Given `selectRealm`", () => {
    it("should return the `realm` header value", () => {
        const state = ({
            request: {
                ...initialState,
                headers: {
                    [REALM_HEADER]: "foo-realm",
                },
            },
        } as any) as State
        expect(selectRealm(state)).toBe("foo-realm")
    })
})

describe("Given `selectTerritory`", () => {
    it("should return the `territory` header value", () => {
        const state = ({
            request: {
                ...initialState,
                headers: {
                    [TERRITORY_HEADER]: "foo-territory",
                },
            },
        } as any) as State
        expect(selectTerritory(state)).toBe("foo-territory")
    })
})
