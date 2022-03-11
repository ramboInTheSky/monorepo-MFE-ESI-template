import {renderHook} from "@testing-library/react-hooks"

import * as WindowsUtils from "../../utils/window"
import {useIsOnClient} from "."

function mockIsBrowserReturnedValue(value: boolean) {
    jest.spyOn(WindowsUtils, "IS_BROWSER").mockReturnValue(value)
}

describe("Given a useIsOnClient hook", () => {
    it("should have the correct default values", () => {
        mockIsBrowserReturnedValue(null as any)
        const {result} = renderHook(() => useIsOnClient())
        expect(result.current).toEqual({
            isOnClient: false,
        })
    })

    describe("when is on client", () => {
        beforeEach(() => {
            mockIsBrowserReturnedValue(true)
        })

        it("should set 'isOnClient' value to 'true'", () => {
            const {result} = renderHook(() => useIsOnClient())
            expect(result.current.isOnClient).toBe(true)
        })

        describe("and when it has a callback function", () => {
            it("should trigger the callback", () => {
                const mockCallback = jest.fn()
                renderHook(val => useIsOnClient(val), {initialProps: mockCallback})

                expect(mockCallback).toHaveBeenCalledWith()
            })
        })
    })

    describe("when is on server", () => {
        it("should set 'isOnClient' value to 'false'", () => {
            mockIsBrowserReturnedValue(false)
            const {result} = renderHook(() => useIsOnClient())
            expect(result.current.isOnClient).toBe(false)
        })
    })
})
