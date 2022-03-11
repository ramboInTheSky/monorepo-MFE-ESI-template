import {DynamicColumnAdjustment} from "."

describe("Utils: DynamicColumnAdjustment - ", () => {
    it("should return 6 if there are 2 items", () => {
        expect(DynamicColumnAdjustment(2)).toEqual(6)
    })
    it("should return 4 if there are 3 items", () => {
        expect(DynamicColumnAdjustment(3)).toEqual(4)
    })
    it("should return 3 if there are 4 items", () => {
        expect(DynamicColumnAdjustment(4)).toEqual(3)
    })
    it("should return 2 if there are 6 items", () => {
        expect(DynamicColumnAdjustment(6)).toEqual(2)
    })
    it("should return 1 if there are 12 items", () => {
        expect(DynamicColumnAdjustment(12)).toEqual(1)
    })

    it("should defaulted to 12 if there are 16 items", () => {
        expect(DynamicColumnAdjustment(16)).toEqual(12)
    })
})
