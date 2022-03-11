import logger from "@monorepo/core-logger"

import reducer, {
    SET_SUMMARY_DATA,
    updateProductSummary,
    SET_SELECTED_COLOURWAY,
    setSelectedColourwayAction,
    selectCanLoadVisibleColourways,
    updateFavourites,
    ENABLE_FAV,
    updateEnablingFavourites,
    SHOW_FAV_ERROR_TOOLTIP,
    SET_ENABLE_SEARCH_DESCRIPTION,
    SET_LOADING_FAV,
    SET_FAVOURITED_COLOURWAYS,
    getProductId,
    SET_ANIMATE_FAVOURITE_ICON,
    updateEnablingReviewStars,
    SET_ENABLE_REVIEW_STARS,
    updateEnablingBrandDisplay,
    SET_ENABLE_BRAND_DISPLAY,
} from "."
import {FavErrorToolTipType, ProductSummaryState} from "../../models/ProductSummary"
import {mockState} from "../../../__mocks__/mockStore"
import {Fits, FAV_ADD, FAV_REMOVE} from "../../config/constants"
import * as ProductSummaryApi from "../../api/getProductSummary"
import {PublishTrackEvent} from "../../events/gtm/trackEvent"

const mockStoreDispatch = jest.fn()

const initialState: ProductSummaryState = {
    summaryData: {
        colourways: [],
        id: "",
        currencyCode: "",
        title: "",
        brand: "",
        department: "",
        fit: "",
        baseUrl: "",
        imageCdnUrl: "",
        productImageUrlPart: "",
        showNewIn: false,
        saleSash: null,
        saleSashPosition: null,
        type: "product",
    },
    isFav: false,
    canLoadVisibleColourways: false,
    hasLoadedVisibleColourways: false,
    enableFav: false,
    enableReviewStars: false,
    showFavErrorToolTip: null,
    enabledSearchDesc: false,
    isLoadingFav: false,
    animateFavouriteIcon: false,
    enableBrandDisplay: false,
}

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
jest.mock("../../events/gtm/trackEvent", () => ({
    PublishTrackEvent: jest.fn(),
}))

