import {FeatureSwitch} from "."

describe("Model - FeatureSwitch: ", () => {
    const mockTestState: FeatureSwitch = {
        enablePageInFilters: false,
        enableSearchBanners: false,
    }
    it("should match the FeatureSwitch", () => {
        expect(mockTestState).toMatchSnapshot()
    })
})
