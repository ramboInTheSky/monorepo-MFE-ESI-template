/* eslint-disable @typescript-eslint/no-floating-promises */
import {act, renderHook} from "@testing-library/react-hooks"

import * as WindowUtils from "../../utils/window"
import * as DocumentElementIdUtil from "../../utils/window/getElementById"
import * as DocumentScrollTopUtil from "../../utils/window/getDocumentScrollTop"
import {useHasReachedFooter} from "./useHasReachedFooter"
import {FOOTER_ID} from "../../config/constants"

const mockDefaultValues = {
    windowGetter: () => ({} as typeof window),
    footerElement: {getBoundingClientRect: () => ({top: 716})} as Record<any, any>,
    plpElement: {getBoundingClientRect: () => ({height: 600})} as Record<any, any>,
    documentScrollTop: 0,
}

function mockScenario(values: Partial<typeof mockDefaultValues>) {
    const {windowGetter, footerElement, documentScrollTop, plpElement} = {...mockDefaultValues, ...values}
    jest.spyOn(WindowUtils, "getWindow").mockImplementation(windowGetter)
    jest.spyOn(DocumentElementIdUtil, "getElementById").mockImplementation(elementId => {
        if (elementId === FOOTER_ID) return footerElement as HTMLElement
        return plpElement as HTMLElement
    })
    jest.spyOn(DocumentScrollTopUtil, "getDocumentScrollTop").mockReturnValue(documentScrollTop)
}

describe("Given a hook - useHasReachedFooter()", () => {
    beforeEach(() => {
        jest.spyOn(WindowUtils, "addDocumentScrollListener")
        jest.spyOn(WindowUtils, "removeDocumentScrollListener")
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    it("should have default result", () => {
        const {result} = renderHook(() => useHasReachedFooter())

        expect(result.current).toEqual({hasReachedFooter: false, calculateHasReachedFooter: expect.any(Function)})
    })

    describe("When is window is not available", () => {
        it("should not add scroll event listener", () => {
            mockScenario({windowGetter: jest.fn(() => undefined as any)})
            renderHook(() => useHasReachedFooter())

            expect(WindowUtils.addDocumentScrollListener).not.toHaveBeenCalled()
        })
    })

    describe("When is window is available", () => {
        beforeAll(() => {
            mockScenario({windowGetter: jest.fn(() => ({} as typeof window))})
        })

        it("should add scroll event listener when mounted", () => {
            renderHook(() => useHasReachedFooter())

            expect(WindowUtils.addDocumentScrollListener).toHaveBeenCalledWith(expect.any(Function))
        })

        it("should remove event listener when unmounted", () => {
            const {unmount} = renderHook(() => useHasReachedFooter())

            unmount()

            expect(WindowUtils.removeDocumentScrollListener).toHaveBeenCalledWith(expect.any(Function))
        })
    })

    describe("When there is no footer element", () => {
        it("should use default footer height to calculate result", () => {
            mockScenario({footerElement: null as any, documentScrollTop: 0})
            const {result} = renderHook(() => useHasReachedFooter())

            act(() => {
                document.dispatchEvent(new Event("scroll"))
            })

            expect(result.current.hasReachedFooter).toEqual(false)
        })
    })

    describe("When there is a footer element", () => {
        it("should return correct result when footer has been reached", () => {
            mockScenario({
                footerElement: {getBoundingClientRect: () => ({top: 20}), clientHeight: 0},
                plpElement: {getBoundingClientRect: () => ({height: 400}), clientHeight: 0},
                windowGetter: () => ({innerHeight: 100} as any),
            })
            const {result} = renderHook(() => useHasReachedFooter())

            act(() => {
                document.dispatchEvent(new Event("scroll"))
            })

            expect(result.current.hasReachedFooter).toEqual(true)
        })

        it("should return correct result when footer has not been reached", () => {
            mockScenario({
                footerElement: {getBoundingClientRect: () => ({top: 768})},
                windowGetter: () => ({innerHeight: 768} as any),
            })
            const {result} = renderHook(() => useHasReachedFooter())

            act(() => {
                document.dispatchEvent(new Event("scroll"))
            })

            expect(result.current.hasReachedFooter).toEqual(false)
        })

        describe("When 'calculateHasReachedFooter' is triggered", () => {
            it("should return the correct value", () => {
                expect.assertions(1)
                mockScenario({
                    footerElement: {getBoundingClientRect: () => ({top: 768})},
                    windowGetter: () => ({innerHeight: 768} as any),
                })
                const {result} = renderHook(() => useHasReachedFooter())

                act(() => {
                    expect(result.current.calculateHasReachedFooter()).toBe(false)
                })
            })
        })
    })
})
