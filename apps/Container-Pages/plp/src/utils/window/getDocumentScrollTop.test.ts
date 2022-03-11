import {getDocumentScrollTop} from "./getDocumentScrollTop"

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

function mockDocumentElementScrollTop(scrollTop: number) {
    const originalDocument = {...document}
    const spy = jest.spyOn(global, "document" as any, "get")
    spy.mockImplementation(() => ({
        ...originalDocument,
        documentElement: {
            ...originalDocument.documentElement,
            scrollTop,
        },
    }))
    return () => spy.mockRestore()
}

describe("Given `getDocumentScrollTop`", () => {
    describe("When `window.pageYOffset` is available", () => {
        it("should return it", () => {
            const restoreWindow = mockWindow({pageYOffset: 25})
            expect(getDocumentScrollTop()).toBe(25)
            restoreWindow()
        })
    })

    describe("When `window.pageYOffset` is not available", () => {
        it("should return  document.documentElement.scrollTop", () => {
            const restoreWindow = mockWindow({pageYOffset: null})
            const restoreDocument = mockDocumentElementScrollTop(33)
            expect(getDocumentScrollTop()).toBe(33)
            restoreWindow()
            restoreDocument()
        })
    })
})
