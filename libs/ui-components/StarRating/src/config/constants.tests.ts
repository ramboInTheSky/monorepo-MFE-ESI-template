import {
    defaultFilledColour,
    defaultEmptyColour,
    defaultSize,
    precision
} from "./constants"

describe("Given Constants", () => {
    describe("Should match expected", () => {
        it("should match expected defaultFilledColour", () => {
            expect(defaultFilledColour).toMatchSnapshot()
        })
        it("should match expected defaultEmptyColour", () => {
            expect(defaultEmptyColour).toMatchSnapshot()
        })
        it("should match expected defaultSize", () => {
            expect(defaultSize).toMatchSnapshot()
        })
        it("should match expected precision", () => {
            expect(precision).toMatchSnapshot()
        })
    })
})
