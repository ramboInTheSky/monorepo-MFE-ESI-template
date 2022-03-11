/* eslint-disable import/no-extraneous-dependencies */

import {renderHook} from "@testing-library/react-hooks"

// These mocks should be imported before
// the modules that they are mocking
import {
    mockIsAboveViewport,
    mockIsBelowViewport,
    mockIsSomewhatInViewport,
    mockGetDocumentScrollTop,
} from "../../utils/window/__mocks__"

import * as UpScrollPosition from "./useUpScrollPosition"
import {isAboveViewport, isBelowViewport, isSomewhatInViewport} from "../../utils/window"
import {createElementWithChildren} from "../../../__mocks__/dom"
import {useInfiniteScrollHelpers} from "./useInfiniteScrollHelpers"
import {DOWN, UP} from "./types"

jest.mock("./utils")

const defaultOptions = {
    startPage: 5,
    totalItems: 24,
    itemsPerPage: 24,
    gridContainerElement: createElementWithChildren(24),
}

describe("Given `useInfiniteScrollHelpers`", () => {
    describe("getScrollDirection()", () => {
        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return the scroll direction", () => {
            const {result, rerender} = renderHook(() => useInfiniteScrollHelpers(defaultOptions))
            mockGetDocumentScrollTop(10)
            expect(result.current.getScrollDirection()).toBe(DOWN)
            rerender()
            mockGetDocumentScrollTop(5)
            expect(result.current.getScrollDirection()).toBe(UP)
        })
    })
})

describe("isTimeToFetchNextPage()", () => {
    describe("When fetch trigger is somewhat in the viewport", () => {
        beforeEach(() => {
            mockIsSomewhatInViewport(true)
            mockIsAboveViewport(false)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return `true`", () => {
            const fetchTrigger = document.createElement("div")
            const hook = renderHook(() => useInfiniteScrollHelpers(defaultOptions))
            const result = hook.result.current.isTimeToFetchNextPage(fetchTrigger)
            expect(result).toBe(true)
        })
    })

    describe("When fetch trigger is above the viewport", () => {
        beforeEach(() => {
            mockIsSomewhatInViewport(false)
            mockIsAboveViewport(true)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return true", () => {
            const fetchTrigger = document.createElement("div")
            const hook = renderHook(() => useInfiniteScrollHelpers(defaultOptions))
            const result = hook.result.current.isTimeToFetchNextPage(fetchTrigger)
            expect(result).toBe(true)
        })
    })

    describe("Otherwise", () => {
        beforeEach(() => {
            mockIsAboveViewport(false)
            mockIsSomewhatInViewport(false)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return `false`", () => {
            const fetchTrigger = document.createElement("div")
            const hook = renderHook(() => useInfiniteScrollHelpers(defaultOptions))
            const result = hook.result.current.isTimeToFetchNextPage(fetchTrigger)
            expect(result).toBe(false)
            expect(isAboveViewport).toHaveBeenCalledWith(fetchTrigger)
            expect(isSomewhatInViewport).toHaveBeenCalledWith(fetchTrigger)
        })
    })
})

describe("isTimeToFetchPreviousPage()", () => {
    describe("When fetch trigger is somewhat in the viewport", () => {
        beforeEach(() => {
            mockIsBelowViewport(false)
            mockIsSomewhatInViewport(true)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return `true`", () => {
            const fetchTrigger = document.createElement("div")
            const hook = renderHook(() => useInfiniteScrollHelpers(defaultOptions))
            const result = hook.result.current.isTimeToFetchPreviousPage(fetchTrigger)
            expect(result).toBe(true)
        })
    })

    describe("When fetch trigger is below the viewport", () => {
        beforeEach(() => {
            mockIsBelowViewport(true)
            mockIsSomewhatInViewport(false)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return true", () => {
            const fetchTrigger = document.createElement("div")
            const hook = renderHook(() => useInfiniteScrollHelpers(defaultOptions))
            const result = hook.result.current.isTimeToFetchPreviousPage(fetchTrigger)
            expect(result).toBe(true)
        })
    })

    describe("Otherwise", () => {
        beforeEach(() => {
            mockIsBelowViewport(false)
            mockIsSomewhatInViewport(false)
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should return `false`", () => {
            const fetchTrigger = document.createElement("div")
            const hook = renderHook(() => useInfiniteScrollHelpers(defaultOptions))
            const result = hook.result.current.isTimeToFetchPreviousPage(fetchTrigger)
            expect(result).toBe(false)
            expect(isBelowViewport).toHaveBeenCalledWith(fetchTrigger)
            expect(isSomewhatInViewport).toHaveBeenCalledWith(fetchTrigger)
        })
    })
})

describe("waitForPageToRerender()", () => {
    // eslint-disable-next-line
    it("should resolve when the rerender has occurred", done => {
        const initialProps = {...defaultOptions, totalItems: 24, itemsPerPage: 24}
        const hook = renderHook(options => useInfiniteScrollHelpers(options), {initialProps})
        const promise = hook.result.current.waitForPageToRerender()

        // If this promise resolves, then it worked
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        promise.then(() => done())

        // The promise should resolve when more pages of items are supplied
        hook.rerender({...initialProps, totalItems: 48})
    })
})

describe("restoreUpScrollPosition", () => {
    let useUpScrollPosition
    const restore = jest.fn()

    beforeEach(() => {
        jest.spyOn(UpScrollPosition, "useUpScrollPosition").mockReturnValue({restore})
        useUpScrollPosition = UpScrollPosition.useUpScrollPosition
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should use the `useUpScrollPosition` hook", () => {
        const hook = renderHook(() => useInfiniteScrollHelpers(defaultOptions))

        expect(useUpScrollPosition).toHaveBeenCalledWith(defaultOptions)
        expect(restore).not.toHaveBeenCalled()

        hook.result.current.restoreUpScrollPosition()

        expect(restore).toHaveBeenCalledTimes(1)
    })
})
