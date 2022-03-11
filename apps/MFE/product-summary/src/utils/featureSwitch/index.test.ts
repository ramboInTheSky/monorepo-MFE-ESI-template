import {doGoogleAnalytics} from "."
import * as getWindowUtils from "../window"

jest.mock("../window", () => ({
    getWindow: jest.fn(() => ({
        document: {getElementById: jest.fn(() => ({}))},
    })),
}))

afterAll(() => {
    jest.resetAllMocks()
})

describe("Given a doGoogleAnalytics", () => {
    describe("When run on the server", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(() => null)
        })
        it("should return false", () => {
            expect(doGoogleAnalytics()).toEqual(false)
        })
    })
    describe("When run on PLP", () => {
        beforeAll(() => {
            jest.spyOn(getWindowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        GoogleAnalyticsNext: {},
                    } as any),
            )
        })
        it("should return true", () => {
            expect(doGoogleAnalytics()).toEqual(true)
        })
    })
})
