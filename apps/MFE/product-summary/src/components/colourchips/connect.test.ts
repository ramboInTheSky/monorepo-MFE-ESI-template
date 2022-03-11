import {mockState, mockStateSofa} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"
import {selectPriceType} from "../../utils/priceFormatter/selectPriceType"
import text from "../../../__mocks__/default-text.json"

jest.mock("../../utils/getTitleUtil", () => ({
    __esModule: true,
    default: jest.fn(() => "colour pdp title"),
}))

describe("Given connect - mapStateToProps()", () => {
    const mappedProps = mapStateToProps(mockState)

    it("should project state and only return pid", () => {
        const altTextArr = ["White tall My Product", "Black tall My Product"]
        expect(mappedProps).toEqual({
            colourchips: (mockState.productSummary.summaryData as any).colourways.map((colourway, idx) => ({
                itemNumber: colourway.id,
                linkUrl: `${mockState.productSummary.summaryData.baseUrl}/${colourway.url}`,
                isSelected: colourway.selected,
                colour: colourway.colour,
                colourChipUrl: `${mockState.productSummary.summaryData.imageCdnUrl}/AltItemSwatch/21x21/${colourway.id}.jpg`,
                currencyCode: mockState.productSummary.summaryData.currencyCode,
                price: selectPriceType(colourway.price, colourway?.salePrice),
                title: colourway.title,
                altText: altTextArr[idx],
                text,
                department: "menswear",
            })),
            lazyloadColourchips: false,
            colourWayImageUrlBuilder: expect.any(Function),
            text,
        })
    })

    describe("when product is a sofa", () => {
        const res = mapStateToProps(mockStateSofa)
        it("should return expected data", () => {
            expect(res).toEqual({
                colourchips: (mockStateSofa.productSummary.summaryData as any).colourways.map(colourway => ({
                    itemNumber: colourway.id,
                    linkUrl: `${mockStateSofa.productSummary.summaryData.baseUrl}/${colourway.url}`,
                    isSelected: colourway.selected,
                    colour: colourway.colour,
                    colourChipUrl: colourway.colourChipImage,
                    currencyCode: mockStateSofa.productSummary.summaryData.currencyCode,
                    price: selectPriceType(colourway.price, colourway?.salePrice),
                    title: colourway.title,
                    altText: "Jackson",
                    text,
                    department: "homeware",
                })),
                lazyloadColourchips: false,
                colourWayImageUrlBuilder: expect.any(Function),
                text,
            })
        })
    })

    it("should render the right url the 'colourWayImageUrlBuilder'", () => {
        expect(mappedProps.colourWayImageUrlBuilder("my-item-number")).toMatchSnapshot()
    })
})
