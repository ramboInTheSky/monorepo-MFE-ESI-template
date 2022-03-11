import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import {formatTooltipTitle, formatPdpLink} from "../../utils/colourwayBuilders"
import getTitleUtil from "../../utils/getTitleUtil"

jest.mock("../../utils/colourwayBuilders", () => ({
    formatTooltipTitle: jest.fn(() => "test toottip title"),
    formatPdpLink: jest.fn(() => "test pdp link"),
}))

jest.mock("../../utils/getTitleUtil", () => ({
    __esModule: true,
    default: jest.fn(() => "colour pdp title"),
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

    it("should return title, tooltipTitle and linkUrl ", () => {
        expect(response).toEqual({
            title: "colour pdp title",
            tooltipTitle: "test toottip title",
            linkUrl: "test pdp link",
            colour: "White",
            currencyCode: "GBP",
            id: "00000",
            price: "£123",
            department: "menswear",
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
                        title: "",
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

    it("should return title as empty, tooltipTitle and linkUrl ", () => {
        expect(response).toEqual({
            title: "colour pdp title",
            tooltipTitle: "test toottip title",
            linkUrl: "test pdp link",
            colour: "White",
            currencyCode: "GBP",
            id: "00000",
            price: "£123",
            department: "menswear",
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

    it("should return title as White", () => {
        expect(response).toEqual({
            title: "colour pdp title",
            tooltipTitle: "test toottip title",
            linkUrl: "test pdp link",
            colour: "White",
            currencyCode: "GBP",
            id: "00000",
            price: "£123",
            department: "menswear",
        })
    })
})
