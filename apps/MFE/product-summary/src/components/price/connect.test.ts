import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import {formatTooltipTitle, formatPdpLink} from "../../utils/colourwayBuilders"
import getTitleUtil from "../../utils/getTitleUtil"
import text from "../../../__mocks__/default-text.json"

jest.mock("../../utils/colourwayBuilders", () => ({
    formatTooltipTitle: jest.fn(() => "test toottip title"),
    formatPdpLink: jest.fn(() => "test pdp link"),
}))
jest.mock("../../utils/getTitleUtil", () => ({
    __esModule: true,
    default: jest.fn(() => "White"),
}))

describe("Given connect - mapStateToProps()", () => {
    let response
    beforeAll(() => {
        response = mapStateToProps(mockState)
    })

    it("should call formatTooltipTitle", () => {
        const formatTitleRes = getTitleUtil("" as any)
        expect(formatTooltipTitle).toHaveBeenCalledWith(
            formatTitleRes,
            mockState.productSummary.summaryData.colourways[0].id,
            mockState.productSummary.summaryData.colourways[0].price,
            mockState.productSummary.summaryData.colourways[0].salePrice,
        )
    })

    it("should call formatPdpLink", () => {
        expect(formatPdpLink).toHaveBeenCalledWith(
            mockState.productSummary.summaryData.baseUrl,
            mockState.productSummary.summaryData.colourways[0].url,
        )
    })

    it("should project state and only return pid", () => {
        expect(response).toEqual({
            price: mockState.productSummary.summaryData.colourways[0].price,
            tooltipTitle: "test toottip title",
            linkUrl: "test pdp link",
            salePrice: null,
            title: "White",
            wasPrice: null,
            colour: "White",
            currencyCode: "GBP",
            id: "00000",
            isMade2Measure: false,
            minPrice: "£123",
            text,
            colourwaysHasSale: false,
            department: "menswear",
            brandNameEnabled: false,
        })
    })
})

describe("Given connect -  when enabledSearchDesc is enabled and title is empty", () => {
    let response
    beforeAll(() => {
        const newMockState = {
            ...mockState,
            productSummary: {
                ...mockState.productSummary,
                enabledSearchDesc: true,
                colourways: [
                    {
                        fits: [],
                        id: "99434296",
                        colour: "White",
                        url: "g5990s21/845632#845632",
                        selected: true,
                        price: "£123",
                        salePrice: null,
                        wasPrice: null,
                    },
                ],
            },
        }
        response = mapStateToProps(newMockState)
    })

    it("should return title as white ", () => {
        expect(response).toEqual({
            title: "White",
            tooltipTitle: "test toottip title",
            linkUrl: "test pdp link",
            colour: "White",
            currencyCode: "GBP",
            id: "00000",
            isMade2Measure: false,
            minPrice: "£123",
            price: "£123",
            salePrice: null,
            wasPrice: null,
            text,
            colourwaysHasSale: false,
            department: "menswear",
            brandNameEnabled: false,
        })
    })
})

describe("Given connect - when enabledSearchDesc is enabled", () => {
    let response
    beforeAll(() => {
        const newMockState = {
            ...mockState,
            productSummary: {
                ...mockState.productSummary,
                enabledSearchDesc: true,
            },
        }
        response = mapStateToProps(newMockState)
    })

    it("should return title as White", () => {
        expect(response).toEqual({
            title: "White",
            tooltipTitle: "test toottip title",
            linkUrl: "test pdp link",
            colour: "White",
            currencyCode: "GBP",
            id: "00000",
            isMade2Measure: false,
            minPrice: "£123",
            price: "£123",
            salePrice: null,
            wasPrice: null,
            text,
            colourwaysHasSale: false,
            department: "menswear",
            brandNameEnabled: false,
        })
    })
})

describe("Given connect - when enableBrandDisplay is enabled", () => {
    let response
    beforeAll(() => {
        const newMockState = {
            ...mockState,
            productSummary: {
                ...mockState.productSummary,
                enableBrandDisplay: true,
            },
        }
        response = mapStateToProps(newMockState)
    })

    it("should return brandNameEnabled as true", () => {
        expect(response).toEqual({
            title: "White",
            tooltipTitle: "test toottip title",
            linkUrl: "test pdp link",
            colour: "White",
            currencyCode: "GBP",
            id: "00000",
            department: "menswear",
            isMade2Measure: false,
            minPrice: "£123",
            price: "£123",
            salePrice: null,
            wasPrice: null,
            text,
            colourwaysHasSale: false,
            brandNameEnabled: true,
        })
    })
})

describe("Given connect - when enableBrandDisplay is enabled, but brand is null", () => {
    let response
    beforeAll(() => {
        const newMockState = {
            ...mockState,
            productSummary: {
                ...mockState.productSummary,
                enableBrandDisplay: true,
                summaryData: {
                    ...mockState.productSummary.summaryData,
                    brand: null as any,
                }
            },
        }
        response = mapStateToProps(newMockState)
    })

    it("should return brandNameEnabled as false", () => {
        expect(response).toEqual({
            title: "White",
            tooltipTitle: "test toottip title",
            linkUrl: "test pdp link",
            colour: "White",
            currencyCode: "GBP",
            department: "menswear",
            id: "00000",
            isMade2Measure: false,
            minPrice: "£123",
            price: "£123",
            salePrice: null,
            wasPrice: null,
            text,
            colourwaysHasSale: false,
            brandNameEnabled: false,
        })
    })
})