describe("reducers: product summary", () => {
    describe("When called initially with no store", () => {
        it(`should return the initial state`, () => {
            expect(
                reducer(undefined, {
                    type: null as any,
                    data: null as any,
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
                    type: null as any,
                    data: null as any,
                }),
            ).toEqual({
                ...initialState,
            })
        })
    })

    describe("When called with ENABLE_FAV", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: ENABLE_FAV,
                    enableFav: true,
                }),
            ).toEqual({
                ...initialState,
                enableFav: true,
            })
        })
    })
    describe("When called with SET_ENABLE_REVIEW_STARS", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_ENABLE_REVIEW_STARS,
                    enableReviewStars: true,
                }),
            ).toEqual({
                ...initialState,
                enableReviewStars: true,
            })
        })
    })
    describe("When called with SET_ENABLE_BRAND_DISPLAY", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_ENABLE_BRAND_DISPLAY,
                    enableBrandDisplay: true,
                }),
            ).toEqual({
                ...initialState,
                enableBrandDisplay: true,
            })
        })
    })
    describe("When called with SET_ENABLE_SEARCH_DESCRIPTION", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_ENABLE_SEARCH_DESCRIPTION,
                    enabledSearchDesc: true,
                }),
            ).toEqual({
                ...initialState,
                enabledSearchDesc: true,
            })
        })
    })
    describe("When called with SET_LOADING_FAV", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_LOADING_FAV,
                    isLoadingFav: true,
                }),
            ).toEqual({
                ...initialState,
                isLoadingFav: true,
            })
        })
    })
    describe("When called with SET_ANIMATE_FAVOURITE_ICON", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_ANIMATE_FAVOURITE_ICON,
                    animateFavouriteIcon: true,
                }),
            ).toEqual({
                ...initialState,
                animateFavouriteIcon: true,
            })
        })
    })

    describe("When called with SET_FAVOURITED_COLOURWAYS", () => {
        const stateWithColourWays: any = {
            ...initialState,
            summaryData: {
                ...initialState.summaryData,
                colourways: [
                    {
                        id: "clw1",
                        selected: true,
                    },
                ],
            },
        }
        it(`should update the state`, () => {
            expect(
                reducer(stateWithColourWays, {
                    type: SET_FAVOURITED_COLOURWAYS,
                    favouritedColourways: ["clw1"],
                }),
            ).toEqual({
                ...initialState,
                summaryData: {
                    ...initialState.summaryData,
                    colourways: [
                        {
                            id: "clw1",
                            isFav: true,
                            selected: true,
                        },
                    ],
                },
                isFav: true,
            })
        })
    })
    describe("When called with SHOW_FAV_ERROR_TOOLTIP", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SHOW_FAV_ERROR_TOOLTIP,
                    errorType: FavErrorToolTipType.MaxLimit,
                }),
            ).toEqual({
                ...initialState,
                showFavErrorToolTip: FavErrorToolTipType.MaxLimit,
            })
        })
    })
    describe("When called with SHOW_FAV_ERROR_TOOLTIP type error", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SHOW_FAV_ERROR_TOOLTIP,
                    errorType: FavErrorToolTipType.Error,
                }),
            ).toEqual({
                ...initialState,
                showFavErrorToolTip: FavErrorToolTipType.Error,
            })
        })
    })
    describe("When called with SET_PRODUCT_SUMMARY_DATA", () => {
        it(`should update the state`, () => {
            expect(
                reducer(initialState, {
                    type: SET_SUMMARY_DATA,
                    data: mockState.productSummary.summaryData,
                }),
            ).toEqual({
                ...mockState.productSummary,
            })
        })
    })

    describe("When called with SET_SELECTED_COLOURWAY", () => {
        it(`should update the state`, () => {
            const previousState: ProductSummaryState = {
                summaryData: {
                    title: "My Product",
                    currencyCode: "GBP",
                    id: "00000",
                    baseUrl: "http://test.co.uk",
                    imageCdnUrl: "http://testcdn.co.uk",
                    brand: "nike",
                    department: "menswear",
                    fit: "tall",
                    productImageUrlPart: "Search",
                    showNewIn: false,
                    saleSash: null,
                    saleSashPosition: null,
                    colourways: [
                        {
                            title: "White",
                            fits: ["Tall" as Fits],
                            id: "99434296",
                            colour: "White",
                            url: "g5990s21/845632#845632",
                            selected: true,
                            price: "£30",
                            salePrice: null,
                            wasPrice: null,
                            overallStarRating: 0,
                            colourChipImage: "",
                            mainImage: "",
                            personalisedType: "",
                            minPrice: "",
                        },
                        {
                            title: "Black",
                            fits: ["Tall" as Fits, "Short" as Fits],
                            id: "434296",
                            colour: "Black",
                            url: "g5990s21/845632#845632",
                            selected: false,
                            price: "£30",
                            salePrice: null,
                            wasPrice: null,
                            overallStarRating: 4,
                            colourChipImage: "",
                            mainImage: "",
                            personalisedType: "",
                            minPrice: "",
                        },
                    ],
                    type: "product",
                },
                isFav: false,
                canLoadVisibleColourways: false,
                hasLoadedVisibleColourways: false,
                enableFav: false,
                enableReviewStars: false,
                showFavErrorToolTip: null,
                enabledSearchDesc: false,
                isLoadingFav: false,
                animateFavouriteIcon: false,
                enableBrandDisplay: false,
            }

            const expectedState: ProductSummaryState = {
                summaryData: {
                    title: "My Product",
                    currencyCode: "GBP",
                    id: "00000",
                    baseUrl: "http://test.co.uk",
                    brand: "nike",
                    department: "menswear",
                    fit: "tall",
                    imageCdnUrl: "http://testcdn.co.uk",
                    productImageUrlPart: "Search",
                    showNewIn: false,
                    saleSash: null,
                    saleSashPosition: null,
                    colourways: [
                        {
                            title: "White",
                            fits: ["Tall" as Fits],
                            id: "99434296",
                            colour: "White",
                            url: "g5990s21/845632#845632",
                            selected: false,
                            price: "£30",
                            salePrice: null,
                            wasPrice: null,
                            overallStarRating: 0,
                            colourChipImage: "",
                            mainImage: "",
                            personalisedType: "",
                            minPrice: "",
                        },
                        {
                            title: "Black",
                            fits: ["Tall" as Fits, "Short" as Fits],
                            id: "434296",
                            colour: "Black",
                            url: "g5990s21/845632#845632",
                            selected: true,
                            price: "£30",
                            salePrice: null,
                            wasPrice: null,
                            overallStarRating: 4,
                            colourChipImage: "",
                            mainImage: "",
                            personalisedType: "",
                            minPrice: "",
                        },
                    ],
                    type: "product",
                },
                isFav: false,
                canLoadVisibleColourways: true,
                hasLoadedVisibleColourways: true,
                enableFav: false,
                enableReviewStars: false,
                showFavErrorToolTip: null,
                enabledSearchDesc: false,
                isLoadingFav: false,
                animateFavouriteIcon: false,
                enableBrandDisplay: false,
            }

            expect(
                reducer(previousState, {
                    type: SET_SELECTED_COLOURWAY,
                    colourwayItemNumber: "434296",
                }),
            ).toEqual(expectedState)
        })
    })
})

