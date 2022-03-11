/* eslint-disable import/no-extraneous-dependencies */
import {renderHook, act} from "@testing-library/react-hooks"
import {useSelectDropdown} from "."

type Scenario = ReturnType<typeof mockScenario>

function mockScenario() {
    const mocks = {
        documentAddEventListener: jest.spyOn(document, "addEventListener"),
        documentRemoveEventListener: jest.spyOn(document, "removeEventListener"),
        windowAddEventListener: jest.spyOn(window, "addEventListener"),
        windowRemoveEventListener: jest.spyOn(window, "removeEventListener"),
    }

    const eventHandler = {
        scroll: () => null,
        resize: () => null,
    }

    mocks.documentAddEventListener.mockImplementation((eventName, handler) => {
        if (eventName === "scroll") {
            eventHandler.scroll = handler as any
        }
    })

    mocks.windowAddEventListener.mockImplementation((eventName, handler) => {
        if (eventName === "resize") {
            eventHandler.resize = handler as any
        }
    })

    const scenario = {
        scroll: () => {
            eventHandler.scroll()
        },
        resize: () => {
            eventHandler.resize()
        },
        cleanup: () => {
            mocks.documentAddEventListener.mockRestore()
            mocks.documentRemoveEventListener.mockRestore()
            mocks.windowAddEventListener.mockRestore()
            mocks.windowRemoveEventListener.mockRestore()
        },
    }

    return scenario
}

describe("Given useSelectDropdown", () => {
    let scenario: Scenario

    beforeEach(() => {
        scenario = mockScenario()
    })

    afterEach(() => scenario.cleanup())

    it("should return the correct defaults", () => {
        const {result} = renderHook(() => useSelectDropdown())
        expect(result.current).toEqual({
            showDropdown: false,
            openDropdown: expect.any(Function),
            closeDropdown: expect.any(Function),
            menuStyle: null,
        })
    })

    it("should open dropdown", () => {
        const {result} = renderHook(() => useSelectDropdown())
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.openDropdown()
        })
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(document.addEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
        expect(result.current.showDropdown).toEqual(true)
    })

    it("should close dropdown", () => {
        const {result} = renderHook(() => useSelectDropdown())
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.closeDropdown()
        })
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(document.removeEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
        expect(result.current.showDropdown).toEqual(false)
    })

    it("should disable the menu transition and remove event listener on scroll", () => {
        const {result} = renderHook(() => useSelectDropdown())
        expect(result.current.menuStyle).toBeNull()

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.openDropdown()
            scenario.scroll()
        })

        expect(result.current.menuStyle?.paper.startsWith("DisableTransition")).toBe(true)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(document.removeEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
    })

    it("should disable the menu transition and close the dropdown on resize", () => {
        const {result} = renderHook(() => useSelectDropdown())
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            result.current.openDropdown()
        })

        expect(result.current.showDropdown).toBe(true)
        expect(result.current.menuStyle).toBeNull()

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        act(() => {
            scenario.resize()
        })

        expect(result.current.showDropdown).toBe(false)
        expect(result.current.menuStyle?.paper.startsWith("DisableTransition")).toBe(true)
    })

    it("should remove resize listener on unmount", () => {
        const {unmount} = renderHook(() => useSelectDropdown())
        unmount()
        expect(window.removeEventListener).toHaveBeenCalledWith("resize", expect.any(Function))
    })
})
