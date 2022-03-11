import {FooterModel, RegionModel, SubRegionModel, SubRegionElementModel} from "."

describe("Model - footerModel: ", () => {
    it("should match the FooterModel", () => {
        expect(new FooterModel()).toMatchSnapshot()
    })
    it("should match the RegionModel", () => {
        expect(new RegionModel()).toMatchSnapshot()
    })
    it("should match the SubRegionModel", () => {
        expect(new SubRegionModel()).toMatchSnapshot()
    })
    it("should match the SubRegionElementModel", () => {
        expect(new SubRegionElementModel()).toMatchSnapshot()
    })
})
