import {mapStateToProps} from "./connect"
import {mockState} from "../../../__mocks__/mockStore"

describe("Components/RecentSearches - Given connect - mapStateToProps()", () => {
    describe("with the current states", () => {
        const expected = {
            items: [
                {
                    item: "+",
                    url: "fakeamido.com/search?w=%2B",
                },
                {
                    item: "#",
                    url: "fakeamido.com/search?w=%23",
                },
                {
                    item: "&",
                    url: "fakeamido.com/search?w=%26",
                },
                {
                    item: "prada",
                    url: "fakeamido.com/search?w=prada",
                },
                {
                    item: "gucci",
                    url: "fakeamido.com/search?w=gucci",
                },
                {
                    item: "celio",
                    url: "fakeamido.com/search?w=celio",
                },
            ],
            typedCharacters: "",
        }
        it("should return suggestions, term from the mockState", () => {
            expect(mapStateToProps(mockState)).toEqual(expected)
        })
    })
})
