import {SupportedFeatureTypes, SupportedFeatures, SupportedFeatureSwitch} from "."

describe("Model - features: ", () => {
    it("should match the SupportedFeatureTypes", () => {
        expect(SupportedFeatureTypes).toMatchSnapshot()
    })
    it("should match the SupportedFeatures", () => {
        expect(new SupportedFeatures()).toMatchSnapshot()
    })
    it("should match the SupportedFeatureSwitch", () => {
        expect(new SupportedFeatureSwitch()).toMatchSnapshot()
    })
})
