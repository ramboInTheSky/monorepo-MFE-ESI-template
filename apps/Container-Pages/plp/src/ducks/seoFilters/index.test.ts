import {Store} from "redux"
import reducer, {SET_SEO_FILTERS_CONFIG, updateSeoFiltersConfig, setSeoFiltersConfig} from "."

const mockStoreDispatch = jest.fn()
const store = ({dispatch: mockStoreDispatch} as unknown) as Store

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const initialState = {
    filterDepthCount: 0,
}
const mockResponse = {
    locals: {
        configuration: {
            "monorepo.plp.frontend.seoFilters": {
                filterDepthCount: 6,
            },
        },
    },
}

describe("reducers: seo filters config", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    seoFilterConfigData: {
                        filterDepthCount: 6,
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
                    seoFilterConfigData: {
                        filterDepthCount: 6,
                    },
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_SEO_FILTERS_CONFIG", () => {
        const expectedState = {
            filterDepthCount: 6,
        }
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_SEO_FILTERS_CONFIG,
                    seoFilterConfigData: {
                        filterDepthCount: 6,
                    },
                }),
            ).toEqual({
                ...expectedState,
            })
        })
    })

    describe("Given set seo filters config", () => {
        it("should create a SET_SEO_FILTERS_CONFIG action", () => {
            const data = {
                filterDepthCount: 6,
            }
            expect(setSeoFiltersConfig(data)).toEqual({type: SET_SEO_FILTERS_CONFIG, seoFilterConfigData: data})
        })
    })

    describe("Store: Helpers: updateFeatureSwitch() - ", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })
        describe("When updateSeoFiltersConfig is called", () => {
            it("should call dispatch be called with SET_SEO_FILTERS_CONFIG ", () => {
                updateSeoFiltersConfig(store, mockResponse.locals.configuration)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_SEO_FILTERS_CONFIG,
                    seoFilterConfigData: {
                        filterDepthCount: 6,
                    },
                })
            })
        })
    })
})
