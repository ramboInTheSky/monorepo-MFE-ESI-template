/* eslint-disable import/no-extraneous-dependencies */

import {renderHook, cleanup} from "@testing-library/react-hooks/pure"
import {mockWindowLocation} from "../../../__mocks__/dom"
import {calculateScrollTopOfPage} from "../../hooks/useInfiniteScroll/utils"
import {helpers, useInitialScrollPosition} from "./useInitialScrollPosition"

jest.mock("../../utils/window")
jest.mock("../../hooks/useInfiniteScroll/utils")

function mockWindowScrollRestoration(value = "auto") {
    Object.defineProperty(window.history, "scrollRestoration", {
        value,
        writable: true,
        configurable: true,
    })

    return () => delete (window.history as any).scrollRestoration
}

interface InternalApiOptions {
    isValidContext?: boolean
    initialScrollTop?: number
    scrollRestoration?: string
    scrollTopOfSecondPage?: number
}

function mockHelpersApi({scrollRestoration, scrollTopOfSecondPage, initialScrollTop}: InternalApiOptions = {}) {
    const spies = {
        scrollTo: jest.spyOn(window, "scrollTo"),
        addEventListener: jest.spyOn(window, "addEventListener"),
        removeEventListener: jest.spyOn(window, "removeEventListener"),
        enableAutomaticScrollRestoration: jest.spyOn(helpers, "enableAutomaticScrollRestoration"),
        disableAutomaticScrollRestoration: jest.spyOn(helpers, "disableAutomaticScrollRestoration"),
        calculateScrollTopOfPage: calculateScrollTopOfPage as jest.Mock,
        getUrlSpecifiedScrollTop: jest.spyOn(helpers, "getUrlSpecifiedScrollTop"),
        getInitialScrollTop: jest.spyOn(helpers, "getInitialScrollTop"),
    }

    const restoreScrollRestoration = mockWindowScrollRestoration(scrollRestoration)

    spies.scrollTo.mockImplementation(() => null)

    if (initialScrollTop !== undefined) spies.getInitialScrollTop.mockReturnValue(initialScrollTop)
    if (scrollTopOfSecondPage !== undefined) spies.calculateScrollTopOfPage.mockReturnValue(scrollTopOfSecondPage)

    const restore = () => {
        spies.scrollTo.mockRestore()
        spies.addEventListener.mockRestore()
        spies.removeEventListener.mockRestore()
        spies.enableAutomaticScrollRestoration.mockRestore()
        spies.calculateScrollTopOfPage.mockRestore()
        spies.getUrlSpecifiedScrollTop.mockRestore()
        spies.getInitialScrollTop.mockRestore()

        restoreScrollRestoration()
    }

    return restore
}

const defaultOptions = {
    itemsPerPage: 24,
    requestedPage: 2,
    gridContainerElement: document.createElement("div"),
}

