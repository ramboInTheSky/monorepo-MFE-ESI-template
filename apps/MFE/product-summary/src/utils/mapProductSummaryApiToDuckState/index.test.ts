import {formatPrice} from "@monorepo/utils"
import titleFormatter from "../productTitleFormatter"
import getImageCdnUrl from "../getImageCdnUrl"
import mapProductSummaryApiToDuckState from "."
import filterFits from "../filterFits"
import {Fits, SofaType, SuitType} from "../../config/constants"
import {ProductSummaryApiContract} from "../../models/searchApi/product"

jest.mock("../productTitleFormatter", () => ({
    __esModule: true,
    default: jest.fn(() => "Test Title"),
}))
jest.mock("../getImageCdnUrl", () => ({
    __esModule: true,
    default: jest.fn(() => ({rootUrl: "http://testimagecdn", productUrlPart: "search"})),
}))
jest.mock("@monorepo/utils", () => ({
    formatPrice: jest.fn(() => "£33"),
}))
jest.mock("../filterFits", () => ({
    __esModule: true,
    default: jest.fn(() => ["Tall"]),
}))

const mockRealm = "next"
const mockSiteUrl = "http://localhost:300/en"

const mockApiData: ProductSummaryApiContract = {
    itemNumber: "293383",
    title: "Belted Denim Jacket",
    currencyCode: "SAR",
    brand: "nike",
    department: "menswear",
    fit: "",
    colourways: [
        {
            title: "Dark Blue",
            fits: ["Regular", "Petite"],
            itemNumber: "293383",
            colour: "Dark Blue",
            url: "g7190s5/962950#962950",
            overallStarRating: 2,
            itemPrice: {
                minPrice: 10.0,
                maxPrice: 12.0,
                saleMinPrice: 1,
                saleMaxPrice: 2,
                wasMaxPrice: 10.0,
                wasMinPrice: 12.0,
            },
            personalisedType: "",
            minPrice: "£10.0",
        },
        {
            title: "Mid Blue",
            fits: ["Regular", "Petite"],
            itemNumber: "207061",
            colour: "Mid Blue",
            url: "g7190s5/962950#962950",
            overallStarRating: 2,
            itemPrice: {
                minPrice: 10.0,
                maxPrice: 12.0,
                saleMinPrice: null,
                saleMaxPrice: null,
                wasMaxPrice: null,
                wasMinPrice: null,
            },
            personalisedType: "",
            minPrice: "£10.0",
        },
    ],
}

const mockApiDataPersonalisedType: ProductSummaryApiContract = {
    itemNumber: "293383",
    title: "Belted Denim Jacket",
    currencyCode: "SAR",
    brand: "nike",
    department: "menswear",
    fit: "",
    colourways: [
        {
            title: "Dark Blue",
            fits: ["Regular", "Petite"],
            itemNumber: "293383",
            colour: "Dark Blue",
            url: "g7190s5/962950#962950",
            overallStarRating: 2,
            itemPrice: {
                minPrice: 10.0,
                maxPrice: 12.0,
                saleMinPrice: 1,
                saleMaxPrice: 2,
                wasMaxPrice: 10.0,
                wasMinPrice: 12.0,
            },
            personalisedType: "madeToMeasure",
            minPrice: "£10.0",
        },
        {
            title: "Mid Blue",
            fits: ["Regular", "Petite"],
            itemNumber: "207061",
            colour: "Mid Blue",
            url: "g7190s5/962950#962950",
            overallStarRating: 2,
            itemPrice: {
                minPrice: 10.0,
                maxPrice: 12.0,
                saleMinPrice: null,
                saleMaxPrice: null,
                wasMaxPrice: null,
                wasMinPrice: null,
            },
            personalisedType: "madeToMeasure",
            minPrice: "£10.0",
        },
    ],
}

