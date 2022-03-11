import * as windowUtils from "."
import executeOnLoad from "./executeOnLoad"

jest.mock(".")

const mockCallback = jest.fn()
describe("Given a executeOnLoad()", () => {
    describe("When window exists and document has not loaded ", () => {
        it("should add event listener", () => {
            const mockAddEventListener = jest.fn()
            jest.spyOn(windowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {
                            readyState: "loading",
                        },
                        addEventListener: mockAddEventListener,
                    } as any),
            )
            executeOnLoad(mockCallback)

            expect(mockAddEventListener).toHaveBeenCalledWith("load", mockCallback)
        })
    })
    describe("When window exists and document has loaded ", () => {
        it("should call the callback", () => {
            const mockAddEventListener = jest.fn()
            jest.spyOn(windowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {
                            readyState: "complete",
                        },
                        addEventListener: mockAddEventListener,
                    } as any),
            )
            executeOnLoad(mockCallback)

            expect(mockCallback).toHaveBeenCalled()
        })
    })
    describe("When window does not exist", () => {
        it("should return", () => {
            jest.spyOn(windowUtils, "getWindow").mockImplementationOnce(() => null)
            executeOnLoad(mockCallback)

            expect(mockCallback).not.toHaveBeenCalled()
        })
    })

    afterEach(() => {
        jest.resetAllMocks()
    })
})
