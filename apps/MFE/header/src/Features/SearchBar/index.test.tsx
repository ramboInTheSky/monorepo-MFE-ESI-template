import React from "react"
import {render} from "@testing-library/react"
import {GetAutoCompleteComponent, GetRecentSearchesComponent, GetModalComponent} from "."

jest.mock("./simple/RecentSearches", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>simple RecentSearches</div>,
}))
jest.mock("./simple/AutoComplete", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>simple AutoComplete</div>,
}))
jest.mock("./simple/Modal", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>simple Modal</div>,
}))

jest.mock("./enriched/RecentSearches", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>ENRICHED RecentSearches</div>,
}))
jest.mock("./enriched/AutoComplete", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>ENRICHED AutoComplete</div>,
}))
jest.mock("./enriched/Modal", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>ENRICHED MODAL</div>,
}))

describe("Featurers - SearchBar: ", () => {
    describe("GetAutoCompleteComponent", () => {
        it("should return Default div when searchBar empty string", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "",
                    },
                },
            }
            const {asFragment} = render(<GetAutoCompleteComponent {...props} />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should return simple AutoComplete text when searchBar SimpleSearch", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "SimpleSearch",
                    },
                },
            }

            const {asFragment} = render(<GetAutoCompleteComponent {...props} />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should return enriched AutoComplete text when searchBar EnrichSearch", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "EnrichSearch",
                    },
                },
            }
            const {asFragment} = render(<GetAutoCompleteComponent {...props} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("GetRecentSearchesComponent", () => {
        it("should return Default div when searchBar empty string", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "",
                    },
                },
            }

            const {asFragment} = render(<GetRecentSearchesComponent {...props} />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should return simple AutoComplete text when searchBar SimpleSearch", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "SimpleSearch",
                    },
                },
            }
            const {asFragment} = render(<GetRecentSearchesComponent {...props} />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should return enriched AutoComplete text when searchBar EnrichSearch", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "EnrichSearch",
                    },
                },
            }
            const {asFragment} = render(<GetRecentSearchesComponent {...props} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("GetModalComponent", () => {
        it("should return Default div when searchBar empty string", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "",
                    },
                },
                open: true,
                closeText: "Close",
                handleClose: jest.fn(),
                children: <div>hello</div>,
                styles: {
                    xs: {},
                    sm: {},
                    md: {},
                    lg: {},
                    xl: {},
                },
            }
            const {asFragment} = render(<GetModalComponent {...props} />)
            expect(asFragment()).toMatchSnapshot()
        })
        it("should return simple AutoComplete text when searchBar SimpleSearch", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "SimpleSearch",
                    },
                },
                closeText: "Close",
                open: true,
                handleClose: jest.fn(),
                children: <div>hello</div>,
                styles: {
                    xs: {},
                    sm: {},
                    md: {},
                    lg: {},
                    xl: {},
                },
            }
            const {asFragment} = render(<GetModalComponent {...props} />)

            expect(asFragment()).toMatchSnapshot()
        })
        it("should return enriched AutoComplete text when searchBar EnrichSearch", () => {
            const props = {
                features: {
                    SearchBar: {
                        Value: "EnrichSearch",
                    },
                },
                closeText: "Close",
                open: true,
                handleClose: jest.fn(),
                children: <div>hello</div>,
                styles: {
                    xs: {},
                    sm: {},
                    md: {},
                    lg: {},
                    xl: {},
                },
            }
            const {asFragment} = render(<GetModalComponent {...props} />)

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
