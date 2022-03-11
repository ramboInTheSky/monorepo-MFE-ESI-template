import {
    getWindow,
    addDocumentScrollListener,
    isSomewhatInViewport,
    removeDocumentScrollListener,
    isAboveViewport,
    isBelowViewport,
    scrollToTop,
} from "."
import {mockWindowScrollTo} from "../../../__mocks__/dom"

function mockWindow({innerHeight = 100, pageYOffset = 10 as any} = {}) {
    const originalWindow = {...window}
    const spy = jest.spyOn(global, "window" as any, "get")
    spy.mockImplementation(() => ({
        ...originalWindow,
        innerHeight,
        pageYOffset,
    }))

    return () => spy.mockRestore()
}

function mockElement({top = 0, bottom = 0} = {}) {
    const element = {
        getBoundingClientRect: jest.fn(() => ({top, bottom})),
    } as any
    return element
}

describe("Given `getWindow`", () => {
    it("should return the window", () => {
        expect(getWindow()).toBe(window)
    })

    describe("when not in browser", () => {
        it("should return the null", () => {
            const spy = jest.spyOn(global, "window" as any, "get").mockReturnValue(undefined)

            expect(getWindow()).toBe(null)
            spy.mockRestore()
        })
    })
})

describe("Given `isSomewhatInViewport`", () => {
    let restoreWindow

    beforeAll(() => {
        restoreWindow = mockWindow({innerHeight: 30})
    })
    afterAll(() => {
        restoreWindow()
    })

    describe("When element is fully in viewport", () => {
        it("should return true", () => {
            const element = mockElement({top: 10, bottom: 20})
            expect(isSomewhatInViewport(element)).toBe(true)
        })
    })

    describe("When element is at the top of the viewport", () => {
        it("should return true", () => {
            const element = mockElement({top: 0, bottom: 20})
            expect(isSomewhatInViewport(element)).toBe(true)
        })
    })

    describe("When element is at the bottom of the viewport", () => {
        it("should return true", () => {
            const element = mockElement({top: 10, bottom: 30})
            expect(isSomewhatInViewport(element)).toBe(true)
        })
    })

    describe("When element is partially within the top of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: -10, bottom: 10})
            expect(isSomewhatInViewport(element)).toBe(true)
        })
    })

    describe("When element is partially within the bottom of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 20, bottom: 40})
            expect(isSomewhatInViewport(element)).toBe(true)
        })
    })

    describe("When element is fully past the bottom of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 40, bottom: 50})
            expect(isSomewhatInViewport(element)).toBe(false)
        })
    })

    describe("When element is fully past the top of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: -10, bottom: -20})
            expect(isSomewhatInViewport(element)).toBe(false)
        })
    })
})

describe("Given `isAboveViewport`", () => {
    let restoreWindow

    beforeAll(() => {
        restoreWindow = mockWindow({innerHeight: 30})
    })
    afterAll(() => {
        restoreWindow()
    })

    describe("When element is fully in viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 10, bottom: 20})
            expect(isAboveViewport(element)).toBe(false)
        })
    })

    describe("When element is at the top of the viewport", () => {
        it("should return true", () => {
            const element = mockElement({top: -10, bottom: 0})
            expect(isAboveViewport(element)).toBe(true)
        })
    })

    describe("When element is at the bottom of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 30, bottom: 40})
            expect(isAboveViewport(element)).toBe(false)
        })
    })

    describe("When element is partially within the top of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: -10, bottom: 10})
            expect(isAboveViewport(element)).toBe(false)
        })
    })

    describe("When element is partially within the bottom of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 20, bottom: 40})
            expect(isAboveViewport(element)).toBe(false)
        })
    })

    describe("When element is fully past the bottom of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 40, bottom: 50})
            expect(isAboveViewport(element)).toBe(false)
        })
    })

    describe("When element is fully past the top of the viewport", () => {
        it("should return true", () => {
            const element = mockElement({top: -10, bottom: -20})
            expect(isAboveViewport(element)).toBe(true)
        })
    })
})

describe("Given `isBelowViewport`", () => {
    let restoreWindow

    beforeAll(() => {
        restoreWindow = mockWindow({innerHeight: 30})
    })
    afterAll(() => {
        restoreWindow()
    })

    describe("When element is fully in viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 10, bottom: 20})
            expect(isBelowViewport(element)).toBe(false)
        })
    })

    describe("When element is at the top of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 10, bottom: 30})
            expect(isBelowViewport(element)).toBe(false)
        })
    })

    describe("When element is at the bottom of the viewport", () => {
        it("should return true", () => {
            const element = mockElement({top: 30, bottom: 40})
            expect(isBelowViewport(element)).toBe(true)
        })
    })

    describe("When element is partially within the top of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 10, bottom: 50})
            expect(isBelowViewport(element)).toBe(false)
        })
    })

    describe("When element is partially within the bottom of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: 20, bottom: 40})
            expect(isBelowViewport(element)).toBe(false)
        })
    })

    describe("When element is fully past the bottom of the viewport", () => {
        it("should return true", () => {
            const element = mockElement({top: 200, bottom: 250})
            expect(isBelowViewport(element)).toBe(true)
        })
    })

    describe("When element is fully past the top of the viewport", () => {
        it("should return false", () => {
            const element = mockElement({top: -10, bottom: -20})
            expect(isBelowViewport(element)).toBe(false)
        })
    })
})

describe("Given `addDocumentScrollListener`", () => {
    beforeEach(() => jest.spyOn(document, "addEventListener"))
    afterEach(() => jest.clearAllMocks())

    it("should add the listener as a document scroll listener", () => {
        const listener = () => null
        addDocumentScrollListener(listener)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(document.addEventListener).toHaveBeenCalledWith("scroll", listener)
    })
})

describe("Given `removeDocumentScrollListener`", () => {
    beforeEach(() => jest.spyOn(document, "removeEventListener"))
    afterEach(() => jest.clearAllMocks())

    it("should remove the listener from the list of document scroll listeners", () => {
        const listener = () => null
        removeDocumentScrollListener(listener)
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(document.removeEventListener).toHaveBeenCalledWith("scroll", listener)
    })
})

describe("Given `scrollToTop`", () => {
    let restore
    beforeEach(() => {
        restore = mockWindowScrollTo()
    })

    afterEach(() => {
        restore()
    })
    it("should call scrollTo", () => {
        scrollToTop()
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })
})
