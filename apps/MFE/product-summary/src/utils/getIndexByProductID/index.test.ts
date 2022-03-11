import {getIndexByProductID} from "."
import {PRODUCT_SUMMARY_TILE_ID} from "../../config/constants"

describe("Given a getIndexByProductID util", () => {
    describe("when called with no corresponding div present", () => {
        it("should not break if there is no productSummary element", () => {
            const res = getIndexByProductID("0")
            expect(res).toBe(0)
        })
    })

    describe("when called with corresponding div present", () => {
        it("should return a position if the data-attribute exists", () => {
            const newDiv = document.createElement("div")
            newDiv.setAttribute("id", `${PRODUCT_SUMMARY_TILE_ID}-160396`)
            newDiv.setAttribute("data-index", "16")
            document.body.appendChild(newDiv)

            const res = getIndexByProductID("160396")
            expect(res).toBe(17)
        })
    })

    describe("when called with non-number data-index", () => {
        it("should return empty string if the data-attribute does not exist", () => {
            const newDiv = document.createElement("div")
            newDiv.setAttribute("id", `${PRODUCT_SUMMARY_TILE_ID}-160397`)
            document.body.appendChild(newDiv)

            const res = getIndexByProductID("160397")
            expect(res).toBe(0)
        })
    })
})
