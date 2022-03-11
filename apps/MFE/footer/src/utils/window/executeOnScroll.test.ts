import * as windowUtils from "."
import executeOnScroll from "./executeOnScroll"

jest.mock(".")

const mockCallback = jest.fn()
let actualOnScroll
const mockAddEventListener = jest.fn((_event, onScroll) => {
    actualOnScroll = onScroll
})
const mockRemoveEventListener = jest.fn()

describe("Given a executeOnScroll()", () => {
    describe("When window exists ", () => {
        beforeEach(() => {
            jest.useFakeTimers()
            jest.spyOn(windowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {
                            readyState: "loading",
                        },
                        addEventListener: mockAddEventListener,
                        removeEventListener: mockRemoveEventListener,
                    } as any),
            )
            executeOnScroll(mockCallback)
        })
        it("should add event listener", () => {
            expect(mockAddEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
            expect(mockAddEventListener).toHaveBeenCalledWith("resize", expect.any(Function))
        })
        describe("When the user scrolls", () => {
            it("should add a on scroll event that fires the callback", () => {
                actualOnScroll()
                expect(mockCallback).toBeCalled()
                expect(mockRemoveEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
                expect(mockRemoveEventListener).toHaveBeenCalledWith("resize", expect.any(Function))
            })
        })

        it("should set up a timer", () => {
            expect(setTimeout).toHaveBeenCalledTimes(1)
            expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000)
        })
        describe("When the timer completes", () => {
            beforeAll(() => {
                mockRemoveEventListener.mockReset()
                mockRemoveEventListener.mockReset()
                mockCallback.mockReset()
                jest.runAllTimers()
            })
            it("should remove events ", () => {
                expect(mockRemoveEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
                expect(mockRemoveEventListener).toHaveBeenCalledWith("resize", expect.any(Function))
            })

            it("should call the callback", () => {
                expect(mockCallback).toBeCalled()
            })
        })
        afterAll(() => {
            jest.resetAllMocks()
        })
    })

    describe("When window does not exist", () => {
        it("should return", () => {
            jest.spyOn(windowUtils, "getWindow").mockImplementationOnce(() => null)
            executeOnScroll(mockCallback)

            expect(mockAddEventListener).not.toHaveBeenCalled()
        })

        afterAll(() => {
            jest.resetAllMocks()
        })
    })
})