const mockSuitsApiData = {
    itemNumber: "833609",
    title: "Rubber Rain Jacket",
    brand: "Next",
    department: "Womanswear",
    currencyCode: "GBP",
    type: SuitType,
    fit: "",
    colourways: [
        {
            fits: ["Tall", "Petite"],
            title: "Pale Pink Rubber Rain Jacket",
            type: "suitJacket",
            associatedColourway: {
                type: "suitTrousers",
                itemPrice: {
                    minPrice: 48,
                    maxPrice: 48,
                    saleMinPrice: 12,
                    saleMaxPrice: 15,
                    wasMinPrice: 15,
                    wasMaxPrice: 40,
                },
                personalisedType: "",
                minPrice: "",
            },
            itemNumber: "833609",
            colour: "Pale Pink",
            url: "g7190s5/962950#962950",
            mainImageOverride: "202546_82.jpg",
            colourChipImageOverride: "/sofaswatchview/monzafauxleather_charcoal.jpg",
            overallStarRating: 2,
            itemPrice: {
                minPrice: 48,
                maxPrice: 48,
                saleMinPrice: 12,
                saleMaxPrice: 15,
                wasMinPrice: 15,
                wasMaxPrice: 40,
            },
            personalisedType: "",
            minPrice: "£48",
        },
    ],
}

const mockSuitsApiDataPersonalisedType = {
    itemNumber: "833609",
    title: "Rubber Rain Jacket",
    brand: "Next",
    department: "Womanswear",
    currencyCode: "GBP",
    type: SuitType,
    fit: "",
    colourways: [
        {
            fits: ["Tall", "Petite"],
            title: "Pale Pink Rubber Rain Jacket",
            type: "suitJacket",
            associatedColourway: {
                type: "suitTrousers",
                itemPrice: {
                    minPrice: 48,
                    maxPrice: 48,
                    saleMinPrice: 12,
                    saleMaxPrice: 15,
                    wasMinPrice: 15,
                    wasMaxPrice: 40,
                },
                personalisedType: "madeToMeasure",
                minPrice: "",
            },
            itemNumber: "833609",
            colour: "Pale Pink",
            url: "g7190s5/962950#962950",
            mainImageOverride: "202546_82.jpg",
            colourChipImageOverride: "/sofaswatchview/monzafauxleather_charcoal.jpg",
            overallStarRating: 2,
            itemPrice: {
                minPrice: 48,
                maxPrice: 48,
                saleMinPrice: 12,
                saleMaxPrice: 15,
                wasMinPrice: 15,
                wasMaxPrice: 40,
            },
            personalisedType: "madeToMeasure",
            minPrice: "£48",
        },
    ],
}

const mockSofasApiData = {
    itemNumber: "jackson_82_262919",
    title: "Jackson",
    type: SofaType,
    currencyCode: "GBP",
    colourways: [
        {
            itemNumber: "jackson_82_262919",
            colour: "Chunky Weave/Dove",
            url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-chunky-weave-dove",
            mainImage: "262919_82.jpg",
            colourChipImage: "chunkyweave_dove.jpg",
            overallStarRating: 0,
            itemPrice: {
                minPrice: 48,
                maxPrice: 48,
                saleMinPrice: 12,
                saleMaxPrice: 15,
                wasMinPrice: 15,
                wasMaxPrice: 40,
            },
            personalisedType: "",
            minPrice: "£48",
        },
        {
            itemNumber: "jackson_82_202546",
            colour: "Monza Faux Leather/Charcoal",
            url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-monza-faux-leather-charcoal",
            mainImage: "202546_82.jpg",
            colourChipImage: "monzafauxleather_charcoal.jpg",
            overallStarRating: 0,
            itemPrice: {
                minPrice: 775,
                maxPrice: 1350,
                saleMinPrice: null,
                saleMaxPrice: null,
                wasMinPrice: null,
                wasMaxPrice: null,
            },
            personalisedType: "",
            minPrice: "£775",
        },
        {
            itemNumber: "jackson_82_286382",
            colour: "Matt Velvet/Navy Jackson",
            url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-matt-velvet-navy",
            mainImage: "286382_82.jpg",
            colourChipImage: "mattvelvet_navy.jpg",
            overallStarRating: 0,
            itemPrice: {
                minPrice: 775,
                maxPrice: 1350,
                saleMinPrice: null,
                saleMaxPrice: null,
                wasMinPrice: null,
                wasMaxPrice: null,
            },
            personalisedType: "",
            minPrice: "£775",
        },
    ],
}

