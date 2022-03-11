import {Store} from "redux"
import reducer, {
    SET_LAZYLOAD_CONFIG,
    updateLazyloadColourchips,
    setEnableColourchips,
    selectColourChipsLazyLoadEnabled,
    selectProductLazyLoadEnabled,
} from "."

const mockStoreDispatch = jest.fn()
const store = {dispatch: mockStoreDispatch} as unknown as Store

const mockConfiguration = {
    "productsummary.frontend.lazyloadConfig": {
        Value: {
            colourchips: true,
            fitIcons: false,
        },
    },
}

const initialState = {
    colourchips: false,
    productImages: false,
    fitIcons: false,
}

describe("reducers: lazyload", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: null as any,
                    lazyloadConfig: {
                        colourchips: true,
                        productImages: false,
                        fitIcons: false,
                    },
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with SET_LAZYLOAD_CONFIG", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_LAZYLOAD_CONFIG,
                    lazyloadConfig: {
                        colourchips: true,
                        productImages: false,
                        fitIcons: false,
                    },
                }),
            ).toEqual({
                colourchips: true,
                productImages: false,
                fitIcons: false,
            })
        })
    })
})

describe("Store: updateLazyloadColourchips() - ", () => {
    it("should set the redux store colourchips as true", () => {
        jest.clearAllMocks()
        updateLazyloadColourchips(store, mockConfiguration)
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_LAZYLOAD_CONFIG,
            lazyloadConfig: {
                colourchips: true,
                fitIcons: false,
            },
        })
    })
    it("should set the redux store initial state", () => {
        jest.clearAllMocks()
        updateLazyloadColourchips(store, {
            "productsummary.frontend.lazyloadConfig": {},
        })
        expect(mockStoreDispatch).toHaveBeenCalled()
        expect(mockStoreDispatch).toHaveBeenCalledWith({
            type: SET_LAZYLOAD_CONFIG,
            lazyloadConfig: {
                colourchips: false,
                productImages: false,
                fitIcons: false,
            },
        })
    })
})

describe("Store: setEnableColourchips() ", () => {
    it("should call the setEnableColourchips with the data from feature settings", () => {
        expect(
            setEnableColourchips({
                colourchips: true,
                fitIcons: true,
            }),
        ).toEqual({
            type: SET_LAZYLOAD_CONFIG,
            lazyloadConfig: {
                colourchips: true,
                fitIcons: true,
            },
        })
    })
})

describe("Given the selector selectColourChipsLazyLoadEnabled", () => {
    it("should return the lazy load state", () => {
        const state = {
            lazyload: {
                colourchips: false,
            },
        } as any

        expect(selectColourChipsLazyLoadEnabled(state)).toBe(false)
    })
})
describe("Given the selector selectProductLazyLoadEnabled", () => {
    it("should return the lazy load state", () => {
        const state = {
            lazyload: {
                productImages: true,
            },
        } as any

        expect(selectProductLazyLoadEnabled(state)).toBe(true)
    })
})
