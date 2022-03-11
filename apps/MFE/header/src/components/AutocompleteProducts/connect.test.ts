/* eslint-disable @typescript-eslint/camelcase */

import {mapStateToProps, mergeProps} from "./connect"
import {createRecentQuery} from "../../ducks/recents"
import {search} from "../../ducks/search"
import {mockState, mockText} from "../../../__mocks__/mockStore"

jest.mock("../../ducks/recents", () => {
    return {
        createRecentQuery: jest.fn(),
    }
})
jest.mock("../../ducks/search", () => {
    return {
        search: jest.fn(),
    }
})

describe("Components/AutocompleteProducts - Given connect - mapStateToProps()", () => {
    describe("with the current states", () => {
        const {products, q} = mockState.autocomplete
        const {siteUrl} = mockState.request
        const ProductsMaxItems = mockState.features.SearchBar.Autocomplete?.ProductsMaxItems
        const {
            autoComplete: {
                searchLinktext,
                enrich: {termTitle},
            },
        } = mockText
        const expected = {
            products,
            term: q,
            siteUrl,
            maxItems: ProductsMaxItems,
            text: {searchLinktext, termTitle}
        }
        it("should return products,term,showPanel, and numFound from the mockState", () => {
            expect(mapStateToProps(mockState)).toEqual(expected)
        })
    })
    describe("when products is less than some of the maxitems", () => {
        const {q} = mockState.autocomplete
        const {siteUrl} = mockState.request
        const {
            autoComplete: {
                searchLinktext,
                enrich: {termTitle},
            },
        } = mockText
        const newMockState = {
            ...mockState,

            autocomplete: {
                ...mockState.autocomplete,
                products: [
                    {
                        pid: "abc",
                        sale_price: 1,
                        thumb_image: "abc",
                        title: "abc",
                        url: "abc",
                    },
                    {
                        pid: "dfg",
                        sale_price: 1,
                        thumb_image: "dfg",
                        title: "dfg",
                        url: "dfg",
                    },
                    {
                        pid: "dfg",
                        sale_price: 1,
                        thumb_image: "dfg",
                        title: "dfg",
                        url: "dfg",
                    },
                    {
                        pid: "dfg",
                        sale_price: 1,
                        thumb_image: "dfg",
                        title: "dfg",
                        url: "dfg",
                    },
                    {
                        pid: "dfg",
                        sale_price: 1,
                        thumb_image: "dfg",
                        title: "dfg",
                        url: "dfg",
                    },
                ],
            },
        }
        const expected = {
            products: [
                {
                    pid: "abc",
                    sale_price: 1,
                    thumb_image: "abc",
                    title: "abc",
                    url: "abc",
                },
                {
                    pid: "dfg",
                    sale_price: 1,
                    thumb_image: "dfg",
                    title: "dfg",
                    url: "dfg",
                },
                {
                    pid: "dfg",
                    sale_price: 1,
                    thumb_image: "dfg",
                    title: "dfg",
                    url: "dfg",
                },
                {
                    pid: "dfg",
                    sale_price: 1,
                    thumb_image: "dfg",
                    title: "dfg",
                    url: "dfg",
                },
                {
                    pid: "dfg",
                    sale_price: 1,
                    thumb_image: "dfg",
                    title: "dfg",
                    url: "dfg",
                },
            ],
            term: q,
            siteUrl,
            maxItems: {
                xs: 5,
                sm: 5,
                md: 4,
                lg: 4,
                xl: 5,
            },
            text: {searchLinktext, termTitle}
        }
        it("should have updated the maxItems breakpoints maximum to 5", () => {
            expect(mapStateToProps(newMockState)).toEqual(expected)
        })
    })
    describe("when products is less than all of the maxitems", () => {
        const {q} = mockState.autocomplete
        const {siteUrl} = mockState.request
        const {
            autoComplete: {
                searchLinktext,
                enrich: {termTitle},
            },
        } = mockText
        const newMockState = {
            ...mockState,

            autocomplete: {
                ...mockState.autocomplete,
                products: [
                    {
                        pid: "abc",
                        sale_price: 1,
                        thumb_image: "abc",
                        title: "abc",
                        url: "abc",
                    },
                ],
            },
        }
        const expected = {
            products: [
                {
                    pid: "abc",
                    sale_price: 1,
                    thumb_image: "abc",
                    title: "abc",
                    url: "abc",
                },
            ],
            term: q,
            siteUrl,
            maxItems: {
                xs: 5,
                sm: 5,
                md: 5,
                lg: 5,
                xl: 5,
            },
            text: {searchLinktext, termTitle}
        }
        it("should have updated the maxItems breakpoints maximum to 5", () => {
            expect(mapStateToProps(newMockState)).toEqual(expected)
        })
    })
    it("should container required handlers", () => {
        const dispatch = jest.fn()
        const suggestion = "dungarees"
        const got = mergeProps({siteUrl: "http://test.com"}, {dispatch}, {})
        expect(got.handleSuggestionClick).toBeTruthy()

        got.handleSuggestionClick(suggestion)
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(createRecentQuery).toHaveBeenCalled()
        expect(createRecentQuery).toHaveBeenCalledWith(suggestion)

        expect(search).toHaveBeenCalled()
        expect(search).toHaveBeenCalledWith("http://test.com", suggestion)
    })
})