const mockSofasApiDataPersonalisedType = {
    itemNumber: "jackson_82_262919",
    title: "Jackson",
    type: SofaType,
    currencyCode: "GBP",
    colourways: [
        {
            itemNumber: "jackson_82_262919",
            colour: "Chunky Weave/Dove",
            url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-chunky-weave-dove",
            mainImage: "262919_82.jpg",
            colourChipImage: "chunkyweave_dove.jpg",
            overallStarRating: 0,
            itemPrice: {
                minPrice: 48,
                maxPrice: 48,
                saleMinPrice: 12,
                saleMaxPrice: 15,
                wasMinPrice: 15,
                wasMaxPrice: 40,
            },
            personalisedType: "madeToMeasure",
            minPrice: "£48",
        },
        {
            itemNumber: "jackson_82_202546",
            colour: "Monza Faux Leather/Charcoal",
            url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-monza-faux-leather-charcoal",
            mainImage: "202546_82.jpg",
            colourChipImage: "monzafauxleather_charcoal.jpg",
            overallStarRating: 0,
            itemPrice: {
                minPrice: 775,
                maxPrice: 1350,
                saleMinPrice: null,
                saleMaxPrice: null,
                wasMinPrice: null,
                wasMaxPrice: null,
            },
            personalisedType: "madeToMeasure",
            minPrice: "£775",
        },
        {
            itemNumber: "jackson_82_286382",
            colour: "Matt Velvet/Navy Jackson",
            url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-matt-velvet-navy",
            mainImage: "286382_82.jpg",
            colourChipImage: "mattvelvet_navy.jpg",
            overallStarRating: 0,
            itemPrice: {
                minPrice: 775,
                maxPrice: 1350,
                saleMinPrice: null,
                saleMaxPrice: null,
                wasMinPrice: null,
                wasMaxPrice: null,
            },
            personalisedType: "madeToMeasure",
            minPrice: "£775",
        },
    ],
}

const expectedResponse = {
    title: "Test Title",
    id: "293383",
    brand: "nike",
    department: "menswear",
    fit: "",
    currencyCode: "SAR",
    baseUrl: mockSiteUrl,
    imageCdnUrl: "http://testimagecdn",
    showNewIn: false,
    productImageUrlPart: "search",
    saleSash: "test.jpg",
    saleSashPosition: "TR",
    colourways: [
        {
            title: "Dark Blue",
            id: "293383",
            url: `g7190s5/962950#962950`,
            selected: true,
            fits: [Fits.Tall],
            colour: "Dark Blue",
            price: "£33",
            salePrice: "£33",
            wasPrice: "£33",
            overallStarRating: 2,
            colourChipImage: "http://testimagecdn/AltItemSwatch/21x21/293383.jpg",
            mainImage: "http://testimagecdn/search/224x336/293383.jpg",
            personalisedType: "",
            minPrice: "£33",
        },
        {
            title: "Mid Blue",
            id: "207061",
            url: `g7190s5/962950#962950`,
            selected: false,
            fits: [Fits.Tall],
            colour: "Mid Blue",
            price: "£33",
            salePrice: null,
            wasPrice: null,
            overallStarRating: 2,
            colourChipImage: "http://testimagecdn/AltItemSwatch/21x21/207061.jpg",
            mainImage: "http://testimagecdn/search/224x336/207061.jpg",
            personalisedType: "",
            minPrice: "£33",
        },
    ],
    type: "product",
}

