/* eslint-disable @typescript-eslint/camelcase */

import {mapStateToProps, mergeProps} from "./connect"
import {mockState} from "../../../../../__mocks__/mockStore"

describe("Features/SearchBar/simple/autocomplete - Given connect - mapStateToProps()", () => {
    describe("with the current states", () => {
        const {siteUrl} = mockState.request
        const { text: {autoComplete} } = mockState
        const {q, suggestions, isLoading, numFound} = mockState.autocomplete

        const expected = {
            siteUrl,
            term: q,
            numFound,
            isLoading,
            suggestions,
            typedCharacters: mockState.search.typedCharacters,
            text: autoComplete
        }
        it("should return products,term,showPanel, and numFound from the mockState", () => {
            expect(mapStateToProps(mockState)).toEqual(expected)
        })
    })

    it("should return the url", () => {
        const got = mergeProps({siteUrl: "http://test.com"}, {}, {})
        expect(got.getConnectedPlpUrl("e")).toEqual("http://test.com/search?w=e")
    })
})
