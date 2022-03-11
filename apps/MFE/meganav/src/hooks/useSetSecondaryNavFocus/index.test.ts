// eslint-disable-next-line import/no-extraneous-dependencies
import {renderHook} from "@testing-library/react-hooks"
// eslint-disable-next-line import/no-extraneous-dependencies
import {fireEvent} from "@testing-library/react"
import useSetSecondaryNavFocus from "."

describe("Given a useSetSecondaryNavFocus", () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.clearAllTimers()
    })
    it("should create the hook", () => {
        const mockElement = document.createElement("div")
        mockElement.appendChild(document.createElement("a"))
        const mockRef = {
            current: mockElement,
        }
        const mockPreviousNavFn = jest.fn()
        const mockNextNavFn = jest.fn()
        const {result} = renderHook(() => useSetSecondaryNavFocus(false, 1, mockRef, mockPreviousNavFn, mockNextNavFn))

        expect(result.current).toEqual({})
    })

    it("When called without an element, it should create the hook", () => {
        const mockRef = {
            current: null,
        }
        const mockPreviousNavFn = jest.fn()
        const mockNextNavFn = jest.fn()
        const {result} = renderHook(() => useSetSecondaryNavFocus(false, 1, mockRef, mockPreviousNavFn, mockNextNavFn))

        expect(result.current).toEqual({})
    })

    it("should find the first child link and bind on previous to it", () => {
        const mockElement = document.createElement("div")
        const firstChild = document.createElement("button")
        const lastChild = document.createElement("button")
        mockElement.appendChild(firstChild)
        mockElement.appendChild(lastChild)
        const mockRef = {
            current: mockElement,
        }
        const mockPreviousNavFn = jest.fn()
        const mockNextNavFn = jest.fn()
        const {result} = renderHook(() => useSetSecondaryNavFocus(false, 1, mockRef, mockPreviousNavFn, mockNextNavFn))

        expect(result.current).toEqual({})
        jest.advanceTimersByTime(1)
        fireEvent.keyDown(firstChild, {key: "Tab", shiftKey: true})

        expect(mockPreviousNavFn).toHaveBeenCalled()
    })

    it("should find the last child link and bind on next to it", () => {
        const mockElement = document.createElement("div")
        const firstChild = document.createElement("button")
        const lastChild = document.createElement("button")
        mockElement.appendChild(firstChild)
        mockElement.appendChild(lastChild)
        const mockRef = {
            current: mockElement,
        }
        const mockPreviousNavFn = jest.fn()
        const mockNextNavFn = jest.fn()
        const {result} = renderHook(() => useSetSecondaryNavFocus(false, 1, mockRef, mockPreviousNavFn, mockNextNavFn))

        expect(result.current).toEqual({})
        jest.advanceTimersByTime(1)
        fireEvent.keyDown(lastChild, {key: "Tab"})

        expect(mockNextNavFn).toHaveBeenCalled()
    })

    it("should focus the first child", () => {
        const mockElement = document.createElement("div")
        const firstChild = document.createElement("button")
        const focusMock = jest.fn()
        firstChild.onfocus = focusMock
        const lastChild = document.createElement("button")
        mockElement.appendChild(firstChild)
        mockElement.appendChild(lastChild)
        const mockRef = {
            current: mockElement,
        }
        const mockPreviousNavFn = jest.fn()
        const mockNextNavFn = jest.fn()
        const {result} = renderHook(() => useSetSecondaryNavFocus(false, 1, mockRef, mockPreviousNavFn, mockNextNavFn))
        jest.advanceTimersByTime(1)
        expect(result.current).toEqual({})
        expect(focusMock).toHaveBeenCalled()
    })

    it("should focus the first last child when tabbing backwards", () => {
        const mockElement = document.createElement("div")
        const firstChild = document.createElement("button")
        const focusMock = jest.fn()
        const lastChild = document.createElement("button")
        lastChild.onfocus = focusMock
        mockElement.appendChild(firstChild)
        mockElement.appendChild(lastChild)
        const mockRef = {
            current: mockElement,
        }
        const mockPreviousNavFn = jest.fn()
        const mockNextNavFn = jest.fn()
        let activeDepartmentIndex = 1
        const {result, rerender} = renderHook(() =>
            useSetSecondaryNavFocus(false, activeDepartmentIndex, mockRef, mockPreviousNavFn, mockNextNavFn),
        )
        jest.advanceTimersByTime(1)
        expect(result.current).toEqual({})
        expect(focusMock).not.toHaveBeenCalled()
        fireEvent.keyDown(firstChild, {key: "Tab", shiftKey: true})
        activeDepartmentIndex = 2
        rerender()
        jest.advanceTimersByTime(1)
        expect(focusMock).toHaveBeenCalled()
    })
})
