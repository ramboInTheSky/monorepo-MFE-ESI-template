import {triggerIEWindowResize} from "."

function mockWindow({createEvent, dispatchEvent}: any) {
    const originalWindow = {...window}
    const spy = jest.spyOn(global, "window" as any, "get")
    spy.mockImplementation(() => ({
        ...originalWindow,
        document: {
            ...originalWindow.document,
            createEvent,
        },
        dispatchEvent,
    }))
    return () => spy.mockRestore()
}

describe("Given a triggerIEWindowResize() util", () => {
    it("should be a function", () => {
        expect(triggerIEWindowResize).toBeInstanceOf(Function)
    })

    describe("When called", () => {
        const createEvenMockFn = jest.fn(() => ({initUIEvent: jest.fn()}))
        const dispatchWindowEventMockFn = jest.fn()
        let mockRestore: Function

        beforeAll(() => {
            mockRestore = mockWindow({createEvent: createEvenMockFn, dispatchEvent: dispatchWindowEventMockFn})
            triggerIEWindowResize()
        })

        afterAll(() => {
            mockRestore()
        })

        it("should create an event", () => {
            expect(createEvenMockFn).toHaveBeenCalledWith("UIEvents")
        })

        it("should dispatch the event", () => {
            expect(dispatchWindowEventMockFn).toHaveBeenCalledWith({initUIEvent: expect.any(Function)})
        })
    })
})
