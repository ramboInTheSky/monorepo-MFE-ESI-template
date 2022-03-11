/* eslint-disable import/no-extraneous-dependencies */

import {renderHook} from "@testing-library/react-hooks"
import {useOnScrollEnd} from "."

jest.useFakeTimers()

type Scenario = ReturnType<typeof mockScenario>

function mockScenario() {
    const mocks = {
        addEventListener: jest.spyOn(document, "addEventListener"),
        removeEventListener: jest.spyOn(document, "removeEventListener"),
    }

    const scrollHandler = {
        execute: () => null,
    }

    mocks.addEventListener.mockImplementation((eventName, handler) => {
        if (eventName === "scroll") {
            scrollHandler.execute = handler as any
        }
    })

    const scenario = {
        scroll: () => {
            scrollHandler.execute()
        },
        cleanup: () => {
            mocks.addEventListener.mockRestore()
            mocks.removeEventListener.mockRestore()
        },
    }

    return scenario
}

describe("Given `useOnScrollEnd`", () => {
    describe("When mounted", () => {
        let scenario: Scenario

        beforeEach(() => {
            scenario = mockScenario()
        })

        afterEach(() => scenario.cleanup())

        it("should call the callback 66ms after scrolling stops", () => {
            const callback = jest.fn()
            renderHook(() => useOnScrollEnd(callback))
            scenario.scroll()
            jest.advanceTimersByTime(65)
            scenario.scroll()
            jest.advanceTimersByTime(65)
            scenario.scroll()
            jest.advanceTimersByTime(65)
            expect(callback).not.toHaveBeenCalled()
            jest.advanceTimersByTime(66)
            expect(callback).toHaveBeenCalledTimes(1)
        })
    })

    describe("When dependencies have been supplied", () => {
        let scenario: Scenario

        beforeEach(() => {
            scenario = mockScenario()
        })

        afterEach(() => scenario.cleanup())

        it("should track the dependencies properly", () => {
            const callback = jest.fn()
            const {rerender} = renderHook((deps: any[] = [1, 2, 3]) => useOnScrollEnd(callback, deps))
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(document.addEventListener).toHaveBeenCalledTimes(1)
            rerender()
            rerender()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(document.addEventListener).toHaveBeenCalledTimes(1)
            rerender([4, 5, 6])
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(document.addEventListener).toHaveBeenCalledTimes(2)
        })
    })

    describe("When unmounted", () => {
        let scenario: Scenario

        beforeEach(() => {
            scenario = mockScenario()
        })

        afterEach(() => scenario.cleanup())

        it("should deregister the scroll listener", () => {
            const callback = jest.fn()
            const {unmount} = renderHook(() => useOnScrollEnd(callback))
            unmount()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(document.removeEventListener).toHaveBeenCalledWith("scroll", expect.anything())
        })
    })
})
