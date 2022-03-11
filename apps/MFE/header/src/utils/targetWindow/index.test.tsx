import {targetWindow, targetWindowType} from "."

describe("Utils: TargetWindow - ", () => {
    it("should return _blank", () => {
        const openNewWindow = true
        expect(targetWindow(openNewWindow)).toEqual(targetWindowType.NewWindow)
    })
    it("should return _self", () => {
        const openNewWindow = false
        expect(targetWindow(openNewWindow)).toEqual(targetWindowType.SameWindow)
    })
})