describe("Store: updateProductSummary() ", () => {
    describe("When fetching product is successful", () => {
        describe("When loading products with disabled SearchDescription ", () => {
            beforeEach(async done => {
                jest.clearAllMocks()
                jest.spyOn(ProductSummaryApi, "getProductSummary").mockReturnValue({
                    response: mockState.productSummary.summaryData,
                    responseHeaders: {"last-modified": "test-last-modified", "edge-cache-tags": "test-edge-cache-tags"},
                } as any)
                const enableSearchDescription = false
                await updateProductSummary(
                    {dispatch: mockStoreDispatch} as any,
                    {
                        headers: {},
                        itemNumber: "123",
                        showNewIn: "true",
                        type: "product",
                    },
                    enableSearchDescription,
                )
                done()
            })
            it("should call the store dispatch SET_ENABLE_SEARCH_DESCRIPTION", () => {
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_ENABLE_SEARCH_DESCRIPTION,
                    enabledSearchDesc: false,
                })
            })
            it("should call the store dispatch SET_PRODUCT_SUMMARY_DATA", () => {
                expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_SUMMARY_DATA,
                    data: mockState.productSummary.summaryData,
                })
            })

            it("should set show new in from request", () => {
                expect(mockState.productSummary.summaryData.showNewIn).toEqual(true)
            })

            it("should have called the dispatch", () => {
                expect(mockStoreDispatch).toHaveBeenCalled()
            })
            it("should return the search api data", () => {
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    data: {
                        baseUrl: "http://test.co.uk",
                        brand: "nike",
                        colourways: [
                            {
                                colour: "White",
                                fits: ["Tall"],
                                id: "99434296",
                                price: "£123",
                                salePrice: null,
                                selected: true,
                                title: "White",
                                url: "g5990s21/845632#845632",
                                wasPrice: null,
                                overallStarRating: 0,
                                colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                                mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                                minPrice: "£123",
                                personalisedType: "Test",
                            },
                            {
                                colour: "Black",
                                fits: ["Tall", "Petite"],
                                id: "434296",
                                price: "£99",
                                salePrice: null,
                                selected: false,
                                title: "Black",
                                url: "g5990s21/845632#845632",
                                wasPrice: null,
                                overallStarRating: 4,
                                colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/434296.jpg",
                                mainImage: "http://testcdn.co.uk/search/224x336/434296.jpg",
                                minPrice: "£99",
                                personalisedType: "Test",
                            },
                        ],
                        department: "menswear",
                        fit: "tall",
                        id: "00000",
                        currencyCode: "GBP",
                        imageCdnUrl: "http://testcdn.co.uk",
                        productImageUrlPart: "search",
                        saleSash: null,
                        saleSashPosition: null,
                        showNewIn: true,
                        title: "My Product",
                        type: "product",
                    },
                    type: "SET_PRODUCT_SUMMARY_DATA",
                })
            })
        })
        describe("When loading products with enabled SearchDescription ", () => {
            beforeEach(async done => {
                jest.clearAllMocks()
                jest.spyOn(ProductSummaryApi, "getProductSummary").mockReturnValue({
                    response: mockState.productSummary.summaryData,
                    responseHeaders: {"last-modified": "test-last-modified", "edge-cache-tags": "test-edge-cache-tags"},
                } as any)
                const enableSearchDescription = true
                await updateProductSummary(
                    {dispatch: mockStoreDispatch} as any,
                    {
                        headers: {},
                        itemNumber: "123",
                        showNewIn: "true",
                        type: "product",
                    },
                    enableSearchDescription,
                )
                done()
            })
            it("should call the store dispatch", () => {
                // expect(mockStoreDispatch).toHaveBeenCalled()
                expect(mockStoreDispatch).toHaveBeenCalledTimes(2)
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    type: SET_SUMMARY_DATA,
                    data: mockState.productSummary.summaryData,
                })
            })

            it("should set show new in from request", () => {
                expect(mockState.productSummary.summaryData.showNewIn).toEqual(true)
            })

            it("should have called the dispatch", () => {
                expect(mockStoreDispatch).toHaveBeenCalled()
            })
            it("should return the search api data with title as empty string", () => {
                expect(mockStoreDispatch).toHaveBeenCalledWith({
                    enabledSearchDesc: true,
                    type: "SET_ENABLE_SEARCH_DESCRIPTION",
                })
            })
        })
    })

    describe("when fetching product fails", () => {
        beforeAll(async done => {
            jest.spyOn(logger, "error")
            jest.spyOn(ProductSummaryApi, "getProductSummary").mockRejectedValue("An error has occurred")
            const enableSearchDescription = false
            await updateProductSummary(
                {dispatch: mockStoreDispatch} as any,
                {
                    headers: {},
                    itemNumber: "123",
                    showNewIn: "true",
                    type: "suit",
                },
                enableSearchDescription,
            )
            done()
        })

        it("should dispatch an action to set product summary state", () => {
            expect(mockStoreDispatch).toHaveBeenCalledWith({
                type: SET_SUMMARY_DATA,
                data: initialState.summaryData,
            })
        })

        it("should log the error", () => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalledWith("An error has occurred")
        })
    })
})

