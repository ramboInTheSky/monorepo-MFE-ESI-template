import {rootReducer, makeStore} from "."
import {mockState} from "../../__mocks__/mockStore"
import {SET_TEXT_ALIGNMENT} from "./text-alignment"
import {Fits} from "../config/constants"

jest.mock("./lazyload", () => () => ({
    colourchips: false,
    productImages: false,
    fitIcons: false,
}))
jest.mock("./text-alignment", () => () => "ltr")
jest.mock("./productSummary", () => () => ({
    summaryData: {
        title: "My Product",
        id: "00000",
        brand: "nike",
        department: "menswear",
        fit: "tall",
        currencyCode: "GBP",
        baseUrl: "http://test.co.uk",
        imageCdnUrl: "http://testcdn.co.uk",
        productImageUrlPart: "search",
        showNewIn: false,
        saleSash: null,
        saleSashPosition: null,
        type: "product",        
        colourways: [
            {
                fits: ["Tall"],
                id: "99434296",
                title: "White",
                colour: "White",
                url: "g5990s21/845632#845632",
                selected: true,
                price: "£123",
                salePrice: null,
                wasPrice: null,
                overallStarRating: 0,
                colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                minPrice: "£123",
                personalisedType: "Test"
            },
            {
                fits: ["Tall" as Fits, "Petite" as Fits],
                id: "434296",
                title: "Black",
                colour: "Black",
                url: "g5990s21/845632#845632",
                selected: false,
                price: "£99",
                salePrice: null,
                wasPrice: null,
                overallStarRating: 4,
                colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/434296.jpg",
                mainImage: "http://testcdn.co.uk/search/224x336/434296.jpg",
                minPrice: "£99",
                personalisedType: "Test"
            },
        ],
    },
    canLoadVisibleColourways: false,
    hasLoadedVisibleColourways: false,
    isFav: false,
    enableFav: false,
    enableReviewStars: false,
    showFavErrorToolTip: null,
    enabledSearchDesc: false,
    isLoadingFav: false,
    animateFavouriteIcon: false,
    enableBrandDisplay: false,
}))

const expectedInitialState = mockState

describe("combined reducers", () => {
    it("generates the correct state", () => {
        const result = rootReducer(
            {
                textAlignment: mockState.textAlignment,
                productSummary: mockState.productSummary,
                lazyload: mockState.lazyload,
                request: mockState.request,
                text: mockState.text,
            },
            {
                type: SET_TEXT_ALIGNMENT,
                textAlignment: "ltr",
            },
        )
        expect(result).toEqual(expectedInitialState)
    })

    describe("Store => makeStore ", () => {
        it("Genereates the store correctly with no errors", () => {
            const store = makeStore(expectedInitialState)
            const initialState = store.getState()
            expect(initialState).toEqual(expectedInitialState)
        })
    })
})
