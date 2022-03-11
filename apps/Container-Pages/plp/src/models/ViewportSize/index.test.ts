import {ViewportSizes, deviceBreakpoints} from "."

describe("Model - ViewportSize: ", () => {
    it("should match the desktop", () => {
        const mockTestState: ViewportSizes = "desktop"
        expect(mockTestState).toMatchSnapshot()
    })
    it("should match the tablet", () => {
        const mockTestState: ViewportSizes = "tablet"
        expect(mockTestState).toMatchSnapshot()
    })
    it("should match the mobile", () => {
        const mockTestState: ViewportSizes = "mobile"
        expect(mockTestState).toMatchSnapshot()
    })
    it("should match the deviceBreakpoints", () => {
        expect(deviceBreakpoints).toMatchSnapshot()
    })
})