describe("Store: setSelectedColourwayAction() ", () => {
    it("should create a select colourway action", () => {
        expect(setSelectedColourwayAction("1234")).toEqual({
            type: SET_SELECTED_COLOURWAY,
            colourwayItemNumber: "1234",
        })
    })
})

describe("Store: selectCanLoadVisibleColourways()", () => {
    it('should select from state "canLoadVisibleColourways" property', () => {
        expect(selectCanLoadVisibleColourways(mockState)).toBe(false)
    })
})

describe("Store: getProductId()", () => {
    it("should select productId", () => {
        expect(getProductId(mockState)).toBe("00000")
    })
})

describe("updateFavouritesInState()", () => {
    const favData = {
        success: true,
        data: {
            ShoppingListItems: [{ItemNumber: "1234"}],
        },
        status: 1,
        textStatus: "",
        eventId: "",
        errorMessage: "",
    }
    const getState = () => ({...mockState})
    beforeEach(() => {
        delete window.NextFavourites
    })
    it("should dispatch updateFavouritesInState when there is favourites", () => {
        const newFavData = {
            ...favData,
        }
        const mockDispatch = jest.fn()
        updateFavourites(newFavData, FAV_ADD)(mockDispatch, getState)

        expect(mockDispatch).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith({favouritedColourways: ["1234"], type: "SET_FAVOURITED_COLOURWAYS"})

        expect(mockDispatch).toHaveBeenCalledWith({
            isLoadingFav: false,
            type: SET_LOADING_FAV,
        })

        expect(PublishTrackEvent).toHaveBeenCalledWith("favourites", {
            event: "favourites",
            favourites: {
                action: "addFavourites",
                category: "favourites",
                label: "White tall My Product",
                option: "00000",
            },
        })
    })
    it("should return undefined when there is no favourites ", () => {
        const newFavData = {
            ...favData,
            data: {
                ShoppingListItems: [],
            },
        }
        const mockDispatch = jest.fn()
        expect(updateFavourites(newFavData, FAV_REMOVE)(mockDispatch, getState)).toBe(undefined)

        expect(PublishTrackEvent).toHaveBeenCalledWith("favourites", {
            event: "favourites",
            favourites: {
                action: "removeFromFavourites",
                category: "favourites",
                label: "White tall My Product",
                option: "00000",
            },
        })
    })
    it("should call the logger.error when api fails ", () => {
        const newFavData = {
            ...favData,
            success: false,
            data: null,
            errorMessage: "something Else",
        }
        const mockDispatch = jest.fn()
        updateFavourites(newFavData, FAV_ADD)(mockDispatch, getState)

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(logger.error).toHaveBeenCalled()

        expect(mockDispatch).toHaveBeenCalledWith({
            type: SHOW_FAV_ERROR_TOOLTIP,
            errorType: FavErrorToolTipType.Error,
        })

        expect(PublishTrackEvent).toHaveBeenCalledWith("favourites", {
            event: "favourites",
            favourites: {
                action: "errorAddFromFavourites",
                category: "favourites",
                label: "White tall My Product",
                option: "00000",
            },
        })
    })
    it("should call the logger.error when api fails when data is null", () => {
        const newFavData = {
            ...favData,
            success: false,
            data: null,
            errorMessage: "MaximumLimitExceeded",
        }
        const mockDispatch = jest.fn()
        updateFavourites(newFavData, FAV_REMOVE)(mockDispatch, getState)

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(logger.error).toHaveBeenCalled()

        expect(PublishTrackEvent).toHaveBeenCalledWith("favourites", {
            event: "favourites",
            favourites: {
                action: "errorRemoveFromFavourites",
                category: "favourites",
                label: "White tall My Product",
                option: "00000",
            },
        })
    })
})
describe("updateEnablingFavourites()", () => {
    it("should dispatch updateEnablingFavourites when favourites is disabled", () => {
        const enableFav = false
        const mockDispatch = jest.fn()
        updateEnablingFavourites(mockDispatch, enableFav)

        expect(mockDispatch).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith({enableFav: false, type: "ENABLE_FAV"})
    })
    it("should dispatch updateEnablingFavourites when favourites is enabled", () => {
        const enableFav = true
        const mockDispatch = jest.fn()
        updateEnablingFavourites(mockDispatch, enableFav)

        expect(mockDispatch).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith({enableFav: true, type: "ENABLE_FAV"})
    })
})
describe("updateEnablingReviewStars()", () => {
    it("should dispatch updateEnablingReviewStars when favourites is disabled", () => {
        const enableReviewStars = false
        const mockDispatch = jest.fn()
        updateEnablingReviewStars(mockDispatch, enableReviewStars)

        expect(mockDispatch).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith({enableReviewStars: false, type: SET_ENABLE_REVIEW_STARS})
    })
    it("should dispatch updateEnablingReviewStars when favourites is enabled", () => {
        const enableReviewStars = true
        const mockDispatch = jest.fn()
        updateEnablingReviewStars(mockDispatch, enableReviewStars)

        expect(mockDispatch).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith({enableReviewStars: true, type: SET_ENABLE_REVIEW_STARS})
    })
})

describe("updateEnablingBrandDisplay()", () => {
    it("should dispatch updateEnablingBrandDisplay when favourites is disabled", () => {
        const enableBrandDisplay = false
        const mockDispatch = jest.fn()
        updateEnablingBrandDisplay(mockDispatch, enableBrandDisplay)

        expect(mockDispatch).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith({enableBrandDisplay: false, type: SET_ENABLE_BRAND_DISPLAY})
    })
    it("should dispatch updateEnablingBrandDisplay when favourites is enabled", () => {
        const enableBrandDisplay = true
        const mockDispatch = jest.fn()
        updateEnablingBrandDisplay(mockDispatch, enableBrandDisplay)

        expect(mockDispatch).toHaveBeenCalled()
        expect(mockDispatch).toHaveBeenCalledWith({enableBrandDisplay: true, type: SET_ENABLE_BRAND_DISPLAY})
    })
})