describe("Given `useInitialScrollPosition`", () => {
    describe("By default", () => {
        let restore: Function

        beforeAll(() => {
            restore = mockHelpersApi()
            renderHook(() => useInitialScrollPosition(defaultOptions))
        })

        afterAll(() => {
            restore()
            cleanup()
        })

        it("should disable automatic scroll restoration", () => {
            expect(helpers.disableAutomaticScrollRestoration).toHaveBeenCalled()
        })

        it("should register reset of scroll restoration on browser unload", () => {
            expect(window.addEventListener).toHaveBeenCalledWith(
                "beforeunload",
                helpers.enableAutomaticScrollRestoration,
            )
        })
    })

    describe("When the hook unmounts", () => {
        let restore: Function

        beforeAll(() => {
            restore = mockHelpersApi({scrollRestoration: "automatic"})
            const {unmount} = renderHook(() => useInitialScrollPosition(defaultOptions))
            unmount()
        })

        afterAll(() => {
            restore()
            cleanup()
        })

        it("should reset the scroll restoration setting", () => {
            expect(helpers.enableAutomaticScrollRestoration).toHaveBeenCalled()
        })

        it("should unregister reset of scroll restoration on browser unload", () => {
            expect(window.removeEventListener).toHaveBeenCalledWith(
                "beforeunload",
                helpers.enableAutomaticScrollRestoration,
            )
        })
    })

    describe("When the `gridContainerElement` is null", () => {
        let restore: Function

        beforeEach(() => {
            restore = mockHelpersApi()
        })

        afterEach(() => {
            restore()
            cleanup()
        })

        it("should do nothing", () => {
            renderHook(() => useInitialScrollPosition({...defaultOptions, gridContainerElement: null}))
            expect(window.scrollTo).not.toHaveBeenCalled()
        })
    })

    describe("When the `gridContainerElement` is not null", () => {
        let restore: Function
        const initialScrollTop = 254

        beforeEach(() => {
            restore = mockHelpersApi({initialScrollTop})
        })

        afterEach(() => {
            restore()
            cleanup()
        })

        it("should  scroll to the correct position", () => {
            renderHook(() => useInitialScrollPosition(defaultOptions))
            expect(window.scrollTo).toHaveBeenCalledWith(0, initialScrollTop)
        })
    })

    describe("When the hook has already executed once", () => {
        let restore: Function
        const initialScrollTop = 254

        beforeEach(() => {
            restore = mockHelpersApi({initialScrollTop})
        })

        afterEach(() => {
            restore()
            cleanup()
        })

        it("should not execute again", () => {
            const {rerender} = renderHook(() => useInitialScrollPosition(defaultOptions))
            rerender()
            rerender()
            expect(window.scrollTo).toHaveBeenCalledTimes(1)
        })
    })

    describe("When the `onAfterScrollReposition` callback has been supplied", () => {
        describe("When the scroll has been repositioned", () => {
            let restore: Function
            const initialScrollTop = 254

            beforeEach(() => {
                restore = mockHelpersApi({initialScrollTop})
            })

            afterEach(() => {
                restore()
                cleanup()
            })

            it("should call the `onAfterScrollReposition` callback after the scroll has been repositioned", () => {
                const calls: number[] = []
                const options = {
                    ...defaultOptions,
                    onAfterScrollReposition: jest.fn(() => calls.push(2)),
                }
                ;(window.scrollTo as jest.Mock).mockImplementation(() => calls.push(1))
                renderHook(() => useInitialScrollPosition(options))
                expect(options.onAfterScrollReposition).toHaveBeenCalled()
                expect(calls).toEqual([1, 2])
            })
        })

        describe("When no scroll repositioning occurs", () => {
            let restore: Function

            beforeEach(() => {
                restore = mockHelpersApi()
            })

            afterEach(() => {
                restore()
                cleanup()
            })

            it("should not call the `onAfterScrollReposition` callback", () => {
                const options = {...defaultOptions, gridContainerElement: null, onAfterScrollReposition: jest.fn()}
                renderHook(() => useInitialScrollPosition(options))
                expect(options.onAfterScrollReposition).not.toHaveBeenCalled()
            })
        })
    })

    describe("callbacks", () => {
        describe("When the context is not applicable for repositioning", () => {
            let restore: Function

            beforeEach(() => {
                restore = mockHelpersApi()
            })

            afterEach(() => {
                restore()
                cleanup()
            })

            it("should call call the callbacks that should be called when in a repositioning context", () => {
                const options = {
                    ...defaultOptions,
                    requestedPage: 1,
                    onWillRepositionScroll: jest.fn(),
                    onAfterScrollReposition: jest.fn(),
                }
                renderHook(() => useInitialScrollPosition(options))
                expect(options.onWillRepositionScroll).not.toHaveBeenCalled()
                expect(options.onAfterScrollReposition).not.toHaveBeenCalled()
            })
        })

        describe("When the context is applicable for repositioning", () => {
            let restore: Function
            const initialScrollTop = 254

            beforeEach(() => {
                restore = mockHelpersApi({initialScrollTop})
            })

            afterEach(() => {
                restore()
                cleanup()
            })

            it("should call the relevant callbacks", () => {
                const calls: string[] = []
                ;(window.scrollTo as jest.Mock).mockImplementation(() => calls.push("reposition"))
                const options = {
                    ...defaultOptions,
                    onWillRepositionScroll: jest.fn(() => calls.push("will reposition")),
                    onAfterScrollReposition: jest.fn(() => calls.push("has repositioned")),
                }
                renderHook(() => useInitialScrollPosition(options))
                expect(calls).toEqual(["will reposition", "reposition", "has repositioned"])
            })
        })
    })
})

