/* eslint-disable import/no-extraneous-dependencies */

import {renderHook} from "@testing-library/react-hooks"
import {HISTORY_EVENT} from "../../config/constants"
import {getElementOffset, isSomewhatInViewport} from "../../utils/window"
import {helpers, ScrolledPageInfo, useScrollPositionTracking} from "./useScrollPositionTracking"
import {mockWindowLocation, createElementWithChildren} from "../../../__mocks__/dom"
import {useOnScrollEnd} from "../../hooks/useOnScrollEnd"
import wait from "../../../__mocks__/wait"

jest.mock("../../hooks/useOnScrollEnd")
jest.mock("../../utils/window", () => ({
    isSomewhatInViewport: jest.fn(),
    getElementOffset: jest.fn(),
}))

type Scenario = ReturnType<typeof mockScenario>

function mockScenario(mockScrollToValue = 3652) {
    const expected = {
        replacementUrl: "/some/url",
        scrolledPageInfo: ({foo: "bar"} as any) as ScrolledPageInfo,
        scrollTopToPersist: mockScrollToValue,
    }

    const mocks = {
        useOnScrollEnd: useOnScrollEnd as jest.Mock,
        getScrolledPageInfo: jest.spyOn(helpers, "getScrolledPageInfo").mockReturnValue(expected.scrolledPageInfo),
        createReplacementUrl: jest.spyOn(helpers, "createReplacementUrl").mockReturnValue(expected.replacementUrl),
        replaceCurrentBrowserUrl: jest.spyOn(helpers, "replaceCurrentBrowserUrl"),
        calculateScrollTopToPersist: jest
            .spyOn(helpers, "calculateScrollTopToPersist")
            .mockReturnValue(expected.scrollTopToPersist),
    }

    const handler = {execute: () => null}
    mocks.useOnScrollEnd.mockImplementation(fn => {
        handler.execute = fn
    })

    const scenario = {
        cleanup: () => {
            mocks.useOnScrollEnd.mockClear()
            mocks.getScrolledPageInfo.mockRestore()
            mocks.createReplacementUrl.mockRestore()
            mocks.replaceCurrentBrowserUrl.mockRestore()
            mocks.calculateScrollTopToPersist.mockRestore()
        },
        simulateScrollEnd: () => handler.execute(),
        expected,
        handler,
    }

    return scenario
}

