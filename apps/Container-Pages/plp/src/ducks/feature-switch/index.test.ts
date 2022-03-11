import {Store} from "redux"
import reducer, {SET_FEATURE_SWITCH, updateFeatureSwitch, setFeatureSwitch} from "."

const mockStoreDispatch = jest.fn()
const store = ({dispatch: mockStoreDispatch} as unknown) as Store

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
    warn: jest.fn(),
}))

const initialState = {
    enablePageInFilters: false,
    overrideSeo: {
        metadata: false,
        headings: false,
    },
    enableSearchBanners: false,
    enableTooltips: false,
}
const mockResponse = {
    locals: {
        configuration: {
            "monorepo.plp.frontend.featureSwitch": {
                enablePageInFilters: {
                    Value: true,
                },
                overrideSeo: {
                    metadata: true,
                    headings: true,
                },
                enableSearchBanners: {
                    Value: true,
                },
                enableTooltips: true,
            },
        },
    },
}

describe("reducers: feature-switch", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: "TEST" as any,
                    featureSwitchData: {
                        enablePageInFilters: false,
                        overrideSeo: {
                            metadata: false,
                            headings: false,
                        },
                        enableSearchBanners: false,
                        enableTooltips: false,
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
                    featureSwitchData: {
                        enablePageInFilters: false,
                        overrideSeo: {
                            metadata: false,
                            headings: false,
                        },
                        enableSearchBanners: false,
                        enableTooltips: false,
                    },
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_FEATURE_SWITCH", () => {
        const expectedState = {
            enablePageInFilters: true,
            overrideSeo: {
                metadata: true,
                headings: true,
            },
            enableSearchBanners: true,
            enableTooltips: true,
        }
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_FEATURE_SWITCH,
                    featureSwitchData: {
                        enablePageInFilters: true,
                        overrideSeo: {
                            metadata: true,
                            headings: true,
                        },
                        enableSearchBanners: true,
                        enableTooltips: true,
                    },
                }),
            ).toEqual({
                ...expectedState,
            })
        })
    })

    describe("Given setFeatureSwitch", () => {
        it("should create a SET_FEATURE_SWITCH action", () => {
            const data = {
                enablePageInFilters: false,
                overrideSeo: {
                    metadata: true,
                    headings: true,
                },
                enableSearchBanners: false,
                enableTooltips: true,
            }
            expect(setFeatureSwitch(data)).toEqual({type: SET_FEATURE_SWITCH, featureSwitchData: data})
        })
    })

    describe("Store: Helpers: updateFeatureSwitch() - ", () => {
        beforeEach(() => {
            jest.clearAllMocks()
        })
        describe("When updateFeatureSwitch is called", () => {
            it("should call dispatch be called with SET_FEATURE_SWITCH ", () => {
                updateFeatureSwitch(store, mockResponse.locals.configuration)
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_FEATURE_SWITCH,
                    featureSwitchData: {
                        enablePageInFilters: {
                            Value: true,
                        },
                        overrideSeo: {
                            metadata: true,
                            headings: true,
                        },
                        enableSearchBanners: {
                            Value: true,
                        },
                        enableTooltips: true,
                    },
                })
            })
        })
    })
})
