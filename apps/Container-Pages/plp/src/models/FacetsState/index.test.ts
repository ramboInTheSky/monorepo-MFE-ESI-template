import {FacetsState, FacetState, FacetsAlphabetValues} from "."

describe("Model - FacetsState: ", () => {
    const mockFacetsState = new FacetsState()
    mockFacetsState.test = new FacetState()
    it("should match the FacetsState", () => {
        expect(mockFacetsState).toMatchSnapshot()
    })

    it("should match FiltersAlphabetValues", () => {
        expect(FacetsAlphabetValues).toMatchSnapshot()
    })
})
