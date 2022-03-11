import React from "react"
import * as ReactRedux from "react-redux"
import {renderHook} from "@testing-library/react-hooks"
import configureMockStore from "redux-mock-store"

import useGTMOnHydrate from "."
import mockStore from "../../../__mocks__/mockStore"
import {onPageLoadGtmTrigger} from "../../utils/onPageLoadGtmTrigger"
import State from "../../models/state"
import {Fits, ProductType} from "../../config/constants"
import * as featureSwitch from "../../utils/featureSwitch"
import text from "../../../__mocks__/default-text.json"

jest.mock("../../utils/featureSwitch", () => ({
    doGoogleAnalytics: jest.fn(() => true),
}))

jest.mock("../../utils/onPageLoadGtmTrigger", () => ({
    __esModule: true,
    onPageLoadGtmTrigger: jest.fn(),
}))

const mockScenario = () => {
    jest.spyOn(ReactRedux, "useSelector")
    const wrapper = ({children}) => <ReactRedux.Provider store={mockStore}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => useGTMOnHydrate(), {wrapper})
    return hook
}

const mockStoreWithSalesPrice: State = {
    textAlignment: "ltr",
    productSummary: {
        summaryData: {
            title: "My Product",
            currencyCode: "GBP",
            id: "00000",
            baseUrl: "http://test.co.uk",
            imageCdnUrl: "http://testcdn.co.uk",
            productImageUrlPart: "search",
            showNewIn: false,
            saleSash: null,
            saleSashPosition: null,
            colourways: [
                {
                    title: "White",
                    fits: [Fits.Tall],
                    id: "99434296",
                    colour: "White",
                    url: "g5990s21/845632#845632",
                    selected: true,
                    price: "£123",
                    salePrice: "£1 - £2",
                    wasPrice: null,
                    overallStarRating: 3,
                    colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                    mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    personalisedType: "",
                    minPrice: "",
                },
            ],
            brand: "",
            department: "shirts",
            type: ProductType,
        },
        canLoadVisibleColourways: false,
        hasLoadedVisibleColourways: false,
        isFav: false,
        enableFav: false,
        showFavErrorToolTip: null,
        enabledSearchDesc: false,
        isLoadingFav: false,
        animateFavouriteIcon: false,
        enableReviewStars: false,
        enableBrandDisplay: false,
    },
    lazyload: {
        colourchips: false,
        productImages: false,
        fitIcons: false,
    },
    request: {
        headers: {"x-monorepo-language": "en"},
        isEnglishLang: true,
    },
    text,
}

const mockStoreWithMMade2Measure: State = {
    textAlignment: "ltr",
    productSummary: {
        summaryData: {
            title: "My Product",
            currencyCode: "GBP",
            id: "00000",
            baseUrl: "http://test.co.uk",
            imageCdnUrl: "http://testcdn.co.uk",
            productImageUrlPart: "search",
            showNewIn: false,
            saleSash: null,
            saleSashPosition: null,
            colourways: [
                {
                    title: "White",
                    fits: [Fits.Tall],
                    id: "99434296",
                    colour: "White",
                    url: "g5990s21/845632#845632",
                    selected: true,
                    price: "£123",
                    salePrice: null,
                    wasPrice: null,
                    overallStarRating: 3,
                    colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                    mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    personalisedType: "madeToMeasure",
                    minPrice: "£50",
                },
            ],
            brand: "",
            department: "shirts",
            type: ProductType,
        },
        canLoadVisibleColourways: false,
        hasLoadedVisibleColourways: false,
        isFav: false,
        enableFav: false,
        showFavErrorToolTip: null,
        enabledSearchDesc: false,
        isLoadingFav: false,
        animateFavouriteIcon: false,
        enableReviewStars: false,
        enableBrandDisplay: false,
    },
    lazyload: {
        colourchips: false,
        productImages: false,
        fitIcons: false,
    },
    request: {
        headers: {"x-monorepo-language": "en"},
        isEnglishLang: true,
    },
    text,
}

