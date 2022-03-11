import getWindow from "."

describe("When calling getWindow", () => {
    it("should return the window", () => {
        expect(getWindow()).toBe(window)
    })
})
