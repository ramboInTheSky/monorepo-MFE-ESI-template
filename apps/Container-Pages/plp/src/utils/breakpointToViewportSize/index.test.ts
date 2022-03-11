import breakpointToViewportSize from "."

describe("Utils: breakpointToViewportSize", () => {
    it("should return mobile when passing xs", () => {
        expect(breakpointToViewportSize("xs")).toEqual("mobile")
    })
    it("should return mobile when passing sm", () => {
        expect(breakpointToViewportSize("sm")).toEqual("mobile")
    })
    it("should return mobile when passing md", () => {
        expect(breakpointToViewportSize("md")).toEqual("tablet")
    })
    it("should return mobile when passing lg", () => {
        expect(breakpointToViewportSize("lg")).toEqual("desktop")
    })
    it("should return mobile when passing xl", () => {
        expect(breakpointToViewportSize("xl")).toEqual("desktop")
    })
})
