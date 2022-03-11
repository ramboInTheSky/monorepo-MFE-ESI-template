import {useDispatch} from "react-redux"
import {useMediaQuery} from "@mui/material"
import {breakpoints} from "@monorepo/themes"
import {renderHook} from "@testing-library/react-hooks"
import {useSetBreakpoint} from "."
import {setCurrentBreakpointAction} from "../../ducks/search"

jest.mock("react-redux")
jest.mock("@mui/material")
jest.mock("../../ducks/search", () => ({
    setCurrentBreakpointAction: jest.fn(),
}))

const dispatchFn = jest.fn()

const mockUseMediaQuery = (breakpoint: number) => {
    const queryString = `(min-width: ${breakpoint}px)`
    ;(useMediaQuery as jest.Mock).mockImplementation(mediaQuery => mediaQuery === queryString)
}

const mockUseDispatch = () => {
    ;(useDispatch as jest.Mock).mockReturnValue(dispatchFn)
}

const mockSetCurrentBreakpointThunk = () => {
    ;(setCurrentBreakpointAction as jest.Mock).mockImplementation(arg => `Breakpoint: ${arg}`)
}

describe("Hooks: useSetBreakpoint", () => {
    beforeEach(() => {
        mockUseDispatch()
        mockSetCurrentBreakpointThunk()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should return xs when breakpoint is xs", () => {
        mockUseMediaQuery(breakpoints.values.xs)
        renderHook(() => useSetBreakpoint())
        expect(dispatchFn).toHaveBeenCalledTimes(1)
        expect(dispatchFn).toHaveBeenCalledWith("Breakpoint: xs")
    })

    it("should return sm when breakpoint is sm", () => {
        mockUseMediaQuery(breakpoints.values.sm)
        renderHook(() => useSetBreakpoint())
        expect(dispatchFn).toHaveBeenCalledTimes(1)
        expect(dispatchFn).toHaveBeenCalledWith("Breakpoint: sm")
    })

    it("should return md when breakpoint is md", () => {
        mockUseMediaQuery(breakpoints.values.md)
        renderHook(() => useSetBreakpoint())
        expect(dispatchFn).toHaveBeenCalledTimes(1)
        expect(dispatchFn).toHaveBeenCalledWith("Breakpoint: md")
    })

    it("should return lg when breakpoint is lg", () => {
        mockUseMediaQuery(breakpoints.values.lg)
        renderHook(() => useSetBreakpoint())
        expect(dispatchFn).toHaveBeenCalledTimes(1)
        expect(dispatchFn).toHaveBeenCalledWith("Breakpoint: lg")
    })

    it("should return xl when breakpoint is xl", () => {
        mockUseMediaQuery(breakpoints.values.xl)
        renderHook(() => useSetBreakpoint())
        expect(dispatchFn).toHaveBeenCalledTimes(1)
        expect(dispatchFn).toHaveBeenCalledWith("Breakpoint: xl")
    })
})
