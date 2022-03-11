/* eslint-disable import/no-extraneous-dependencies */

import {renderHook} from "@testing-library/react-hooks"
import {useUpScrollPosition} from "./useUpScrollPosition"
import {isSomewhatInViewport, getElementOffset} from "../../utils/window"
import {createElementWithChildren, mockWindowScrollTo} from "../../../__mocks__/dom"

jest.mock("../../utils/window", () => ({
    getElementOffset: jest.fn(),
    isSomewhatInViewport: jest.fn(),
}))

interface ScenarioOptions {
    startPage?: number
    totalItems?: number
    itemsPerPage?: number
    trackedElementPosition?: number
}

function mockScenario(options: ScenarioOptions) {
    const {startPage = 5, totalItems = 24, itemsPerPage = 24, trackedElementPosition = 4} = options
    const gridContainerElement = createElementWithChildren(totalItems)
    const trackedElement = gridContainerElement?.children[trackedElementPosition]
    const restoreWindowScrollTo = mockWindowScrollTo()

    const scenario = {
        initialProps: {
            startPage,
            totalItems,
            itemsPerPage,
            gridContainerElement,
        },
        gridContainerElement,
        mockScrollTopOfTrackedElementToBe(value: number) {
            ;(trackedElement.getBoundingClientRect as jest.Mock).mockReturnValueOnce({top: value} as any)
            return scenario
        },
        mockTrackedElementToBeSomewhatInViewport() {
            ;(isSomewhatInViewport as jest.Mock).mockImplementation(element => {
                return element === trackedElement
            })
            return scenario
        },
        mockTrackedElementTopOffsetToBe(top: number) {
            ;(getElementOffset as jest.Mock).mockImplementationOnce(element => {
                if (element === trackedElement) {
                    return {top}
                }
            })
        },
        addElementsToTopOfGridContainer(totalElements: number) {
            for (let i = 0; i < totalElements; i += 1) {
                gridContainerElement.prepend(document.createElement("div"))
            }
            return scenario
        },
        cleanup() {
            restoreWindowScrollTo()
            jest.restoreAllMocks()
        },
    }

    return scenario
}

describe("Given `useUpScrollPosition`", () => {
    describe(".restore()", () => {
        it("should correctly restore the scroll position after an up scroll has yielded new items at the top", () => {
            const scenario = mockScenario({
                startPage: 5,
                totalItems: 24,
                itemsPerPage: 24,
                trackedElementPosition: 4,
            })

            const {initialProps, gridContainerElement} = scenario

            const hook = renderHook(options => useUpScrollPosition(options), {initialProps})

            // Just before the grid container is about to be
            // re-rendered with more items, the hook needs to
            // capture the scroll top of the first grid item
            // that is somewhat within the top of the viewport,
            // so that it can use that value to calculate the new
            // scroll position after the grid is re-rendered with
            // new items. So let's mock the 4th item in the grid
            // to be the first one in the viewport when the grid
            // is re-rendered with more items

            scenario.mockScrollTopOfTrackedElementToBe(-100)
            scenario.mockTrackedElementToBeSomewhatInViewport()

            // Now let's simulate a situation where the grid
            // will be re-rendered with more items, by adding
            // 24 more items to the top of the grid. We are
            // simulating here that a previous page of items
            // was added as a result of scrolling up

            hook.rerender({
                startPage: 4,
                totalItems: 48,
                itemsPerPage: 24,
                gridContainerElement,
            })

            scenario.addElementsToTopOfGridContainer(24)

            // Now after the grid is re-rendered to display
            // 24 more items at the top, the item that was previously
            // the 4th item within the grid, will now become the 28th
            // item within the grid. As such, we will now have a much greater
            // scroll top value that will need to be captured so that
            // the hook knows where to scroll to. So lets mock that value

            scenario.mockTrackedElementTopOffsetToBe(900)

            // Now it's time to actually call the `restore()` function
            // Note that it should only be called after the grid has
            // been re-rendered. It's the responsibility of the caller
            // to ensure that this happens, hence why we are calling the
            // function after manually re-rendering with `hook.rerender()`

            hook.result.current.restore()

            // Once called, we expect the window to have scrolled to
            // a position that is equivalent to `offsetTopOfItemWhenItIs28thItem - viewportTopOfItemWhenItWas4thItem`
            // i.e., `900 - (-100)`. This gives us the exact position that
            // the viewport should be scrolled to, in order to allow the user to
            // continue to be able to scroll up to reveal the newly fetched page of items

            expect(window.scrollTo).toHaveBeenCalledWith(0, 1000)

            scenario.cleanup()
        })
    })
})
