import {getDocumentScrollLeft} from "./getDocumentScrollLeft"

function mockWindow({innerHeight = 100, pageXOffset = 10 as any} = {}) {
    const originalWindow = {...window}
    const spy = jest.spyOn(global, "window" as any, "get")
    spy.mockImplementation(() => ({
        ...originalWindow,
        innerHeight,
        pageXOffset,
    }))
    return () => spy.mockRestore()
}

function mockDocumentElementScrollLeft(scrollLeft: number) {
    const originalDocument = {...document}
    const spy = jest.spyOn(global, "document" as any, "get")
    spy.mockImplementation(() => ({
        ...originalDocument,
        documentElement: {
            ...originalDocument.documentElement,
            scrollLeft,
        },
    }))
    return () => spy.mockRestore()
}

describe("Given `getDocumentScrollLeft`", () => {
    describe("When `window.pageXOffset` is available", () => {
        it("should return it", () => {
            const restoreWindow = mockWindow({pageXOffset: 25})
            expect(getDocumentScrollLeft()).toBe(25)
            restoreWindow()
        })
    })

    describe("When `window.pageXOffset` is not available", () => {
        it("should return  document.documentElement.scrollLeft", () => {
            const restoreWindow = mockWindow({pageXOffset: null})
            const restoreDocument = mockDocumentElementScrollLeft(33)
            expect(getDocumentScrollLeft()).toBe(33)
            restoreWindow()
            restoreDocument()
        })
    })
})
