import {mockState, mockText} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Given connect - mapStateToProps()", () => {
    it("should project state and only return priceFilter and locale", () => {
        expect(mapStateToProps(mockState)).toEqual({
            locale: "en-GB",
            priceFilter: {
                currencyCode: "GBP",
                displayName: "",
                isFilterOpen: false,
                max: 100,
                min: 0,
                name: "Test2 with options",
                selectedMax: 70,
                selectedMin: 30,
                type: "price",
            },
            realm: "undefined",
            text: mockText
        })
    })
})
