import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps} from "./connect"

describe("Features/SearchBar - Given connect - mapStateToProps()", () => {
    it("should return required state from mockState", () => {
        const expected = {
            features: {
                SearchBar: {
                    Value: "SimpleSearch",
                    Autocomplete: {
                        MaxItems: 10,
                        ProductsMaxItems: {
                            lg: 4,
                            md: 4,
                            sm: 8,
                            xl: 5,
                            xs: 8,
                        },
                    },
                    RecentSearch: {
                        MaxItems: 12,
                    },
                },
            },
            closeText: "Close",
        }
        const got = mapStateToProps(mockState)
        expect(got).toEqual(expected)
    })
})
