import configureMockStore from "redux-mock-store"
import {mockColors} from "@monorepo/themes"
import State from "../src/models/state"
import {Fits, ProductType, SofaType} from "../src/config/constants"
import text from "./default-text.json"

export const mockState: State = {
    text,
    textAlignment: "ltr",
    productSummary: {
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
                    minPrice: "£123",
                    overallStarRating: 0,
                    colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                    mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    personalisedType: "Test",
                },
                {
                    title: "Black",
                    fits: [Fits.Tall, Fits.Petite],
                    id: "434296",
                    colour: "Black",
                    url: "g5990s21/845632#845632",
                    selected: false,
                    price: "£99",
                    salePrice: null,
                    wasPrice: null,
                    minPrice: "£99",
                    overallStarRating: 4,
                    colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/434296.jpg",
                    mainImage: "http://testcdn.co.uk/search/224x336/434296.jpg",
                    personalisedType: "Test",
                },
            ],
            type: ProductType,
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
}

export const mockStateSofa: State = {
    ...mockState,
    productSummary: {
        ...mockState.productSummary,
        summaryData: {
            title: "Jackson",
            id: "jackson_82_262919",
            brand: "",
            department: "homeware",
            fit: "",
            currencyCode: "GBP",
            baseUrl: "http://test.co.uk",
            imageCdnUrl: "http://testcdn.co.uk",
            productImageUrlPart: "search",
            showNewIn: false,
            saleSash: null,
            saleSashPosition: null,
            type: SofaType,
            colourways: [
                {
                    title: "Sofa 1",
                    fits: [],
                    id: "jackson_82_262919",
                    colour: "Chunky Weave/Dove",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-chunky-weave-dove",
                    selected: true,
                    price: "£775 - £1,350",
                    salePrice: null,
                    wasPrice: null,
                    minPrice: "£775",
                    mainImage: "http://testcdn.co.uk/262919_82.jpg",
                    colourChipImage: "http://testcdn.co.uk/SofaSwatchView/chunkyweave_dove.jpg",
                    overallStarRating: 0,
                    personalisedType: "",
                },
                {
                    title: "Sofa 2",
                    fits: [],
                    id: "jackson_82_202546",
                    colour: "Monza Faux Leather/Charcoal",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-monza-faux-leather-charcoal",
                    selected: false,
                    price: "£775 - £1,350",
                    salePrice: null,
                    wasPrice: null,
                    minPrice: "£775",
                    mainImage: "http://testcdn.co.uk/202546_82.jpg",
                    colourChipImage: "http://testcdn.co.uk/SofaSwatchView/monzafauxleather_charcoal.jpg",
                    overallStarRating: 0,
                    personalisedType: "",
                },
                {
                    title: "Sofa 3",
                    fits: [],
                    id: "jackson_82_286382",
                    colour: "Matt Velvet/Navy Jackson",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-matt-velvet-navy",
                    selected: false,
                    price: "£775 - £1,350",
                    salePrice: null,
                    wasPrice: null,
                    minPrice: "£775",
                    mainImage: "http://testcdn.co.uk/286382_82.jpg",
                    colourChipImage: "http://testcdn.co.uk/SofaSwatchView/mattvelvet_navy.jpg",
                    overallStarRating: 0,
                    personalisedType: "",
                },
            ],
        },
    },
}

export const mockTextAlignment = {Value: "ltr"}

export const mockTheme = {colours: mockColors, direction: "ltr", enablingCenteredContent: false}
export const centralisedMockTheme = {colours: mockColors, direction: "ltr", enablingCenteredContent: true}
const mockConfigureStore = configureMockStore()
const mockStore = mockConfigureStore(mockState)

export default mockStore