describe("Given `useScrollPositionTracking`", () => {
    const options = {
        startPage: 1,
        itemsPerPage: 24,
        gridContainerElement: createElementWithChildren(24),
    }

    describe("When not having scrolled", () => {
        let scenario: Scenario

        beforeEach(async () => {
            scenario = mockScenario()
            renderHook(() => useScrollPositionTracking(options))
            await wait(500)
        })

        afterEach(() => scenario.cleanup())

        it("should do nothing", () => {
            expect(helpers.replaceCurrentBrowserUrl).not.toHaveBeenCalled()
        })
    })

    describe("When the `gridContainerElement` is not available", () => {
        let scenario: Scenario

        beforeEach(() => {
            scenario = mockScenario()
            renderHook(() => useScrollPositionTracking({...options, gridContainerElement: null}))
            scenario.simulateScrollEnd()
        })

        afterEach(() => scenario.cleanup())

        it("should do nothing", () => {
            expect(helpers.replaceCurrentBrowserUrl).not.toHaveBeenCalled()
        })
    })

    describe("When the `gridContainerElement` is no children", () => {
        let scenario: Scenario

        beforeEach(() => {
            scenario = mockScenario()
            renderHook(() =>
                useScrollPositionTracking({...options, gridContainerElement: document.createElement("div")}),
            )
            scenario.simulateScrollEnd()
        })

        afterEach(() => scenario.cleanup())

        it("should do nothing", () => {
            expect(helpers.replaceCurrentBrowserUrl).not.toHaveBeenCalled()
        })
    })

    describe("When the page is scrolled", () => {
        let scenario: Scenario

        beforeEach(() => {
            scenario = mockScenario()
            renderHook(() => useScrollPositionTracking(options))
            scenario.simulateScrollEnd()
        })

        afterEach(() => scenario.cleanup())
        it("should update the page and scroll position on the browser url", () => {
            const {expected} = scenario
            expect(helpers.getScrolledPageInfo).toHaveBeenCalledWith(
                options.startPage,
                options.itemsPerPage,
                options.gridContainerElement,
            )
            expect(helpers.calculateScrollTopToPersist).toHaveBeenCalledWith(
                expected.scrolledPageInfo,
                options.gridContainerElement,
                options.itemsPerPage,
            )
            expect(helpers.createReplacementUrl).toHaveBeenCalledWith(
                expected.scrolledPageInfo,
                expected.scrollTopToPersist,
            )
            expect(useOnScrollEnd).toHaveBeenCalledWith(scenario.handler.execute, [
                options.startPage,
                options.itemsPerPage,
                options.gridContainerElement,
            ])
            expect(helpers.replaceCurrentBrowserUrl).toHaveBeenCalledWith(expected.replacementUrl)
        })
    })

    describe("When the page is scrolled to the top", () => {
        let scenario: Scenario

        beforeEach(() => {
            scenario = mockScenario(0)
            renderHook(() => useScrollPositionTracking(options))
            scenario.simulateScrollEnd()
        })

        afterEach(() => scenario.cleanup())
        it("should update the page and scroll position on the browser url", () => {
            const {expected} = scenario
            expect(helpers.getScrolledPageInfo).toHaveBeenCalledWith(
                options.startPage,
                options.itemsPerPage,
                options.gridContainerElement,
            )
            expect(helpers.calculateScrollTopToPersist).toHaveBeenCalledWith(
                expected.scrolledPageInfo,
                options.gridContainerElement,
                options.itemsPerPage,
            )
            expect(helpers.createReplacementUrl).toHaveBeenCalledWith(
                expected.scrolledPageInfo,
                expected.scrollTopToPersist,
            )
            expect(useOnScrollEnd).toHaveBeenCalledWith(scenario.handler.execute, [
                options.startPage,
                options.itemsPerPage,
                options.gridContainerElement,
            ])
            expect(helpers.replaceCurrentBrowserUrl).toHaveBeenCalledWith(expected.replacementUrl)
        })
    })
})

describe("Given `getScrolledPageInfo`", () => {
    const startPage = 4
    const itemsPerPage = 6
    const container = createElementWithChildren(18)

    beforeEach(() => {
        ;(isSomewhatInViewport as jest.Mock).mockImplementation(element => {
            return element === container.children[17]
        })
    })

    afterEach(() => jest.clearAllMocks())

    it("should return the information for the last visible item in the viewport", () => {
        const result = helpers.getScrolledPageInfo(startPage, itemsPerPage, container)
        expect(result).toEqual({localPage: 3, actualPage: 6, positionInPage: 5, positionInItems: 17})
    })
})

