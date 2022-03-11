import {getWindow} from "."

describe("When calling getWindow", () => {
    let windowSpy: ReturnType<typeof jest.spyOn>

    beforeEach(() => {
        windowSpy = jest.spyOn(window, "window", "get")
    })

    afterEach(() => {
        windowSpy.mockRestore()
    })

    it("should return the window", () => {
        expect(getWindow()).toBe(window)
    })

    describe("when not on browser", () => {
        it("should return null", () => {
            windowSpy.mockReturnValue(undefined)
            expect(getWindow()).toBe(null)
        })
    })
})
