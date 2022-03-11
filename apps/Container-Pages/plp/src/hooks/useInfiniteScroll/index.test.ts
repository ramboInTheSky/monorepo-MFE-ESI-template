/* eslint-disable import/no-extraneous-dependencies */

import {act} from "react-dom/test-utils"
import {renderHook} from "@testing-library/react-hooks"
import {DOWN, ScrollDirection, UP} from "./types"
import {useInfiniteScroll} from "."
import {createElementWithChildren} from "../../../__mocks__/dom"
import wait from "../../../__mocks__/wait"
import {useInfiniteScrollHelpers} from "./useInfiniteScrollHelpers"

jest.mock("./useInfiniteScrollHelpers")

type StatefulHelpers = ReturnType<typeof mockUseInfiniteScrollHelpers>
interface StatefulHelperOptions {
    scrollDirection?: ScrollDirection
    isTimeToFetchNextPage?: boolean
    isTimeToFetchPreviousPage?: boolean
}

function mockUseInfiniteScrollHelpers({
    scrollDirection = null,
    isTimeToFetchNextPage = false,
    isTimeToFetchPreviousPage = false,
}: StatefulHelperOptions = {}) {
    const helpers = {
        getScrollDirection: jest.fn(() => scrollDirection),
        isTimeToFetchNextPage: jest.fn(() => isTimeToFetchNextPage),
        isTimeToFetchPreviousPage: jest.fn(() => isTimeToFetchPreviousPage),
        restoreUpScrollPosition: jest.fn(),
        waitForPageToRerender: jest.fn(async () => {
            await wait(500)
        }),
    }
    ;(useInfiniteScrollHelpers as jest.Mock).mockReturnValue(helpers)
    return helpers
}

const defaultOptions = {
    endPage: 5,
    startPage: 5,
    totalItems: 24,
    hasNextPage: true,
    itemsPerPage: 24,
    hasPreviousPage: false,
    isFetchingNextPage: false,
    isFetchingPreviousPage: false,
    isFetchingPageItems: false,
    gridContainerElement: createElementWithChildren(24),
    fetchNextPage: jest.fn(() => Promise.resolve()),
    fetchPreviousPage: jest.fn(() => Promise.resolve()),
}