describe("Given `calculateScrollTopToPersist`", () => {
    describe("When scrolled to the first local page", () => {
        const itemsPerPage = 6
        const scrolledPageInfo = {localPage: 1, actualPage: 4, positionInPage: 5, positionInItems: 5}
        const containerElement = createElementWithChildren(18)
        const trackedChild = containerElement.children[5]
        const trackedChildOffset = {top: 2000}
        const trackedChildRect = {top: 1000} as DOMRect

        beforeEach(() => {
            ;(getElementOffset as jest.Mock).mockImplementation(element => {
                return element === trackedChild ? trackedChildOffset : {top: 55}
            })

            jest.spyOn(trackedChild, "getBoundingClientRect").mockReturnValue(trackedChildRect)
        })

        afterEach(() => jest.restoreAllMocks())

        it("should correctly calculate the scroll top", () => {
            const result = helpers.calculateScrollTopToPersist(scrolledPageInfo, containerElement, itemsPerPage)
            expect(result).toBe(trackedChildOffset.top - trackedChildRect.top)
        })
    })
    describe("When scrolled to the second local page", () => {
        const itemsPerPage = 6
        const scrolledPageInfo = {localPage: 2, actualPage: 5, positionInPage: 5, positionInItems: 11}
        const containerElement = createElementWithChildren(18)
        const actualTrackedChild = containerElement.children[11]
        const equivalentTrackedChild = containerElement.children[11]
        const equivalentChildOffset = {top: 2000}
        const actualTrackedChildRect = {top: 1000} as DOMRect

        beforeEach(() => {
            ;(getElementOffset as jest.Mock).mockImplementation(element => {
                return element === equivalentTrackedChild ? equivalentChildOffset : {top: 55}
            })

            jest.spyOn(actualTrackedChild, "getBoundingClientRect").mockReturnValue(actualTrackedChildRect)
        })

        afterEach(() => jest.restoreAllMocks())

        it("should correctly calculate the scroll top", () => {
            const result = helpers.calculateScrollTopToPersist(scrolledPageInfo, containerElement, itemsPerPage)
            expect(result).toBe(equivalentChildOffset.top - actualTrackedChildRect.top)
        })
    })
    describe("When scrolled past the second local page", () => {
        const itemsPerPage = 6
        const scrolledPageInfo = {localPage: 3, actualPage: 6, positionInPage: 5, positionInItems: 17}
        const containerElement = createElementWithChildren(18)
        const actualTrackedChild = containerElement.children[17]
        const equivalentTrackedChild = containerElement.children[11]
        const equivalentChildOffset = {top: 2000}
        const actualTrackedChildRect = {top: 1000} as DOMRect

        beforeEach(() => {
            ;(getElementOffset as jest.Mock).mockImplementation(element => {
                return element === equivalentTrackedChild ? equivalentChildOffset : {top: 55}
            })

            jest.spyOn(actualTrackedChild, "getBoundingClientRect").mockReturnValue(actualTrackedChildRect)
        })

        afterEach(() => jest.restoreAllMocks())

        it("should correctly calculate the scroll top", () => {
            const result = helpers.calculateScrollTopToPersist(scrolledPageInfo, containerElement, itemsPerPage)
            expect(result).toBe(equivalentChildOffset.top - actualTrackedChildRect.top)
        })
    })
})

describe("Given `createReplacementUrl`", () => {
    describe("When the url has query params", () => {
        let restore
        const scrolledPageInfo = {actualPage: 5} as ScrolledPageInfo
        const scrollTopToPersist = 5724

        beforeEach(() => {
            restore = mockWindowLocation({href: "http://some.url/path?p=3&q=2", search: "p=3&q=2"})
        })

        afterEach(() => restore())

        it("should return a correct replacement url", () => {
            const result = helpers.createReplacementUrl(scrolledPageInfo, scrollTopToPersist)
            expect(result).toBe("http://some.url/path?p=5&q=2#5724")
        })
    })

    describe("When the url has no query params", () => {
        let restore
        const scrolledPageInfo = {actualPage: 5} as ScrolledPageInfo
        const scrollTopToPersist = 5724

        beforeEach(() => {
            restore = mockWindowLocation({href: "http://some.url/path", search: ""})
        })

        afterEach(() => restore())

        it("should return a correct replacement url", () => {
            const result = helpers.createReplacementUrl(scrolledPageInfo, scrollTopToPersist)
            expect(result).toBe("http://some.url/path?p=5#5724")
        })
    })

    describe("When the url has an existing hash", () => {
        let restore
        const scrolledPageInfo = {actualPage: 5} as ScrolledPageInfo
        const scrollTopToPersist = 5724

        beforeEach(() => {
            restore = mockWindowLocation({href: "http://some.url/path#6586", search: ""})
        })

        afterEach(() => restore())

        it("should return a correct replacement url", () => {
            const result = helpers.createReplacementUrl(scrolledPageInfo, scrollTopToPersist)
            expect(result).toBe("http://some.url/path?p=5#5724")
        })
    })
})

describe("Given `replaceCurrentBrowserUrl`", () => {
    beforeEach(() => {
        jest.spyOn(window.history, "replaceState")
    })

    afterEach(() => jest.restoreAllMocks())

    it("should correctly replace the browser url", () => {
        const replacementUrl = "some.url/path"
        helpers.replaceCurrentBrowserUrl(replacementUrl)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(window.history.replaceState).toHaveBeenCalledWith(
            {url: replacementUrl, type: HISTORY_EVENT},
            "",
            replacementUrl,
        )
    })
})