const expectedResponsePersonalisedType = {
    title: "Test Title",
    id: "293383",
    brand: "nike",
    department: "menswear",
    fit: "",
    currencyCode: "SAR",
    baseUrl: mockSiteUrl,
    imageCdnUrl: "http://testimagecdn",
    showNewIn: false,
    productImageUrlPart: "search",
    saleSash: "test.jpg",
    saleSashPosition: "TR",
    colourways: [
        {
            title: "Dark Blue",
            id: "293383",
            url: `g7190s5/962950#962950`,
            selected: true,
            fits: [Fits.Tall],
            colour: "Dark Blue",
            price: "£33",
            salePrice: "£33",
            wasPrice: "£33",
            overallStarRating: 2,
            colourChipImage: "http://testimagecdn/AltItemSwatch/21x21/293383.jpg",
            mainImage: "http://testimagecdn/search/224x336/293383.jpg",
            personalisedType: "madeToMeasure",
            minPrice: "£33",
        },
        {
            title: "Mid Blue",
            id: "207061",
            url: `g7190s5/962950#962950`,
            selected: false,
            fits: [Fits.Tall],
            colour: "Mid Blue",
            price: "£33",
            salePrice: null,
            wasPrice: null,
            overallStarRating: 2,
            colourChipImage: "http://testimagecdn/AltItemSwatch/21x21/207061.jpg",
            mainImage: "http://testimagecdn/search/224x336/207061.jpg",
            personalisedType: "madeToMeasure",
            minPrice: "£33",
        },
    ],
    type: "product",
}

const mockConfiguration = {
    "productsummary.frontend.languageName": {Value: "en"},
    "productsummary.frontend.territoryName": {Value: "GB"},
    "productsummary.frontend.saleSash": {Value: "test.jpg"},
    "productsummary.frontend.saleSashPosition": {Value: "TR"},
}