const mockStoreNoColourways: State = {
    textAlignment: "ltr",
    productSummary: {
        summaryData: {
            title: "My Product",
            currencyCode: "GBP",
            id: "00000",
            baseUrl: "http://test.co.uk",
            imageCdnUrl: "http://testcdn.co.uk",
            productImageUrlPart: "search",
            showNewIn: false,
            saleSash: null,
            saleSashPosition: null,
            colourways: [],
            brand: "",
            department: "shirts",
            type: ProductType,
        },
        canLoadVisibleColourways: false,
        hasLoadedVisibleColourways: false,
        isFav: false,
        enableFav: false,
        showFavErrorToolTip: null,
        enabledSearchDesc: false,
        isLoadingFav: false,
        animateFavouriteIcon: false,
        enableReviewStars: false,
        enableBrandDisplay: false,
    },
    lazyload: {
        colourchips: false,
        productImages: false,
        fitIcons: false,
    },
    request: {
        headers: {"x-monorepo-language": "en"},
        isEnglishLang: true,
    },
    text,
}

const mockStoreNoProductSummary: any = {
    textAlignment: "ltr",
    lazyload: {
        colourchips: false,
        productImages: false,
        fitIcons: false,
    },
}

const mockScenarioNoColourwaysData = () => {
    jest.spyOn(ReactRedux, "useSelector")
    const mockConfigureStore = configureMockStore()
    const mockState = mockConfigureStore(mockStoreNoColourways)
    const wrapper = ({children}) => <ReactRedux.Provider store={mockState}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => useGTMOnHydrate(), {wrapper})
    return hook
}

const mockScenarioNoProductSummaryData = () => {
    jest.spyOn(ReactRedux, "useSelector")
    const mockConfigureStore = configureMockStore()
    const mockState = mockConfigureStore(mockStoreNoProductSummary)
    const wrapper = ({children}) => <ReactRedux.Provider store={mockState}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => useGTMOnHydrate(), {wrapper})
    return hook
}

const mockScenarioWithSalesPrice = () => {
    jest.spyOn(ReactRedux, "useSelector")
    const mockConfigureStore = configureMockStore()
    const mockState = mockConfigureStore(mockStoreWithSalesPrice)
    const wrapper = ({children}) => <ReactRedux.Provider store={mockState}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => useGTMOnHydrate(), {wrapper})
    return hook
}

const mockScenarioWithMadeToMeasure = () => {
    jest.spyOn(ReactRedux, "useSelector")
    const mockConfigureStore = configureMockStore()
    const mockState = mockConfigureStore(mockStoreWithMMade2Measure)
    const wrapper = ({children}) => <ReactRedux.Provider store={mockState}>{children}</ReactRedux.Provider>
    const hook = renderHook(() => useGTMOnHydrate(), {wrapper})
    return hook
}

describe("given a useGTMOnHydrate", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should not call onPageLoadGtmTrigger when gtm isn't loaded", () => {
        jest.spyOn(featureSwitch, "doGoogleAnalytics").mockImplementationOnce(() => {
            return false
        })
        mockScenario()
        expect(onPageLoadGtmTrigger).not.toHaveBeenCalled()
    })

    it("should trigger 'onPageLoad' event with the right parameters", () => {
        const props = {
            productId: "99434296",
            productTitle: "White",
            price: "123",
            colour: "White",
            currencyCode: "GBP",
            department: "menswear",
            searchKeyword: "menswear",
        }

        mockScenario()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(onPageLoadGtmTrigger).toHaveBeenCalledWith(props)
    })

    it("should trigger 'onPageLoad' event with the right parameters when there is a sale", () => {
        const props = {
            productId: "99434296",
            productTitle: "White",
            price: "1-2",
            colour: "White",
            currencyCode: "GBP",
            department: "shirts",
            searchKeyword: "shirts",
        }

        mockScenarioWithSalesPrice()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(onPageLoadGtmTrigger).toHaveBeenCalledWith(props)
    })

    it("should trigger 'onPageLoad' event with the right parameters when the product is madeToMeasure", () => {
        const props = {
            productId: "99434296",
            productTitle: "White",
            price: "From £50",
            colour: "White",
            currencyCode: "GBP",
            department: "shirts",
            searchKeyword: "shirts",
        }

        mockScenarioWithMadeToMeasure()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(onPageLoadGtmTrigger).toHaveBeenCalledWith(props)
    })

    it("should not trigger 'onPageLoad' event without colourways information", () => {
        mockScenarioNoColourwaysData()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(onPageLoadGtmTrigger).not.toHaveBeenCalled()
    })

    it("should not trigger 'onPageLoad' event without productSummary information", () => {
        mockScenarioNoProductSummaryData()
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(onPageLoadGtmTrigger).not.toHaveBeenCalled()
    })
})
