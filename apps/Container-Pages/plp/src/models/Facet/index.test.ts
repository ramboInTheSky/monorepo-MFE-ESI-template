import {Facets, Facet} from "."

describe("Model - Facets: ", () => {
    const mockFacets = new Facets()
    mockFacets.test = new Facet()
    it("should match the Facets", () => {
        expect(mockFacets).toMatchSnapshot()
    })
})