describe("Given `useInfiniteScroll`", () => {
    describe("By default", () => {
        it("should properly use the infinite scroll helpers", () => {
            renderHook(() => useInfiniteScroll(defaultOptions))
            expect(useInfiniteScrollHelpers).not.toHaveBeenCalledWith({
                totalItems: defaultOptions.totalItems,
                itemsPerPag: defaultOptions.itemsPerPage,
                gridContainerElement: defaultOptions.gridContainerElement,
                fetchTriggerOffset: 8,
            })
        })
    })

    describe("When the grid container element is not available", () => {
        beforeEach(() => {
            mockUseInfiniteScrollHelpers({scrollDirection: DOWN, isTimeToFetchNextPage: true})
        })

        afterEach(() => {
            jest.clearAllMocks()
        })

        it("should do nothing", async () => {
            const options = {
                ...defaultOptions,
                endPage: 5,
                startPage: 5,
                hasNextPage: true,
                isFetchingNextPage: false,
                gridContainerElement: null,
            }
            const {result} = renderHook(() => useInfiniteScroll(options))
            await act(() => result.current.handleScroll())
            expect(options.fetchNextPage).not.toHaveBeenCalled()
        })
    })
    describe("When scrolling down", () => {
        describe("and there is a next page", () => {
            beforeEach(() => {
                mockUseInfiniteScrollHelpers({scrollDirection: DOWN, isTimeToFetchNextPage: true})
            })

            afterEach(() => {
                jest.clearAllMocks()
            })

            it("should fetch the next page of items", async () => {
                const options = {
                    ...defaultOptions,
                    endPage: 5,
                    startPage: 5,
                    hasNextPage: true,
                    isFetchingNextPage: false,
                    onBeforeFetchingPreviousPage: jest.fn(),
                    onAfterRestoringUpScrollPosition: jest.fn(),
                }
                const {result} = renderHook(() => useInfiniteScroll(options))
                await act(() => result.current.handleScroll())
                expect(options.fetchNextPage).toHaveBeenCalledTimes(1)
                expect(options.onBeforeFetchingPreviousPage).not.toHaveBeenCalled()
                expect(options.onAfterRestoringUpScrollPosition).not.toHaveBeenCalled()
            })
        })
        describe("and the filters are being triggered", () => {
            beforeEach(() => {
                mockUseInfiniteScrollHelpers({scrollDirection: DOWN, isTimeToFetchNextPage: true})
            })

            afterEach(() => {
                jest.clearAllMocks()
            })

            it("should fetch the next page of items", async () => {
                const options = {
                    ...defaultOptions,
                    endPage: 5,
                    startPage: 5,
                    hasNextPage: true,
                    isFetchingNextPage: false,
                    isFetchingPageItems: true,
                    onBeforeFetchingPreviousPage: jest.fn(),
                    onAfterRestoringUpScrollPosition: jest.fn(),
                }
                const {result} = renderHook(() => useInfiniteScroll(options))
                await act(() => result.current.handleScroll())
                expect(options.fetchNextPage).toHaveBeenCalledTimes(1)
                expect(options.onBeforeFetchingPreviousPage).not.toHaveBeenCalled()
                expect(options.onAfterRestoringUpScrollPosition).not.toHaveBeenCalled()
            })
        })

        describe("and there isn't a next page", () => {
            beforeEach(() => {
                mockUseInfiniteScrollHelpers({scrollDirection: DOWN, isTimeToFetchNextPage: true})
            })

            afterEach(() => {
                jest.clearAllMocks()
            })

            it("should not fetch the next page", async () => {
                const options = {
                    ...defaultOptions,
                    endPage: 5,
                    startPage: 5,
                    hasNextPage: false,
                    isFetchingNextPage: false,
                }
                const {result} = renderHook(() => useInfiniteScroll(options))
                await act(() => result.current.handleScroll())
                expect(options.fetchNextPage).not.toHaveBeenCalled()
            })
        })

        describe("and the next page fetch fails", () => {
            beforeEach(() => {
                mockUseInfiniteScrollHelpers({scrollDirection: DOWN, isTimeToFetchNextPage: true})
            })

            afterEach(() => {
                jest.clearAllMocks()
            })

            it("should handle it gracefully", async () => {
                const options = {
                    ...defaultOptions,
                    endPage: 5,
                    startPage: 5,
                    hasPreviousPage: true,
                    isFetchingPreviousPage: false,
                    fetchNextPage: () => Promise.reject(new Error("Oops...")),
                }
                const {result} = renderHook(() => useInfiniteScroll(options))
                await act(() => result.current.handleScroll())
                expect(result.error).toBeUndefined()
            })
        })
    })

    describe("When scrolling up", () => {
        describe("and there is a previous page", () => {
            let helpers: StatefulHelpers

            beforeEach(() => {
                helpers = mockUseInfiniteScrollHelpers({scrollDirection: UP, isTimeToFetchPreviousPage: true})
            })

            afterEach(() => {
                jest.clearAllMocks()
            })
            it("Should fetch the previous page of items", async () => {
                const calls: string[] = []

                helpers.restoreUpScrollPosition.mockImplementation(() => calls.push("restore up scroll"))

                const options = {
                    ...defaultOptions,
                    endPage: 5,
                    startPage: 5,
                    hasPreviousPage: true,
                    isFetchingPreviousPage: false,
                    onBeforeFetchingPreviousPage: jest.fn(() => calls.push("before fetch")),
                    onAfterRestoringUpScrollPosition: jest.fn(() => calls.push("after up scroll restoration")),
                    fetchPreviousPage: jest.fn(() => calls.push("fetch")) as any,
                }
                const {result} = renderHook(() => useInfiniteScroll(options))
                await act(() => result.current.handleScroll())
                expect(options.fetchPreviousPage).toHaveBeenCalledTimes(1)
                expect(helpers.restoreUpScrollPosition).toHaveBeenCalledTimes(1)
                expect(calls).toEqual(["before fetch", "fetch", "restore up scroll", "after up scroll restoration"])
            })
        })

        describe("and there isnt a previous page", () => {
            let helpers: StatefulHelpers

            beforeEach(() => {
                helpers = mockUseInfiniteScrollHelpers({scrollDirection: UP, isTimeToFetchPreviousPage: true})
            })

            afterEach(() => {
                jest.clearAllMocks()
            })

            it("Should not fetch the previous page of items", async () => {
                const options = {
                    ...defaultOptions,
                    endPage: 5,
                    startPage: 5,
                    hasPreviousPage: false,
                    isFetchingPreviousPage: false,
                }
                const {result} = renderHook(() => useInfiniteScroll(options))
                await act(() => result.current.handleScroll())
                expect(options.fetchPreviousPage).not.toHaveBeenCalledTimes(1)
                expect(helpers.restoreUpScrollPosition).not.toHaveBeenCalledTimes(1)
            })
        })

        describe("and the previous page fetch fails", () => {
            let helpers: StatefulHelpers

            beforeEach(() => {
                helpers = mockUseInfiniteScrollHelpers({scrollDirection: UP, isTimeToFetchPreviousPage: true})
            })

            afterEach(() => {
                jest.clearAllMocks()
            })

            it("should handle it gracefully", async () => {
                const options = {
                    ...defaultOptions,
                    endPage: 5,
                    startPage: 5,
                    hasPreviousPage: true,
                    isFetchingPreviousPage: false,
                    fetchPreviousPage: () => Promise.reject(new Error("Oops...")),
                }
                const {result} = renderHook(() => useInfiniteScroll(options))
                await act(() => result.current.handleScroll())
                expect(result.error).toBeUndefined()
                expect(helpers.restoreUpScrollPosition).not.toHaveBeenCalledTimes(1)
            })
        })
    })
})
