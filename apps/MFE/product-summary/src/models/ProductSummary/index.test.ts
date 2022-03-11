import {ProductSummaryState} from "."
import {Fits} from "../../config/constants"

describe("Model - ProductSummaryState: ", () => {
    const mockTestState: ProductSummaryState = {
        summaryData: {
            title: "My Product",
            id: "00000",
            brand: "nike",
            department: "menswear",
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
                    overallStarRating: 0,
                    colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                    mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    personalisedType: "",
                    minPrice: ""
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
                    overallStarRating: 0,
                    colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/434296.jpg",
                    mainImage: "http://testcdn.co.uk/search/224x336/434296.jpg",
                    personalisedType: "",
                    minPrice: ""
                },
            ],
            type: "product",
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
    }
    it("should match the ProductSummaryState", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
