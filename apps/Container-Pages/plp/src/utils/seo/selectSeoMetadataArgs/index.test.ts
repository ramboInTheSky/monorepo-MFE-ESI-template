import State from "../../../models/State"
import {selectSeoMetadataArgs} from "."
import {selectSelectedFilterNames} from "../../selectSelectedFilterNames"
import {CATEGORY_SEARCH, KEYWORD_SEARCH} from "../getSeoMetadataFromConfig"
import {REALM_HEADER, SearchApiRequestTypes, TERRITORY_HEADER, LANGUAGE_HEADER, TERRITORY_GB} from "../../../config/constants"
import { mockText } from "../../../../__mocks__/mockStore"

jest.mock("../../selectSelectedFilterNames")

const defaultState = ({
    search: {
        title: "dress",
    },
    request: {
        headers: {
            [REALM_HEADER]: "amido",
            [TERRITORY_HEADER]: "mx",
        },
        searchTerm: "red",
        territoryName: "Mexico",
        type: SearchApiRequestTypes.Keyword,
    },
    text: mockText
} as any) as State

const defaultStateGB = ({
    search: {
        title: "dress",
    },
    request: {
        headers: {
            [REALM_HEADER]: "amido",
            [TERRITORY_HEADER]: TERRITORY_GB,
        },
        searchTerm: "red",
        territoryName: "Mexico",
        type: SearchApiRequestTypes.Keyword,
    },
    text: mockText
} as any) as State

function mockScenario({selectedFilterNames = [] as string[]} = {}) {
    ;(selectSelectedFilterNames as jest.Mock).mockReturnValue(selectedFilterNames)
}

function clone(obj: {}) {
    return JSON.parse(JSON.stringify(obj))
}

function createCategorySearchState(customLanguage?: string) {
    const data = clone(defaultState)

    if(customLanguage) {
        data.request.headers[LANGUAGE_HEADER] = customLanguage
    }
    data.request.type = SearchApiRequestTypes.Category
    delete data.request.searchTerm

    return data as State
}

function createCategorySearchStateGB(customLanguage?: string) {
    const data = clone(defaultStateGB)

    if(customLanguage) {
        data.request.headers[LANGUAGE_HEADER] = customLanguage
    }
    data.request.type = SearchApiRequestTypes.Category
    delete data.request.searchTerm

    return data as State
}

