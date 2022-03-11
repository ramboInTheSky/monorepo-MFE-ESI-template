import State from "../../models/State"
import {selectSelectedFilterNames} from "."

describe("Given `selectSelectedFilterNames`", () => {
    it("should extract the selected facet names if the language is English", () => {
        const state = ({
            search: {
                filtersSort: ["gender", "size", "colour", "foo"],
                filters: {
                    gender: {
                        facets: ["gender:women", "gender:men", "gender:unisex"],
                    },
                    size: {
                        facets: ["size:onesize", "size:large", "size:xlarge"],
                    },
                    colour: {
                        facets: ["colour:red", "colour:blue", "colour:pink"],
                    },
                    foo: {}, // For when there are no facets
                },
                facets: {
                    "colour:red": {
                        n: "Red",
                        s: true,
                    },
                    "colour:blue": {
                        n: "Blue",
                    },
                    "colour:pink": {
                        n: "Pink",
                    },
                    "gender:women": {
                        n: "Women",
                    },
                    "gender:men": {
                        n: "Men",
                        s: true,
                    },
                    "gender:unisex": {
                        n: "Unisex",
                        s: true,
                    },
                    "size:onesize": {
                        n: "One Size",
                    },
                    "size:large": {
                        n: "Large",
                    },
                    "size:xlarge": {
                        n: "X Large",
                        s: true,
                    },
                },
            },
            request: {
                headers: {
                    "x-monorepo-language": "en",
                },
            },
        } as any) as State
        const result = selectSelectedFilterNames(state)
        expect(result).toEqual(["Men ", "Unisex ", "X Large ", "Red "])
    })
    it("should extract the selected facet names if the language is not English", () => {
        const state = ({
            search: {
                filtersSort: ["gender", "size", "colour", "foo"],
                filters: {
                    gender: {
                        facets: ["gender:women", "gender:men", "gender:unisex"],
                    },
                    size: {
                        facets: ["size:onesize", "size:large", "size:xlarge"],
                    },
                    colour: {
                        facets: ["colour:red", "colour:blue", "colour:pink"],
                    },
                    foo: {}, // For when there are no facets
                },
                facets: {
                    "colour:red": {
                        n: "Red",
                        s: true,
                    },
                    "colour:blue": {
                        n: "Blue",
                    },
                    "colour:pink": {
                        n: "Pink",
                    },
                    "gender:women": {
                        n: "Women",
                    },
                    "gender:men": {
                        n: "Men",
                        s: true,
                    },
                    "gender:unisex": {
                        n: "Unisex",
                        s: true,
                    },
                    "size:onesize": {
                        n: "One Size",
                    },
                    "size:large": {
                        n: "Large",
                    },
                    "size:xlarge": {
                        n: "X Large",
                        s: true,
                    },
                },
            },
            request: {
                headers: {
                    "x-monorepo-language": "fr",
                },
            },
        } as any) as State
        const result = selectSelectedFilterNames(state)
        expect(result).toEqual(["Men, ", "Unisex, ", "X Large, ", "Red, "])
    })
    it("should not duplicate the gender when exists in both filter and request", () => {
        const state = ({
            search: {
                filtersSort: ["gender", "size", "colour", "foo"],
                filters: {
                    gender: {
                        facets: ["gender:women", "gender:men", "gender:unisex"],
                    },
                    size: {
                        facets: ["size:onesize", "size:large", "size:xlarge"],
                    },
                    colour: {
                        facets: ["colour:red", "colour:blue", "colour:pink"],
                    },
                    foo: {}, // For when there are no facets
                },
                facets: {
                    "colour:red": {
                        n: "Red",
                        s: true,
                    },
                    "colour:blue": {
                        n: "Blue",
                    },
                    "colour:pink": {
                        n: "Pink",
                    },
                    "gender:women": {
                        n: "Women",
                    },
                    "gender:men": {
                        n: "Men",
                        s: true,
                    },
                    "gender:unisex": {
                        n: "Unisex",
                        s: true,
                    },
                    "size:onesize": {
                        n: "One Size",
                    },
                    "size:large": {
                        n: "Large",
                    },
                    "size:xlarge": {
                        n: "X Large",
                        s: true,
                    },
                },
            },
            request: {
                headers: {
                    "x-monorepo-language": "en",
                },
                gender: ["men"],
            },
        } as any) as State
        const result = selectSelectedFilterNames(state)
        expect(result).toEqual(["Unisex ", "X Large ", "Red "])
    })
    it("should not duplicate the category when exists in both filter and request", () => {
        const state = ({
            search: {
                filtersSort: ["gender", "size", "colour", "foo", "category"],
                filters: {
                    gender: {
                        facets: ["gender:women", "gender:men", "gender:unisex"],
                    },
                    size: {
                        facets: ["size:onesize", "size:large", "size:xlarge"],
                    },
                    colour: {
                        facets: ["colour:red", "colour:blue", "colour:pink"],
                    },
                    category: {
                        facets: ["category:dresses"],
                    },
                    foo: {}, // For when there are no facets
                },
                facets: {
                    "colour:red": {
                        n: "Red",
                        s: true,
                    },
                    "colour:blue": {
                        n: "Blue",
                    },
                    "colour:pink": {
                        n: "Pink",
                    },
                    "gender:women": {
                        n: "Women",
                    },
                    "gender:men": {
                        n: "Men",
                        s: true,
                    },
                    "gender:unisex": {
                        n: "Unisex",
                        s: true,
                    },
                    "size:onesize": {
                        n: "One Size",
                    },
                    "size:large": {
                        n: "Large",
                    },
                    "size:xlarge": {
                        n: "X Large",
                        s: true,
                    },
                    "category:dresses": {
                        n: "Dresses",
                        s: true,
                    },
                },
            },
            request: {
                headers: {
                    "x-monorepo-language": "en",
                },
                gender: ["men"],
                category: "Dresses",
            },
        } as any) as State
        const result = selectSelectedFilterNames(state)
        expect(result).toEqual(["Unisex ", "X Large ", "Red "])
    })
})