describe("Given internal helpers", () => {
    describe("enableAutomaticScrollRestoration()", () => {
        describe("When the browser supports scroll restoration", () => {
            let restore: Function

            beforeEach(() => {
                restore = mockWindowScrollRestoration("manual")
            })

            afterEach(() => {
                restore()
                cleanup()
            })

            it("should enable automatic scroll restoration", () => {
                helpers.enableAutomaticScrollRestoration()
                expect(window.history.scrollRestoration).toBe("auto")
            })
        })

        describe("When the browser does not support scroll restoration", () => {
            afterEach(() => {
                cleanup()
            })

            it("should not attempt to enable it", () => {
                helpers.enableAutomaticScrollRestoration()
                expect(window.history.scrollRestoration).toBe(undefined)
            })
        })
    })

    describe("disableAutomaticScrollRestoration()", () => {
        describe("When the browser supports scroll restoration", () => {
            let restore: Function

            beforeEach(() => {
                restore = mockWindowScrollRestoration("auto")
            })

            afterEach(() => {
                restore()
                cleanup()
            })

            it("should disable automatic scroll restoration", () => {
                helpers.disableAutomaticScrollRestoration()
                expect(window.history.scrollRestoration).toBe("manual")
            })
        })

        describe("When the browser does not support scroll restoration", () => {
            afterEach(() => {
                cleanup()
            })

            it("should not attempt to disable it", () => {
                helpers.disableAutomaticScrollRestoration()
                expect(window.history.scrollRestoration).toBe(undefined)
            })
        })
    })

    describe("getInitialScrollTop", () => {
        const itemsPerPage = 24
        const requestedPage = 5
        const containerElement = document.createElement("div")

        describe("When the scroll top has been specified in the url", () => {
            it("should return it", () => {
                const urlSpecifiedScrollTop = 27645
                const restore = mockWindowLocation({hash: `#${urlSpecifiedScrollTop}`})
                const result = helpers.getInitialScrollTop(requestedPage, itemsPerPage, containerElement)
                expect(result).toBe(urlSpecifiedScrollTop)
                restore()
            })
        })

        describe("When the scroll top has not been specified in the url", () => {
            describe("When the requested page is 2 or greater", () => {
                describe.each([[2], [3]])("When the requested page is %i", _requestedPage => {
                    const scrollTopOfPageTwo = 745745

                    beforeEach(() => {
                        ;(calculateScrollTopOfPage as jest.Mock).mockReturnValue(scrollTopOfPageTwo)
                    })

                    afterEach(() => jest.clearAllMocks())

                    it("should return the scroll top of page two", () => {
                        const result = helpers.getInitialScrollTop(_requestedPage, itemsPerPage, containerElement)
                        expect(result).toBe(scrollTopOfPageTwo)
                        expect(calculateScrollTopOfPage).toHaveBeenCalledWith(2, itemsPerPage, containerElement)
                    })
                })
            })

            describe("When the requested page is less than 2", () => {
                describe.each([[1], [0]])("When the requested page is %i", _requestedPage => {
                    it("should return 0", () => {
                        const result = helpers.getInitialScrollTop(_requestedPage, itemsPerPage, containerElement)
                        expect(result).toBe(0)
                        expect(calculateScrollTopOfPage).not.toHaveBeenCalled()
                    })
                })
            })
        })
    })
})
