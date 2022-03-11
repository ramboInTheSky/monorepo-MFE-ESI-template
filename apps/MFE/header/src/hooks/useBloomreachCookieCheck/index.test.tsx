import Cookies from "js-cookie"
import {act, renderHook} from "@testing-library/react-hooks"
import useBloomreachCookieCheck from "."
import setBloomreachCookie from "../../utils/setBloomreachCookie"
import * as featureSwitches from "../../utils/featureSwitch"
import * as UseOnClientUtil from "../../utils/useIsOnClient"

jest.mock("../../utils/setBloomreachCookie", () => ({
    __esModule: true,
    default: jest.fn(),
}))

function mockDoSearchABAdaptorReturnValue(value: boolean) {
    return jest.spyOn(featureSwitches, "doSearchABAdaptor").mockReturnValue(value)
}

function mockCookieReturnValue(value: string | undefined) {
    return jest.spyOn(Cookies, "get").mockReturnValue(value as any)
}

function mockUseIsOnClient(isOnClient: boolean) {
    jest.spyOn(UseOnClientUtil, "useIsOnClient").mockReturnValue({isOnClient})
}

describe("Given a useCheckForBloomreachCookie hook", () => {
    beforeAll(() => {
        jest.useFakeTimers()
    })

    const props = {
        cookieDomain: "test.co.uk",
        bloomReachCachingCookieList: "string",
        bloomReachCachingEnabled: true,
    }
    beforeEach(() => {
        jest.clearAllMocks()
    })
    afterEach(() => {
        jest.clearAllTimers()
    })

    describe("When rendered on client", () => {
        beforeEach(() => {
            mockUseIsOnClient(true)
        })

        it("if the cookie is already set and searchABAdaptor returns true, should call the setBloomreachCookie function", () => {
            mockCookieReturnValue("uid%3D8380269078389%3Av%3D13.0%3Ats%3D1612884264180%3Ahc%3D1")
            mockDoSearchABAdaptorReturnValue(true)
            renderHook(() => useBloomreachCookieCheck(props))

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            act(() => {
                jest.advanceTimersByTime(3000)
            })

            expect(setBloomreachCookie).toHaveBeenCalledWith("string", true, "test.co.uk")
        })

        it("if the cookie is already set and searchABAdaptor returns false, should call not the setBloomreachCookie function", () => {
            mockCookieReturnValue("uid%3D8380269078389%3Av%3D13.0%3Ats%3D1612884264180%3Ahc%3D1")
            mockDoSearchABAdaptorReturnValue(false)
            renderHook(() => useBloomreachCookieCheck(props))

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            act(() => {
                jest.advanceTimersByTime(3000)
            })

            expect(setBloomreachCookie).not.toHaveBeenCalled()
        })

        it("if the cookie is not already set and searchABAdaptor returns true, should not call the setBloomreachCookie function, but clear the interval after 15 seconds", () => {
            mockCookieReturnValue(undefined)
            mockDoSearchABAdaptorReturnValue(true)
            renderHook(() => useBloomreachCookieCheck(props))

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            act(() => {
                jest.advanceTimersByTime(15000)
            })

            expect(setBloomreachCookie).not.toHaveBeenCalled()
            expect(clearInterval).toHaveBeenCalled()
        })

        it("if the _br_uid_2 cookie is not already set, but _br_mt_search cookie is set and searchABAdaptor returns true, should not call the setBloomreachCookie function, but clear the interval and _br_mt_search cookie after 15 seconds", () => {
            jest.spyOn(Cookies, "get")
                .mockReturnValueOnce(undefined as any)
                .mockReturnValueOnce(undefined as any)
                .mockReturnValueOnce(undefined as any)
                .mockReturnValueOnce(undefined as any)
                .mockReturnValueOnce("1" as any)
            Cookies.remove = jest.fn()

            mockDoSearchABAdaptorReturnValue(true)
            renderHook(() => useBloomreachCookieCheck(props))

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            act(() => {
                jest.advanceTimersByTime(15000)
            })

            expect(setBloomreachCookie).not.toHaveBeenCalled()
            expect(clearInterval).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(Cookies.remove).toHaveBeenCalled()
        })
    })

    describe("When not rendered on client", () => {
        beforeEach(() => {
            mockUseIsOnClient(false)
        })

        it("if the cookie is already set should not call the setBloomreachCookie function", () => {
            mockCookieReturnValue("uid%3D8380269078389%3Av%3D13.0%3Ats%3D1612884264180%3Ahc%3D1")
            mockDoSearchABAdaptorReturnValue(true)
            renderHook(() => useBloomreachCookieCheck(props))

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            act(() => {
                jest.advanceTimersByTime(3000)
            })

            expect(setBloomreachCookie).not.toHaveBeenCalled()
        })
    })
})
