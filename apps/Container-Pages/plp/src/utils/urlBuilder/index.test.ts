import builder, {getPageOneUri, getScrollPosition} from "."
import {mockState} from "../../../__mocks__/mockStore"
import {SearchApiRequestTypes} from "../../config/constants"
import {FilterPriceApiResponse} from "../../models/Filter"

describe("Given a Url builder", () => {
    describe("When building a URL for category", () => {
        it("When there is a trailing slash, it should create the expected Url", () => {
            expect(builder("http://test.com/shop/mens-t-shirts/", "alpha", SearchApiRequestTypes.Category)).toEqual(
                "http://test.com/shop/mens-t-shirts/isort-alpha",
            )
        })

        it("When there is no trailing slash, it should create the expected Url", () => {
            expect(
                builder("http://test.com/shop/mens-t-shirts/isort-alph", "alpha", SearchApiRequestTypes.Category),
            ).toEqual("http://test.com/shop/mens-t-shirts/isort-alpha")
        })

        it("When a sort is already set, it should create the expected Url", () => {
            expect(builder("http://test.com/shop/mens-t-shirts", "beta", SearchApiRequestTypes.Category)).toEqual(
                "http://test.com/shop/mens-t-shirts/isort-beta",
            )
        })
    })

    describe("When building a URL for keyword", () => {
        it("should create the expected Url", () => {
            expect(builder("http://test.com/search?w=test", "alpha", SearchApiRequestTypes.Keyword)).toEqual(
                "http://test.com/search?w=test&isort=alpha",
            )
        })

        it("When a sort is already set, it should create the expected Url", () => {
            expect(
                builder("http://test.com/search?w=test&isort=alphas", "beta", SearchApiRequestTypes.Keyword),
            ).toEqual("http://test.com/search?w=test&isort=beta")
        })
    })

    describe("When building a URL with filters", () => {
        describe("when no filters are selected", () => {
            describe("and the search type is Keyword", () => {
                const mockFilters = {...mockState.search.facets}
                it("should create the expected URL", () => {
                    expect(
                        builder(
                            "http://test.com/search?w=test&isort=alphas",
                            "beta",
                            SearchApiRequestTypes.Keyword,
                            mockFilters,
                        ),
                    ).toEqual("http://test.com/search?w=test&isort=beta")
                })

                it("should create the expected URL when filters were previously set on the URL", () => {
                    expect(
                        builder(
                            "http://test.com/search?w=test&isort=alphas&af=brand:amido",
                            "beta",
                            SearchApiRequestTypes.Keyword,
                            mockFilters,
                        ),
                    ).toEqual("http://test.com/search?w=test&isort=beta")
                })
            })

            describe("and the search type is Category", () => {
                const mockFilters = {...mockState.search.facets}
                it("should create the expected URL", () => {
                    expect(
                        builder(
                            "http://test.com/shop/mens-t-shirts",
                            "beta",
                            SearchApiRequestTypes.Category,
                            mockFilters,
                        ),
                    ).toEqual("http://test.com/shop/mens-t-shirts/isort-beta")
                })

                it("should create the expected URL when filters were previously set on the URL", () => {
                    expect(
                        builder(
                            "http://test.com/shop/mens-t-shirts/isort-alpha",
                            "beta",
                            SearchApiRequestTypes.Category,
                            mockFilters,
                        ),
                    ).toEqual("http://test.com/shop/mens-t-shirts/isort-beta")
                })
            })
        })

        describe("when filters are selected", () => {
            describe("and the search type is Keyword", () => {
                const selectedMockFilters = {
                    ...mockState.search.facets,
                    opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
                }
                it("should create the expected URL", () => {
                    expect(
                        builder(
                            "http://test.com/search?w=test&isort=alphas",
                            "beta",
                            SearchApiRequestTypes.Keyword,
                            selectedMockFilters,
                        ),
                    ).toEqual("http://test.com/search?w=test&af=opt1&isort=beta")
                })

                it("should create the expected URL when filters were previously set on the URL", () => {
                    expect(
                        builder(
                            "http://test.com/search?w=test&isort=alphas&af=brand:amido",
                            "beta",
                            SearchApiRequestTypes.Keyword,
                            selectedMockFilters,
                        ),
                    ).toEqual("http://test.com/search?w=test&af=opt1&isort=beta")
                })

                it("should create the expected URL when multiple filters are selected", () => {
                    const selectedMultipleMockFilters = {
                        ...mockState.search.facets,
                        opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
                        opt3: {n: "brand:test", c: 1, v: "brand:amido", s: true, incompatibleWith: [], d: false},
                    }
                    expect(
                        builder(
                            "http://test.com/search?w=test&isort=alphas&af=brand:amido",
                            "beta",
                            SearchApiRequestTypes.Keyword,
                            selectedMultipleMockFilters,
                        ),
                    ).toEqual("http://test.com/search?w=test&af=opt1 brand:amido&isort=beta")
                })
                it("should create the expected URL when multiple filters are selected and sort them alphabetally", () => {
                    const selectedMultipleMockFilters = {
                        ...mockState.search.facets,
                        opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
                        "brand:amido": {n: "test", c: 1, v: "brand:amido", s: true, incompatibleWith: [], d: false},
                        "brand:aamido": {n: "aamido", c: 1, v: "brand:aamido", s: true, incompatibleWith: [], d: false},
                        "brand:tamido": {n: "tamido", c: 1, v: "brand:tamido", s: true, incompatibleWith: [], d: false},
                        "brand:hamido": {n: "hamido", c: 1, v: "brand:hamido", s: true, incompatibleWith: [], d: false},
                    }
                    expect(
                        builder(
                            "http://test.com/search?w=test&isort=alphas&af=brand:amido",
                            "beta",
                            SearchApiRequestTypes.Keyword,
                            selectedMultipleMockFilters,
                        ),
                    ).toEqual(
                        "http://test.com/search?w=test&af=brand:aamido brand:hamido brand:amido brand:tamido opt1&isort=beta",
                    )
                })
            })

            describe("and the search type is Category", () => {
                const selectedMockFilters = {
                    ...mockState.search.facets,
                    opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
                }
                it("should create the expected URL", () => {
                    expect(
                        builder(
                            "http://test.com/shop/mens-t-shirts",
                            "beta",
                            SearchApiRequestTypes.Category,
                            selectedMockFilters,
                        ),
                    ).toEqual("http://test.com/shop/mens-t-shirts/opt1-isort-beta")
                })

                it("should create the expected URL when filters were previously set on the URL", () => {
                    expect(
                        builder(
                            "http://test.com/shop/mens-t-shirts/isort-alpha",
                            "beta",
                            SearchApiRequestTypes.Category,
                            selectedMockFilters,
                        ),
                    ).toEqual("http://test.com/shop/mens-t-shirts/opt1-isort-beta")
                })

                it("should create the expected URL when multiple filters are selected", () => {
                    const selectedMultipleMockFilters = {
                        ...mockState.search.facets,
                        opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
                        opt4: {n: "brand:test", c: 1, v: "brand:amido", s: true, incompatibleWith: [], d: false},
                    }
                    expect(
                        builder(
                            "http://test.com/shop/mens-t-shirts/isort-alpha",
                            "beta",
                            SearchApiRequestTypes.Category,
                            selectedMultipleMockFilters,
                        ),
                    ).toEqual("http://test.com/shop/mens-t-shirts/opt1-brand-amido-isort-beta")
                })

                it("should create the expected URL when a language prefix is present", () => {
                    const selectedMultipleMockFilters = {
                        ...mockState.search.facets,
                        opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
                        opt4: {n: "brand:test", c: 1, v: "brand:amido", s: true, incompatibleWith: [], d: false},
                    }
                    expect(
                        builder(
                            "http://test.com/en/shop/gender-men-productaffiliation-tops",
                            "beta",
                            SearchApiRequestTypes.Category,
                            selectedMultipleMockFilters,
                        ),
                    ).toEqual("http://test.com/en/shop/gender-men-productaffiliation-tops/opt1-brand-amido-isort-beta")
                })

                it("should remove -0 from the category", () => {
                    const selectedMultipleMockFilters = {
                        ...mockState.search.facets,
                        opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
                        opt4: {n: "brand:test", c: 1, v: "brand:amido", s: true, incompatibleWith: [], d: false},
                    }
                    expect(
                        builder(
                            "http://test.com/en/shop/gender-men-productaffiliation-tops-0",
                            "beta",
                            SearchApiRequestTypes.Category,
                            selectedMultipleMockFilters,
                        ),
                    ).toEqual("http://test.com/en/shop/gender-men-productaffiliation-tops/opt1-brand-amido-isort-beta")
                })

                it("should not fail if url is invalid", () => {
                    const selectedMultipleMockFilters = {
                        ...mockState.search.facets,
                        opt1: {n: "opt1", c: 1, v: "opt1", s: true, incompatibleWith: [], d: false},
                        opt4: {n: "brand:test", c: 1, v: "brand:amido", s: true, incompatibleWith: [], d: false},
                    }
                    expect(
                        builder(
                            "http://test.com/en/shp/gender-men-productaffiliation-tops-0",
                            "beta",
                            SearchApiRequestTypes.Category,
                            selectedMultipleMockFilters,
                        ),
                    ).toEqual("http://test.com/en/shp/gender-men-productaffiliation-tops-0")
                })
            })
        })

        describe("when price filters are given", () => {
            const mockFilters = {...mockState.search.facets}
            const mockPriceFilter = mockState.search.filters.Test3 as FilterPriceApiResponse
            describe("and the search type is Keyword", () => {
                it("should create the expected URL", () => {
                    expect(
                        builder(
                            "http://test.com/search?w=test&isort=alphas",
                            "beta",
                            SearchApiRequestTypes.Keyword,
                            mockFilters,
                            mockPriceFilter,
                        ),
                    ).toEqual("http://test.com/search?w=test&isort=beta&range=price[3000,7000]")
                })

                it("should create the expected URL when filters were previously set on the URL", () => {
                    expect(
                        builder(
                            "http://test.com/search?w=test&isort=alphas&af=brand:amido&range=price%5B1000%2C4000%5D",
                            "beta",
                            SearchApiRequestTypes.Keyword,
                            mockFilters,
                            mockPriceFilter,
                        ),
                    ).toEqual("http://test.com/search?w=test&isort=beta&range=price[3000,7000]")
                })
            })

            describe("and the search type is Category", () => {
                it("should create the expected URL", () => {
                    expect(
                        builder(
                            "http://test.com/shop/mens-t-shirts",
                            "beta",
                            SearchApiRequestTypes.Category,
                            mockFilters,
                            mockPriceFilter,
                        ),
                    ).toEqual("http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta")
                })

                it("should create the expected URL when filters were previously set on the URL", () => {
                    expect(
                        builder(
                            "http://test.com/shop/mens-t-shirts/isort-alpha-minprice-1000-maxprice-2000",
                            "beta",
                            SearchApiRequestTypes.Category,
                            mockFilters,
                            mockPriceFilter,
                        ),
                    ).toEqual("http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta")
                })
            })
        })
    })

    describe("Given getPageOneUri()", () => {
        describe("When the search type is category", () => {
            it("should set the page to 1", () => {
                const expected = "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta?p=1"
                const actual = getPageOneUri(
                    "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta?p=4",
                )

                expect(actual).toEqual(expected)
            })

            it("should set the page to 1 when none is set", () => {
                const expected = "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta?p=1"
                const actual = getPageOneUri(
                    "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta",
                )

                expect(actual).toEqual(expected)
            })

            it("should remove the scroll position", () => {
                const expected = "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta?p=1"
                const actual = getPageOneUri(
                    "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta?p=4#1200",
                )

                expect(actual).toEqual(expected)
            })
        })

        describe("When the search type is keyword", () => {
            it("should set the page to 1", () => {
                const expected = "http://test.com/search?w=test&af=opt1 brand:amido&isort=beta&p=1"
                const actual = getPageOneUri("http://test.com/search?w=test&af=opt1+brand%3Aamido&isort=beta&p=4")

                expect(actual).toEqual(expected)
            })

            it("should set the page to 1 when none is set", () => {
                const expected = "http://test.com/search?w=test&af=opt1 brand:amido&isort=beta&p=1"
                const actual = getPageOneUri("http://test.com/search?w=test&af=opt1+brand%3Aamido&isort=beta")

                expect(actual).toEqual(expected)
            })

            it("should remove the scroll position", () => {
                const expected = "http://test.com/search?w=test&af=opt1 brand:amido&isort=beta&p=1"
                const actual = getPageOneUri("http://test.com/search?w=test&af=opt1+brand%3Aamido&isort=beta&p=4#1200")

                expect(actual).toEqual(expected)
            })
        })
    })

    describe("Given getScrollPosition()", () => {
        describe("When the search type is category", () => {
            it("should return 0 when there is no scroll value", () => {
                const actual = getScrollPosition(
                    "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta?p=4",
                )
                expect(actual).toEqual(0)
            })

            it("should return 0 when scroll value is invalid", () => {
                const actual = getScrollPosition(
                    "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta?p=4#itsinvalid",
                )
                expect(actual).toEqual(0)
            })

            it("should return correct scroll position", () => {
                const actual = getScrollPosition(
                    "http://test.com/shop/mens-t-shirts/minprice-3000-maxprice-7000-isort-beta?p=4#1200",
                )
                expect(actual).toEqual(1200)
            })
        })
    })
})
