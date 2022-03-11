import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

jest.mock("../../utils/colourwayBuilders", () => ({
    formatPdpLink: jest.fn(() => "test pdp link"),
    formatSuitTooltipTitle: jest.fn(() => "test suit tooltip title"),
    formatSuitTitle: jest.fn(() => "test suit"),
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
            title: "test suit",
        })
    })
})
