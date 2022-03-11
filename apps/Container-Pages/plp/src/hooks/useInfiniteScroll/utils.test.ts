import {DOWN, UP} from "./types"
import {getElementOffset} from "../../utils/window/getElementOffset"
import {createElementWithChildren} from "../../../__mocks__/dom"
import {calculateScrollTopOfPage, getFetchTriggerElement} from "./utils"

jest.mock("../../utils/window/getElementOffset")

describe("Given `getFetchTriggerElement`", () => {
    const offset = 8
    const container = createElementWithChildren(24)
    describe("When scrolling up", () => {
        it("returns the correct element", () => {
            const element = getFetchTriggerElement(container, offset, UP)
            expect(element).toBe(container.children[8])
        })
    })
    describe("When scrolling down", () => {
        it("should return the correct element", () => {
            const element = getFetchTriggerElement(container, offset, DOWN)
            expect(element).toBe(container.children[15])
        })
    })
})

describe("Given `calculateScrollTopOfSecondPage`", () => {
    let mocked: ReturnType<typeof mockScenario>

    const page = 2
    const childHeight = 200
    const itemsPerPage = 24

    function mockScenario() {
        const totalChildren = itemsPerPage * 2
        const container = createElementWithChildren(totalChildren, (child, i) => {
            const spy = jest.spyOn(child, "getBoundingClientRect")
            spy.mockReturnValue({height: childHeight, top: i * childHeight} as DOMRect)
        })
        ;(getElementOffset as jest.Mock).mockImplementation((element: HTMLElement) => {
            return {top: element.getBoundingClientRect().top}
        })
        return {container}
    }

    beforeEach(() => {
        mocked = mockScenario()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should correctly calculate the scroll top of the specified page", () => {
        const scrollTop = calculateScrollTopOfPage(page, itemsPerPage, mocked.container)
        expect(scrollTop).toBe(4700)
    })
})
