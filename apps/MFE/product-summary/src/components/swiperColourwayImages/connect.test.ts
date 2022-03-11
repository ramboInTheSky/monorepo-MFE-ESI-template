import {mockState, mockStateSofa} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import {formatPdpLink, getToolTipTitleByType} from "../../utils/colourwayBuilders"
import {Fits, SaleSashPosition, SuitType} from "../../config/constants"
import text from "../../../__mocks__/default-text.json"

jest.mock("../../utils/colourwayBuilders", () => ({
    formatPdpLink: jest.fn(() => "test pdp link"),
    getToolTipTitleByType: jest.fn((type, _others) => `formatted test title type-${type}`),
    formatTitle: jest.fn(() => "test title"),
}))

describe("Given connect - mapStateToProps()", () => {
    let response
    beforeAll(() => {
        jest.clearAllMocks()
        response = mapStateToProps(mockState)
    })

    it("should call getToolTipTitleByType", () => {
        expect(getToolTipTitleByType).toHaveBeenCalledWith("product", {
            colourwayItemNumber: "99434296",
            defaultTitle: "test title",
            price: "£123",
            title: "White",
            salePrice: null,
            fit: "tall",
            selectedColourway: {
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
                personalisedType: "Test",
                colourChipImage: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                mainImage: "http://testcdn.co.uk/search/224x336/99434296.jpg",
            },
            isEnglishLang: true,
        })
    })

    it("should call formatPdpLink", () => {
        expect(formatPdpLink).toHaveBeenCalledWith(
            mockState.productSummary.summaryData.baseUrl,
            mockState.productSummary.summaryData.colourways[0].url,
        )
    })

    describe("When summary type is 'suit'", () => {
        let suitResponse
        beforeAll(() => {
            suitResponse = mapStateToProps({
                ...mockState,
                productSummary: {
                    ...mockState.productSummary,
                    summaryData: {...mockState.productSummary.summaryData, type: SuitType} as any,
                },
            })
        })

        it("should call getToolTipTitleByType", () => {
            setTimeout(() => {
                expect(getToolTipTitleByType).toHaveBeenCalledWith("suit", {
                    colourwayItemNumber: "99434296",
                    defaultTitle: "test title",
                    price: "£123",
                    title: "White",
                    salePrice: null,
                    fit: "tall",
                    selectedColourway: {
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
                    },
                    isEnglishLang: true,
                })
            }, 5000)
        })

        it("should project state and return expected data", () => {
            expect(suitResponse).toEqual({
                text,
                thumbsGallery: [
                    {
                        id: "99434296",
                        imageUrl: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        altText: "test title",
                    },
                    {
                        id: "434296",
                        imageUrl: "http://testcdn.co.uk/AltItemSwatch/21x21/434296.jpg",
                        altText: "test title",
                    },
                ],
                displayNewIn: false,
                fits: ["Tall"],
                isOnSale: false,
                showFitsIcons: false,
                slides: [
                    {
                        id: "99434296",
                        imageUrl: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                        tooltipTitle: "formatted test title type-suit",
                        linkUrl: "test pdp link",
                        lazyloadProductImages: false,
                        textTitle: "test title",
                        colour: "White",
                        price: "£123",
                        text,
                        currencyCode: "GBP",
                        department: "menswear",
                    },
                    {
                        id: "434296",
                        imageUrl: "http://testcdn.co.uk/search/224x336/434296.jpg",
                        tooltipTitle: "formatted test title type-suit",
                        linkUrl: "test pdp link",
                        lazyloadProductImages: false,
                        textTitle: "test title",
                        colour: "Black",
                        price: "£99",
                        text,
                        currencyCode: "GBP",
                        department: "menswear",
                    },
                ],
                currentSlideIndex: 0,
                lazyloadProductImages: false,
                textTitle: "test title",
                colour: "White",
                price: "£123",
                currencyCode: "GBP",
            })
        })
    })

    describe("when product is a 'sofa'", () => {
        const res = mapStateToProps(mockStateSofa)

        it("should return the correct state", () => {
            expect(res).toEqual({
                text,
                thumbsGallery: [
                    {
                        id: "jackson_82_262919",
                        imageUrl: "http://testcdn.co.uk/SofaSwatchView/chunkyweave_dove.jpg",
                        altText: "test title",
                    },
                    {
                        id: "jackson_82_202546",
                        imageUrl: "http://testcdn.co.uk/SofaSwatchView/monzafauxleather_charcoal.jpg",
                        altText: "test title",
                    },
                    {
                        id: "jackson_82_286382",
                        imageUrl: "http://testcdn.co.uk/SofaSwatchView/mattvelvet_navy.jpg",
                        altText: "test title",
                    },
                ],
                displayNewIn: false,
                fits: [],
                isOnSale: false,
                showFitsIcons: false,
                slides: [
                    {
                        id: "jackson_82_262919",
                        imageUrl: "http://testcdn.co.uk/262919_82.jpg",
                        tooltipTitle: "formatted test title type-sofa",
                        linkUrl: "test pdp link",
                        lazyloadProductImages: false,
                        textTitle: "test title",
                        colour: "Chunky Weave/Dove",
                        price: "£775 - £1,350",
                        text,
                        currencyCode: "GBP",
                        department: "homeware",
                    },
                    {
                        id: "jackson_82_202546",
                        imageUrl: "http://testcdn.co.uk/202546_82.jpg",
                        tooltipTitle: "formatted test title type-sofa",
                        linkUrl: "test pdp link",
                        lazyloadProductImages: false,
                        textTitle: "test title",
                        colour: "Monza Faux Leather/Charcoal",
                        price: "£775 - £1,350",
                        text,
                        currencyCode: "GBP",
                        department: "homeware",
                    },
                    {
                        id: "jackson_82_286382",
                        imageUrl: "http://testcdn.co.uk/286382_82.jpg",
                        tooltipTitle: "formatted test title type-sofa",
                        linkUrl: "test pdp link",
                        lazyloadProductImages: false,
                        textTitle: "test title",
                        colour: "Matt Velvet/Navy Jackson",
                        price: "£775 - £1,350",
                        text,
                        currencyCode: "GBP",
                        department: "homeware",
                    },
                ],
                currentSlideIndex: 0,
                lazyloadProductImages: false,
                textTitle: "test title",
                colour: "Chunky Weave/Dove",
                price: "£775 - £1,350",
                currencyCode: "GBP",
            })
        })
    })

    it("should project state and return expected data", () => {
        expect(response).toEqual({
            text,
            thumbsGallery: [
                {
                    id: "99434296",
                    imageUrl: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                    altText: "test title",
                },
                {
                    id: "434296",
                    imageUrl: "http://testcdn.co.uk/AltItemSwatch/21x21/434296.jpg",
                    altText: "test title",
                },
            ],
            displayNewIn: false,
            fits: ["Tall"],
            isOnSale: false,
            showFitsIcons: false,
            slides: [
                {
                    id: "99434296",
                    imageUrl: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                    tooltipTitle: "formatted test title type-product",
                    linkUrl: "test pdp link",
                    lazyloadProductImages: false,
                    textTitle: "test title",
                    colour: "White",
                    price: "£123",
                    text,
                    currencyCode: "GBP",
                    department: "menswear",
                },
                {
                    id: "434296",
                    imageUrl: "http://testcdn.co.uk/search/224x336/434296.jpg",
                    tooltipTitle: "formatted test title type-product",
                    linkUrl: "test pdp link",
                    lazyloadProductImages: false,
                    textTitle: "test title",
                    colour: "Black",
                    price: "£99",
                    text,
                    currencyCode: "GBP",
                    department: "menswear",
                },
            ],
            currentSlideIndex: 0,
            lazyloadProductImages: false,
            textTitle: "test title",
            colour: "White",
            price: "£123",
            currencyCode: "GBP",
        })
    })

    describe("When Show New in is true and it is the first image", () => {
        it("should display new in label", () => {
            const mockNewInState = {...mockState}
            mockState.productSummary.summaryData.showNewIn = true
            const responseNewIn = mapStateToProps(mockNewInState)

            expect(responseNewIn.displayNewIn).toBe(true)
        })
    })

    describe("When Show New in is true and it is the second image", () => {
        it("should not display new in label", () => {
            const mockNewInState = {...mockState}
            mockState.productSummary.summaryData.showNewIn = true
            mockState.productSummary.summaryData.colourways[0].selected = false
            mockState.productSummary.summaryData.colourways[1].selected = true
            const responseNewIn = mapStateToProps(mockNewInState)

            expect(responseNewIn.displayNewIn).toEqual(false)
        })
    })

    describe("When Sale Sash Position is available", () => {
        it("should show fits icons", () => {
            const mockSalesPosition = {...mockState}
            mockState.productSummary.summaryData.saleSashPosition = SaleSashPosition.TR
            const responseSalesPosition = mapStateToProps(mockSalesPosition)

            expect(responseSalesPosition.showFitsIcons).toEqual(true)
        })
    })

    describe("When enabledSearchDesc is switched on and off", () => {
        it("should return correct data when enabledSearchDesc is false", () => {
            const suitResponse = mapStateToProps({
                ...mockState,
                productSummary: {
                    ...mockState.productSummary,
                    summaryData: {
                        ...mockState.productSummary.summaryData,
                        colourways: [{...mockState.productSummary.summaryData.colourways[0], selected: true}],
                        type: "suit",
                    } as any,
                    enabledSearchDesc: false,
                },
                request: {
                    ...mockState.request,
                    isEnglishLang: false,
                },
            })

            expect(suitResponse).toEqual({
                text,
                thumbsGallery: [
                    {
                        id: "99434296",
                        imageUrl: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        altText: "test title",
                    },
                ],
                displayNewIn: true,
                fits: ["Tall"],
                isOnSale: false,
                showFitsIcons: false,
                slides: [
                    {
                        id: "99434296",
                        imageUrl: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                        tooltipTitle: "formatted test title type-suit",
                        linkUrl: "test pdp link",
                        lazyloadProductImages: false,
                        textTitle: "test title",
                        colour: "White",
                        price: "£123",
                        text,
                        currencyCode: "GBP",
                        department: "menswear",
                    },
                ],
                currentSlideIndex: 0,
                lazyloadProductImages: false,
                textTitle: "test title",
                colour: "White",
                price: "£123",
                currencyCode: "GBP",
            })
        })

        it("should return correct data when enabledSearchDesc is true and title is not empty", () => {
            const suitResponse = mapStateToProps({
                ...mockState,
                productSummary: {
                    ...mockState.productSummary,
                    summaryData: {
                        ...mockState.productSummary.summaryData,
                        colourways: [{...mockState.productSummary.summaryData.colourways[0], selected: true}],
                        type: "suit",
                    } as any,
                    enabledSearchDesc: true,
                },
            })

            expect(suitResponse).toEqual({
                text,
                thumbsGallery: [
                    {
                        id: "99434296",
                        imageUrl: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        altText: "White",
                    },
                ],
                displayNewIn: true,
                fits: ["Tall"],
                isOnSale: false,
                showFitsIcons: false,
                slides: [
                    {
                        id: "99434296",
                        imageUrl: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                        tooltipTitle: "formatted test title type-suit",
                        linkUrl: "test pdp link",
                        lazyloadProductImages: false,
                        textTitle: "White",
                        colour: "White",
                        price: "£123",
                        text,
                        currencyCode: "GBP",
                        department: "menswear",
                    },
                ],
                currentSlideIndex: 0,
                lazyloadProductImages: false,
                textTitle: "White",
                colour: "White",
                price: "£123",
                currencyCode: "GBP",
            })
        })

        it("should return correct data when enabledSearchDesc is true and title is empty", () => {
            const suitResponse = mapStateToProps({
                ...mockState,
                productSummary: {
                    ...mockState.productSummary,
                    summaryData: {
                        ...mockState.productSummary.summaryData,
                        colourways: [
                            {...mockState.productSummary.summaryData.colourways[0], selected: true, title: undefined},
                        ],
                        type: "suit",
                    } as any,
                    enabledSearchDesc: true,
                },
            })

            expect(suitResponse).toEqual({
                text,
                thumbsGallery: [
                    {
                        id: "99434296",
                        imageUrl: "http://testcdn.co.uk/AltItemSwatch/21x21/99434296.jpg",
                        altText: "",
                    },
                ],
                displayNewIn: true,
                fits: ["Tall"],
                isOnSale: false,
                showFitsIcons: false,
                slides: [
                    {
                        id: "99434296",
                        imageUrl: "http://testcdn.co.uk/search/224x336/99434296.jpg",
                        tooltipTitle: "formatted test title type-suit",
                        linkUrl: "test pdp link",
                        lazyloadProductImages: false,
                        textTitle: "",
                        colour: "White",
                        price: "£123",
                        text,
                        currencyCode: "GBP",
                        department: "menswear",
                    },
                ],
                currentSlideIndex: 0,
                lazyloadProductImages: false,
                textTitle: "",
                colour: "White",
                price: "£123",
                currencyCode: "GBP",
            })
        })
    })
})