describe("Given `selectSeoMetadataArgs`", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("By default", () => {
        it("should correctly use `selectSelectedFilterNames`", () => {
            mockScenario({selectedFilterNames: []})
            selectSeoMetadataArgs(defaultState)
            expect(selectSelectedFilterNames).toHaveBeenCalledWith(defaultState)
        })
    })

    describe("For a category search", () => {
        describe("When there are no filters", () => {
            it("should return the appropriate seo metadata args", () => {
                mockScenario({selectedFilterNames: []})
                const state = createCategorySearchState()
                const result = selectSeoMetadataArgs(state)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "mx",
                    searchTerm: "dress",
                    searchType: CATEGORY_SEARCH,
                    withFilters: false,
                    filters: "",
                })
            })

            it("should return the appropriate seo metadata args if the territory is GB", () => {
                mockScenario({selectedFilterNames: []})
                const state = createCategorySearchStateGB()
                const result = selectSeoMetadataArgs(state)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "gb",
                    searchTerm: "dress",
                    searchType: CATEGORY_SEARCH,
                    withFilters: false,
                    filters: "",
                })
            })
        })

        describe("When there are filters", () => {
            it("should return the appropriate seo metadata args", () => {
                mockScenario({selectedFilterNames: ["4", "black"]})
                const state = createCategorySearchState()
                const result = selectSeoMetadataArgs(state)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "mx",
                    searchTerm: "dress",
                    searchType: CATEGORY_SEARCH,
                    withFilters: true,
                    filters: "4 black",
                })
            })
        })

        describe("When there is only gender", () => {
            it("should return the appropriate seo metadata args", () => {
                mockScenario({selectedFilterNames: ["4", "black"]})
                const state = createCategorySearchState()
                state.request.gender = ["women"]
                const result = selectSeoMetadataArgs(state)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "mx",
                    searchTerm: "",
                    searchType: CATEGORY_SEARCH,
                    withFilters: true,
                    filters: "Women's, 4 black",
                })
            })
        })

        describe("When there is gender, category and filters", () => {
            it("should return the appropriate seo metadata args if english site", () => {
                mockScenario({selectedFilterNames: ["4", "black"]})
                const state = createCategorySearchState("en")
                state.request.gender = ["women"]
                state.request.category = "Dresses"
                const result = selectSeoMetadataArgs(state)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "mx",
                    searchTerm: "Dresses",
                    searchType: CATEGORY_SEARCH,
                    withFilters: true,
                    filters: "Women's 4 black",
                })
            })

            it("should return the appropriate seo metadata args if non-english site", () => {
                mockScenario({selectedFilterNames: ["4", "black"]})
                const state = createCategorySearchState("fr")
                state.request.gender = ["women"]
                state.request.category = "Dresses"
                const result = selectSeoMetadataArgs(state)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "mx",
                    searchTerm: "Dresses",
                    searchType: CATEGORY_SEARCH,
                    withFilters: true,
                    filters: "Women's, 4 black",
                })
            })
        })

        describe("When there is no search term", () => {
            const searchlessState = ({
                search: {
                    title: "",
                },
                request: {
                    headers: {
                        [REALM_HEADER]: "amido",
                        [TERRITORY_HEADER]: "mx",
                    },
                    searchTerm: "",
                    category: "Black",
                    territoryName: "Mexico",
                    type: SearchApiRequestTypes.Keyword,
                },
            } as any) as State

            function createSearchlessState() {
                const data = clone(searchlessState)
                data.request.type = SearchApiRequestTypes.Category
                delete data.request.searchTerm

                return data as State
            }

            it("should keep the category passed over as a search term and return the appropriate seo metadata args", () => {
                mockScenario({selectedFilterNames: ["4", "black"]})
                const state = createSearchlessState()
                const result = selectSeoMetadataArgs(state)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "mx",
                    searchTerm: "Black",
                    searchType: CATEGORY_SEARCH,
                    withFilters: true,
                    filters: "4 black",
                })
            })

            describe("When there is a gender but no filters", () => {
                it("should return the appropriate seo metadata args", () => {
                    mockScenario({selectedFilterNames: []})
                    const state = createCategorySearchState()
                    state.request.gender = ["women"]
                    state.request.category = "Dresses"
                    const result = selectSeoMetadataArgs(state)
                    expect(result).toEqual({
                        realm: "amido",
                        market: "Mexico",
                        territory: "mx",
                        searchTerm: "Women's, Dresses",
                        searchType: CATEGORY_SEARCH,
                        withFilters: false,
                        filters: "",
                    })
                })

                it("should return the appropriate seo metadata args for GB territory and English language", () => {
                    mockScenario({selectedFilterNames: []})
                    const state = createCategorySearchStateGB("en")
                    state.request.gender = ["women"]
                    state.request.category = "Dresses"
                    const result = selectSeoMetadataArgs(state)
                    expect(result).toEqual({
                        realm: "amido",
                        market: "Mexico",
                        territory: "gb",
                        searchTerm: "Women's Dresses",
                        searchType: CATEGORY_SEARCH,
                        withFilters: false,
                        filters: "",
                    })
                })
                it("should return the appropriate seo metadata args for GB territory and German language", () => {
                    mockScenario({selectedFilterNames: []})
                    // This scenario (GB terrirtory and de language) never exists in reality, 
                    // added this case to guard, just in case the previous code was restored.
                    const state = createCategorySearchStateGB("de")
                    state.request.gender = ["women"]
                    state.request.category = "Dresses"
                    const result = selectSeoMetadataArgs(state)
                    expect(result).toEqual({
                        realm: "amido",
                        market: "Mexico",
                        territory: "gb",
                        searchTerm: "Women's, Dresses",
                        searchType: CATEGORY_SEARCH,
                        withFilters: false,
                        filters: "",
                    })
                })
            })

            describe("When there is no filters or no gender, but a category", () => {
                it("should return the appropriate seo metadata args", () => {
                    mockScenario({selectedFilterNames: []})
                    const state = createCategorySearchState()
                    state.request.category = "Dresses"
                    const result = selectSeoMetadataArgs(state)
                    expect(result).toEqual({
                        realm: "amido",
                        market: "Mexico",
                        territory: "mx",
                        searchTerm: "Dresses",
                        searchType: CATEGORY_SEARCH,
                        withFilters: false,
                        filters: "",
                    })
                })

                it("should return the appropriate seo metadata args for GB territory", () => {
                    mockScenario({selectedFilterNames: []})
                    const state = createCategorySearchStateGB()
                    state.request.category = "Dresses"
                    const result = selectSeoMetadataArgs(state)
                    expect(result).toEqual({
                        realm: "amido",
                        market: "Mexico",
                        territory: "gb",
                        searchTerm: "Dresses",
                        searchType: CATEGORY_SEARCH,
                        withFilters: false,
                        filters: "",
                    })
                })
            })
        })
    })

    describe("For a keyword search", () => {
        describe("When there are no filters", () => {
            it("should return the appropriate seo metadata args", () => {
                mockScenario({selectedFilterNames: []})
                const result = selectSeoMetadataArgs(defaultState)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "mx",
                    searchTerm: defaultState.search.title,
                    searchType: KEYWORD_SEARCH,
                    withFilters: false,
                    filters: "",
                })
            })
        })

        describe("When there are filters", () => {
            it("should return the appropriate seo metadata args", () => {
                mockScenario({selectedFilterNames: ["4", "black"]})
                const result = selectSeoMetadataArgs(defaultState)
                expect(result).toEqual({
                    realm: "amido",
                    market: "Mexico",
                    territory: "mx",
                    searchTerm: defaultState.search.title,
                    searchType: KEYWORD_SEARCH,
                    withFilters: true,
                    filters: "4 black",
                })
            })
        })
    })
})
