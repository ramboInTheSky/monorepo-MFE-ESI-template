import {HeaderModel, RegionModel, MyAccountElements, ElementModel} from "."

describe("Model - headerModel: ", () => {
    it("should match the HeaderModel", () => {
        expect(new HeaderModel()).toMatchSnapshot()
    })
    it("should match the RegionModel", () => {
        expect(new RegionModel()).toMatchSnapshot()
    })
    it("should match the SubRegionModel", () => {
        expect(new MyAccountElements()).toMatchSnapshot()
    })
    it("should match the SubRegionElementModel", () => {
        expect(new ElementModel()).toMatchSnapshot()
    })
})
