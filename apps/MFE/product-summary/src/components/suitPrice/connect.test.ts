import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import text from "../../../__mocks__/default-text.json"

jest.mock("../../utils/colourwayBuilders", () => ({
    formatPdpLink: jest.fn(() => "test pdp link"),
    formatSuitTooltipTitle: jest.fn(() => "test suit tooltip title"),
}))

describe("Given connect - mapStateToProps()", () => {
    it("should project state and return itemNumber", () => {
        const mockStateWithSuit = {
            ...mockState,
            productSummary: {
                ...mockState.productSummary,
                summaryData: {
                    ...mockState.productSummary.summaryData,
                    type: "suit",
                    colourways: [
                        {
                            selected: true,
                            title: "Test",
                            id: "007",
                            price: "£20",
                            url: "test-url",
                            suitPrice: "£10",
                            associatedColourway: {price: "£10"},
                        },
                    ],
                },
            },
        } as any
        expect(mapStateToProps(mockStateWithSuit)).toEqual({
            tooltipTitle: "test suit tooltip title",
            linkUrl: "test pdp link",
            jacketPrice: "£20",
            jacketsHasSale: true,
            saleJacketPrice: undefined,
            wasJacketPrice: undefined,
            suitPrice: "£10",
            saleSuitPrice: undefined,
            wasSuitPrice: undefined,
            trouserPrice: "£10",
            trousersHasSale: true,
            saleTrouserPrice: undefined,
            wasTrouserPrice: undefined,
            text
        })
    })
})