describe("Given a mapProductSummaryApiToDuckState", () => {
    describe("When Mapping", () => {
        let response
        beforeAll(() => {
            response = mapProductSummaryApiToDuckState(mockApiData, mockConfiguration, mockSiteUrl, mockRealm)
        })

        it("should call getImageCdnUrl", () => {
            expect(getImageCdnUrl).toHaveBeenCalledWith(mockConfiguration)
        })

        it("should call the titleFormatter", () => {
            expect(titleFormatter).toHaveBeenCalled()
        })

        it("should call the priceFormatter", () => {
            expect(formatPrice).toHaveBeenCalledWith(10.0, 12.0, "SAR", "en-GB", "next")
        })

        it("should call the filterFits", () => {
            expect(filterFits).toHaveBeenCalledWith(["Regular", "Petite"])
        })

        it("should return the mapped response ", () => {
            expect(response).toEqual(expectedResponse)
        })
    })

    describe("When Mapping and sale sash is not set", () => {
        let response
        beforeAll(() => {
            const mockConfigurationNoSash = {
                "productsummary.frontend.languageName": {Value: "en"},
                "productsummary.frontend.territoryName": {Value: "GB"},
            }
            response = mapProductSummaryApiToDuckState(mockApiData, mockConfigurationNoSash, mockSiteUrl, mockRealm)
        })
        it("should return the mapped response ", () => {
            const expectedResponseNoSash = {
                ...expectedResponse,
                saleSash: null,
                saleSashPosition: null,
            }

            expect(response).toEqual(expectedResponseNoSash)
        })
    })

    describe("When Mapping and personalisedType is set", () => {
        let response
        beforeAll(() => {
            const mockConfigurationNoSash = {
                "productsummary.frontend.languageName": {Value: "en"},
                "productsummary.frontend.territoryName": {Value: "GB"},
            }
            response = mapProductSummaryApiToDuckState(
                mockApiDataPersonalisedType,
                mockConfigurationNoSash,
                mockSiteUrl,
                mockRealm,
            )
        })
        it("should return the mapped response ", () => {
            const expectedResponsePersonalized = {
                ...expectedResponsePersonalisedType,
                saleSash: null,
                saleSashPosition: null,
            }

            expect(response).toEqual(expectedResponsePersonalized)
        })
    })

    describe("When mapping suits api data", () => {
        const expectedSuitResponse = {
            title: "Test Title",
            id: "833609",
            brand: "Next",
            currencyCode: "GBP",
            baseUrl: "http://localhost:300/en",
            imageCdnUrl: "http://testimagecdn",
            productImageUrlPart: "search",
            showNewIn: false,
            saleSash: "test.jpg",
            saleSashPosition: "TR",
            type: "suit",
            department: "Womanswear",
            fit: "",
            colourways: [
                {
                    id: "833609",
                    url: "g7190s5/962950#962950",
                    selected: true,
                    fits: ["Tall"],
                    colour: "Pale Pink",
                    title: "Pale Pink Rubber Rain Jacket",
                    price: "£33",
                    wasPrice: "£33",
                    salePrice: "£33",
                    associatedColourway: {
                        type: "suitTrousers",
                        price: "£33",
                        salePrice: "£33",
                        wasPrice: "£33",
                    },
                    suitPrice: "£33",
                    overallStarRating: 2,
                    saleSuitPrice: "£33",
                    wasSuitPrice: "£33",
                    colourChipImage: "http://testimagecdn/AltItemSwatch/21x21/833609.jpg",
                    mainImage: "http://testimagecdn/search/224x336/833609.jpg",
                    minPrice: "£33",
                    personalisedType: "",
                },
            ],
        }

        const expectedSuitResponsePersonalisedType = {
            title: "Test Title",
            id: "833609",
            brand: "Next",
            currencyCode: "GBP",
            baseUrl: "http://localhost:300/en",
            imageCdnUrl: "http://testimagecdn",
            productImageUrlPart: "search",
            showNewIn: false,
            saleSash: "test.jpg",
            saleSashPosition: "TR",
            type: "suit",
            department: "Womanswear",
            fit: "",
            colourways: [
                {
                    id: "833609",
                    url: "g7190s5/962950#962950",
                    selected: true,
                    fits: ["Tall"],
                    colour: "Pale Pink",
                    title: "Pale Pink Rubber Rain Jacket",
                    price: "£33",
                    wasPrice: "£33",
                    salePrice: "£33",
                    associatedColourway: {
                        type: "suitTrousers",
                        price: "£33",
                        salePrice: "£33",
                        wasPrice: "£33",
                    },
                    suitPrice: "£33",
                    overallStarRating: 2,
                    saleSuitPrice: "£33",
                    wasSuitPrice: "£33",
                    colourChipImage: "http://testimagecdn/AltItemSwatch/21x21/833609.jpg",
                    mainImage: "http://testimagecdn/search/224x336/833609.jpg",
                    minPrice: "£33",
                    personalisedType: "madeToMeasure",
                },
            ],
        }
        it("should return the mapped response", () => {
            expect(
                mapProductSummaryApiToDuckState(mockSuitsApiData, mockConfiguration, mockSiteUrl, mockRealm),
            ).toEqual(expectedSuitResponse)
        })

        it("should return the mapped response if madeToMeasure", () => {
            expect(
                mapProductSummaryApiToDuckState(
                    mockSuitsApiDataPersonalisedType,
                    mockConfiguration,
                    mockSiteUrl,
                    mockRealm,
                ),
            ).toEqual(expectedSuitResponsePersonalisedType)
        })

        describe("sale suit prices mapping", () => {
            it("checks if wasMinPrice exists, if not, wasPrice returns null", () => {
                const newMockSuitsApiData = {
                    ...mockSuitsApiData,
                }
                newMockSuitsApiData.colourways[0].itemPrice.wasMinPrice = undefined as any

                const newExpectedSuitResponse = {
                    ...expectedSuitResponse,
                }
                newExpectedSuitResponse.colourways[0].wasPrice = null as any

                expect(
                    mapProductSummaryApiToDuckState(newMockSuitsApiData, mockConfiguration, mockSiteUrl, mockRealm),
                ).toEqual(expectedSuitResponse)
            })

            it("checks if wasMaxPrice exists, if not, wasPrice returns null", () => {
                const newMockSuitsApiData = {...mockSuitsApiData}
                newMockSuitsApiData.colourways[0].itemPrice.wasMaxPrice = undefined as any

                const newExpectedSuitResponse = {...expectedSuitResponse}
                newExpectedSuitResponse.colourways[0].wasPrice = null as any

                expect(
                    mapProductSummaryApiToDuckState(newMockSuitsApiData, mockConfiguration, mockSiteUrl, mockRealm),
                ).toEqual(expectedSuitResponse)
            })

            it("checks if saleMinPrice exists, if not, salePrice returns null", () => {
                const newMockSuitsApiData = {...mockSuitsApiData}
                newMockSuitsApiData.colourways[0].itemPrice.saleMinPrice = undefined as any

                const newExpectedSuitResponse = {...expectedSuitResponse}
                newExpectedSuitResponse.colourways[0].salePrice = null as any

                expect(
                    mapProductSummaryApiToDuckState(newMockSuitsApiData, mockConfiguration, mockSiteUrl, mockRealm),
                ).toEqual(expectedSuitResponse)
            })

            it("checks if saleMaxPrice exists, if not, salePrice returns null", () => {
                const newMockSuitsApiData = {...mockSuitsApiData}
                newMockSuitsApiData.colourways[0].itemPrice.saleMaxPrice = undefined as any

                const newExpectedSuitResponse = {...expectedSuitResponse}
                newExpectedSuitResponse.colourways[0].salePrice = null as any

                expect(
                    mapProductSummaryApiToDuckState(newMockSuitsApiData, mockConfiguration, mockSiteUrl, mockRealm),
                ).toEqual(expectedSuitResponse)
            })

            it("checks if associatedColourway wasMinPrice exists, if not, associatedColourway.wasPrice returns null, and changes suit calculation", () => {
                const newMockSuitsApiData = {...mockSuitsApiData}
                newMockSuitsApiData.colourways[0].associatedColourway.itemPrice.wasMinPrice = undefined as any

                const newExpectedSuitResponse = {...expectedSuitResponse}
                newExpectedSuitResponse.colourways[0].associatedColourway.wasPrice = null as any
                newExpectedSuitResponse.colourways[0].wasSuitPrice = null as any

                expect(
                    mapProductSummaryApiToDuckState(newMockSuitsApiData, mockConfiguration, mockSiteUrl, mockRealm),
                ).toEqual(expectedSuitResponse)
            })

            it("checks if associatedColourway wasMaxPrice exists, if not, associatedColourway.wasPrice returns null, and changes suit calculation", () => {
                const newMockSuitsApiData = {...mockSuitsApiData}
                newMockSuitsApiData.colourways[0].associatedColourway.itemPrice.wasMaxPrice = undefined as any

                const newExpectedSuitResponse = {...expectedSuitResponse}
                newExpectedSuitResponse.colourways[0].associatedColourway.wasPrice = null as any
                newExpectedSuitResponse.colourways[0].wasSuitPrice = null as any

                expect(
                    mapProductSummaryApiToDuckState(newMockSuitsApiData, mockConfiguration, mockSiteUrl, mockRealm),
                ).toEqual(expectedSuitResponse)
            })

            it("checks if associatedColourway saleMinPrice exists, if not, associatedColourway.salePrice returns null and changes suit calculation", () => {
                const newMockSuitsApiData = {...mockSuitsApiData}
                newMockSuitsApiData.colourways[0].associatedColourway.itemPrice.saleMinPrice = undefined as any

                const newExpectedSuitResponse = {...expectedSuitResponse}
                newExpectedSuitResponse.colourways[0].associatedColourway.salePrice = null as any
                newExpectedSuitResponse.colourways[0].saleSuitPrice = null as any

                expect(
                    mapProductSummaryApiToDuckState(newMockSuitsApiData, mockConfiguration, mockSiteUrl, mockRealm),
                ).toEqual(expectedSuitResponse)
            })
        })

        describe("When Mapping and sale sash is not set", () => {
            let response
            beforeAll(() => {
                const mockConfigurationNoSash = {
                    "productsummary.frontend.languageName": {Value: "en"},
                    "productsummary.frontend.territoryName": {Value: "GB"},
                }
                response = mapProductSummaryApiToDuckState(
                    mockSuitsApiData,
                    mockConfigurationNoSash,
                    mockSiteUrl,
                    mockRealm,
                )
            })
            it("should return the mapped response ", () => {
                const expectedResponseNoSash = {
                    ...expectedSuitResponse,
                    saleSash: null,
                    saleSashPosition: null,
                }

                expect(response).toEqual(expectedResponseNoSash)
            })
        })
    })

    describe("When mapping sofa api data", () => {
        beforeAll(() => {
            ;(filterFits as jest.Mock).mockReturnValue([])
            ;(formatPrice as jest.Mock).mockReturnValue("£775 - £1,350")
            ;(titleFormatter as jest.Mock).mockReturnValue("Jackson")
        })
        afterAll(() => {
            ;(filterFits as jest.Mock).mockReset()
            ;(formatPrice as jest.Mock).mockReset()
            ;(titleFormatter as jest.Mock).mockReset()
        })
        const expectedSofaResponse = {
            title: "Jackson",
            id: "jackson_82_262919",
            brand: null,
            currencyCode: "GBP",
            baseUrl: "http://localhost:300/en",
            imageCdnUrl: "http://testimagecdn",
            productImageUrlPart: "search",
            showNewIn: false,
            saleSash: "test.jpg",
            saleSashPosition: "TR",
            type: "sofa",
            department: null,
            fit: null,
            colourways: [
                {
                    id: "jackson_82_262919",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-chunky-weave-dove",
                    mainImage: "http://testimagecdn/search/224x336/262919_82.jpg",
                    colourChipImage: "http://testimagecdn/SofaSwatchView/chunkyweave_dove.jpg",
                    selected: true,
                    fits: [],
                    colour: "Chunky Weave/Dove",
                    title: "Chunky Weave/Dove",
                    price: "£775 - £1,350",
                    wasPrice: "£775 - £1,350",
                    salePrice: "£775 - £1,350",
                    overallStarRating: 0,
                    minPrice: "£775 - £1,350",
                    personalisedType: "",
                },
                {
                    id: "jackson_82_202546",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-monza-faux-leather-charcoal",
                    mainImage: "http://testimagecdn/search/224x336/202546_82.jpg",
                    colourChipImage: "http://testimagecdn/SofaSwatchView/monzafauxleather_charcoal.jpg",
                    selected: false,
                    fits: [],
                    colour: "Monza Faux Leather/Charcoal",
                    title: "Monza Faux Leather/Charcoal",
                    price: "£775 - £1,350",
                    wasPrice: null,
                    salePrice: null,
                    overallStarRating: 0,
                    minPrice: "£775 - £1,350",
                    personalisedType: "",
                },
                {
                    id: "jackson_82_286382",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-matt-velvet-navy",
                    mainImage: "http://testimagecdn/search/224x336/286382_82.jpg",
                    colourChipImage: "http://testimagecdn/SofaSwatchView/mattvelvet_navy.jpg",
                    selected: false,
                    fits: [],
                    colour: "Matt Velvet/Navy Jackson",
                    title: "Matt Velvet/Navy Jackson",
                    price: "£775 - £1,350",
                    wasPrice: null,
                    salePrice: null,
                    overallStarRating: 0,
                    minPrice: "£775 - £1,350",
                    personalisedType: "",
                },
            ],
        }
        const expectedSofaResponsePersonalisedType = {
            title: "Jackson",
            id: "jackson_82_262919",
            brand: null,
            currencyCode: "GBP",
            baseUrl: "http://localhost:300/en",
            imageCdnUrl: "http://testimagecdn",
            productImageUrlPart: "search",
            showNewIn: false,
            saleSash: "test.jpg",
            saleSashPosition: "TR",
            type: "sofa",
            department: null,
            fit: null,
            colourways: [
                {
                    id: "jackson_82_262919",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-chunky-weave-dove",
                    mainImage: "http://testimagecdn/search/224x336/262919_82.jpg",
                    colourChipImage: "http://testimagecdn/SofaSwatchView/chunkyweave_dove.jpg",
                    selected: true,
                    fits: [],
                    colour: "Chunky Weave/Dove",
                    title: "Chunky Weave/Dove",
                    price: "£775 - £1,350",
                    wasPrice: "£775 - £1,350",
                    salePrice: "£775 - £1,350",
                    overallStarRating: 0,
                    minPrice: "£775 - £1,350",
                    personalisedType: "madeToMeasure",
                },
                {
                    id: "jackson_82_202546",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-monza-faux-leather-charcoal",
                    mainImage: "http://testimagecdn/search/224x336/202546_82.jpg",
                    colourChipImage: "http://testimagecdn/SofaSwatchView/monzafauxleather_charcoal.jpg",
                    selected: false,
                    fits: [],
                    colour: "Monza Faux Leather/Charcoal",
                    title: "Monza Faux Leather/Charcoal",
                    price: "£775 - £1,350",
                    wasPrice: null,
                    salePrice: null,
                    overallStarRating: 0,
                    minPrice: "£775 - £1,350",
                    personalisedType: "madeToMeasure",
                },
                {
                    id: "jackson_82_286382",
                    url: "/homeware/sofas-chairs/jackson/size-power-recliner-large-sofa-fabric-matt-velvet-navy",
                    mainImage: "http://testimagecdn/search/224x336/286382_82.jpg",
                    colourChipImage: "http://testimagecdn/SofaSwatchView/mattvelvet_navy.jpg",
                    selected: false,
                    fits: [],
                    colour: "Matt Velvet/Navy Jackson",
                    title: "Matt Velvet/Navy Jackson",
                    price: "£775 - £1,350",
                    wasPrice: null,
                    salePrice: null,
                    overallStarRating: 0,
                    minPrice: "£775 - £1,350",
                    personalisedType: "madeToMeasure",
                },
            ],
        }
        it("should return the mapped response", () => {
            expect(
                mapProductSummaryApiToDuckState(mockSofasApiData, mockConfiguration, mockSiteUrl, mockRealm),
            ).toEqual(expectedSofaResponse)
        })

        it("should return the mapped response if madeToMeasure", () => {
            expect(
                mapProductSummaryApiToDuckState(
                    mockSofasApiDataPersonalisedType,
                    mockConfiguration,
                    mockSiteUrl,
                    mockRealm,
                ),
            ).toEqual(expectedSofaResponsePersonalisedType)
        })

        describe("When Mapping and sale sash is not set", () => {
            let response
            beforeAll(() => {
                ;(filterFits as jest.Mock).mockReturnValue([])
                ;(formatPrice as jest.Mock).mockReturnValue("£775 - £1,350")
                ;(titleFormatter as jest.Mock).mockReturnValue("Jackson")

                const mockConfigurationNoSash = {
                    "productsummary.frontend.languageName": {Value: "en"},
                    "productsummary.frontend.territoryName": {Value: "GB"},
                }
                response = mapProductSummaryApiToDuckState(
                    mockSofasApiData,
                    mockConfigurationNoSash,
                    mockSiteUrl,
                    mockRealm,
                )
            })
            afterAll(() => {
                ;(filterFits as jest.Mock).mockReset()
                ;(formatPrice as jest.Mock).mockReset()
                ;(titleFormatter as jest.Mock).mockReset()
            })

            it("should return the mapped response ", () => {
                const expectedResponseNoSash = {
                    ...expectedSofaResponse,
                    saleSash: null,
                    saleSashPosition: null,
                }
                expect(response).toEqual(expectedResponseNoSash)
            })
        })
    })
})
