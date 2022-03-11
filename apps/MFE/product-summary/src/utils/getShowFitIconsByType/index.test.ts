import {getShowFitIconsByType} from "."
import {showFitsIcons} from "./showFitsIcons"

jest.mock("./showFitsIcons", () => ({
    showFitsIcons: jest.fn(() => true),
}))

describe("Given a getShowFitIconsByType()", () => {
    describe("When type is suit", () => {
        it("should return the correct value", () => {
            expect(getShowFitIconsByType("suit", {isOnSale: true, saleSashPosition: null})).toBe(false)
        })
    })

    describe("When type is product", () => {
        it("should return the correct value", () => {
            expect(getShowFitIconsByType("product", {isOnSale: true, saleSashPosition: "test" as any})).toBe(true)
            expect(showFitsIcons).toHaveBeenCalledWith(true, "test")
        })
    })

    describe("When type is not known", () => {
        it("should return the correct value", () => {
            expect(getShowFitIconsByType("unknown" as any, {isOnSale: true, saleSashPosition: null})).toBe(false)
        })
    })
})
