import {showFitsIcons} from "./showFitsIcons"
import {SaleSashPosition} from "../../../config/constants"

describe("Given a showFitsIcons helper", () => {
    it("When not on sale, it should return true", () => {
        expect(showFitsIcons(false, SaleSashPosition.BR)).toEqual(true)
    })
    it("When on sale and shown in the top left, it should return true", () => {
        expect(showFitsIcons(true, SaleSashPosition.TL)).toEqual(true)
    })
    it("When on sale and shown in the top right, it should return true", () => {
        expect(showFitsIcons(true, SaleSashPosition.TR)).toEqual(true)
    })
    it("When on sale and shown in the bottom right, it should return false", () => {
        expect(showFitsIcons(true, SaleSashPosition.BR)).toEqual(false)
    })
    it("When on sale and shown in the bottom left, it should return false", () => {
        expect(showFitsIcons(true, SaleSashPosition.BL)).toEqual(false)
    })
})
