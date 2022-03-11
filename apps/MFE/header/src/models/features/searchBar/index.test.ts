import {SupportedSearchBar, FeatureSwitchData} from "."

describe("Model - features/searchBar: ", () => {
    it("should match the SupportedSearchBar", () => {
        expect(SupportedSearchBar).toMatchSnapshot()
    })

    it("should match the FeatureSwitchData", () => {
        expect(new FeatureSwitchData()).toMatchSnapshot()
    })
})
