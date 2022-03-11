import {isTouchDevice} from "."

const originalWindow = {...window}

function mockWindow(value = originalWindow) {
    const spy = jest.spyOn(global, "window" as any, "get")
    spy.mockImplementation(() => value)
}

describe('Given a util "isTouchDevice"', () => {
    afterAll(() => {
        jest.restoreAllMocks()
    })

    it("should be a function", () => {
        expect(isTouchDevice).toBeInstanceOf(Function)
    })

    describe("When rendered on server", () => {
        it("should return false", () => {
            mockWindow(undefined)
            expect(isTouchDevice()).toBe(false)
        })
    })

    describe("When rendered on browser", () => {
        describe("and when is not touch device", () => {
            it("should return false", () => {
                mockWindow()
                expect(isTouchDevice()).toBe(false)
            })
        })

        describe("and when is touch device", () => {
            it("should return true", () => {
                mockWindow({...originalWindow, ontouchstart: jest.fn()} as any)
                expect(isTouchDevice()).toBe(true)
            })
        })
    })
})
