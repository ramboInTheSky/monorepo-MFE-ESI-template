/* eslint-disable import/no-extraneous-dependencies */

import {renderHook, RenderHookResult, act, cleanup} from "@testing-library/react-hooks/pure"
import {useCallbackRef} from "."

describe("Given `useCallbackRef`", () => {
    describe("By default", () => {
        let hook: RenderHookResult<unknown, any[]>

        beforeAll(() => {
            hook = renderHook(() => useCallbackRef())
        })

        afterAll(() => {
            cleanup()
        })

        it("should return a `null` ref", () => {
            expect(hook.result.current[0]).toBe(null)
        })

        it("should allow for setting the ref", () => {
            act(() => {
                hook.result.current[1]("foo")
            })
            expect(hook.result.current[0]).toBe("foo")
        })

        it("should allow for setting the ref for null node", () => {
            act(() => {
                hook.result.current[1](null)
            })
            expect(hook.result.current[0]).toBe("foo")
        })
    })
})
