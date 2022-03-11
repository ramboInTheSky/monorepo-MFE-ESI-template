/* eslint-disable @typescript-eslint/no-floating-promises */
import {renderHook, act, cleanup} from "@testing-library/react-hooks"
import * as Redux from "react-redux"

import {UseSwiperColourwayParams, useSwiperColourway} from "./useSwiperColourway"
import {mockUseDispatchReturnValue} from "../../../../__mocks__/reduxMocks"
import {mockSlides} from "./mocks"
import * as ImagePreloader from "../../../hooks/usePreloadImages"
import * as ProductSummaryDuck from "../../../ducks/productSummary"
import * as TextAlignmentDuck from "../../../ducks/text-alignment"

const mockHookParams: UseSwiperColourwayParams = {
    thumbsGallery: [],
    currentSlideIndex: 0,
    slides: [],
    isDesktopBreakPoint: false,
}

const mockThumbsGallery = new Array(20)
const mockPreloader = jest.fn()

function mockCanLoadVisibleColourways(value: boolean) {
    jest.spyOn(ProductSummaryDuck, "selectCanLoadVisibleColourways").mockReturnValue(value)
}

function mockSelectIsLeftToRight(value: boolean) {
    jest.spyOn(TextAlignmentDuck, "selectIsLeftToRight").mockReturnValue(value)
}

describe("Given a useSwiperColourway() hook", () => {
    beforeAll(() => {
        jest.spyOn(ImagePreloader, "usePreloadImages").mockReturnValue(mockPreloader)
        jest.spyOn(Redux, "useSelector").mockImplementation((selector: Function) => selector())
        mockCanLoadVisibleColourways(false)
        mockSelectIsLeftToRight(true)
        mockUseDispatchReturnValue()
    })

    afterAll(async () => {
        await cleanup()
        jest.restoreAllMocks()
    })

    it("should return defaults", () => {
        const {result} = renderHook(() => useSwiperColourway(mockHookParams))
        expect(result.current).toEqual({
            handleProductSlideChange: expect.any(Function),
            handleThumbsSwipeEnd: expect.any(Function),
            handleOnProductSwiper: expect.any(Function),
            handleSetSelectedColourway: expect.any(Function),
            setThumbsSwiper: expect.any(Function),
            getActiveIndex: expect.any(Function),
            scrollBarWidth: 0,
            thumbsContainerRef: {current: null},
        })
    })

    describe("when 'handleProductSlideChange' is triggered", () => {
        const mockDispatch = jest.fn()
        beforeEach(() => {
            mockDispatch.mockClear()
            mockUseDispatchReturnValue(mockDispatch)
        })

        it("should dispatch the correct action if slide index exists", () => {
            const {result} = renderHook(val => useSwiperColourway(val), {
                initialProps: {...mockHookParams, slides: [mockSlides[0]]},
            })

            act(() => {
                result.current.handleProductSlideChange({
                    activeIndex: 0,
                } as any)
            })

            expect(mockDispatch).toHaveBeenCalledWith({
                colourwayItemNumber: "0000-one",
                type: "SET_SELECTED_COLOURWAY",
            })
        })

        it("should not dispatch action if slide index exists", () => {
            const {result} = renderHook(val => useSwiperColourway(val), {
                initialProps: {...mockHookParams, slides: [mockSlides[0]]},
            })

            act(() => {
                result.current.handleProductSlideChange({
                    activeIndex: 1,
                } as any)
            })

            expect(mockDispatch).not.toHaveBeenCalled()
        })

        describe("and when thumb swiper is set", () => {
            it("should slide to the corresponding thumb gallery index", () => {
                const mockThumbSlideTo = jest.fn()
                const {result} = renderHook(val => useSwiperColourway(val), {
                    initialProps: {...mockHookParams, slides: [mockSlides[0]]},
                })

                act(() => {
                    result.current.setThumbsSwiper({slideTo: mockThumbSlideTo} as any)
                    result.current.handleProductSlideChange({
                        activeIndex: 1,
                    } as any)
                })

                expect(mockThumbSlideTo).toHaveBeenCalled()
            })

            describe("and when is desktop breakpoint", () => {
                it("should not slide to the corresponding thumb gallery index", () => {
                    const mockThumbSlideTo = jest.fn()
                    const {result} = renderHook(val => useSwiperColourway(val), {
                        initialProps: {...mockHookParams, slides: [mockSlides[0]], isDesktopBreakPoint: true},
                    })

                    act(() => {
                        result.current.setThumbsSwiper({slideTo: mockThumbSlideTo} as any)
                        result.current.handleProductSlideChange({
                            activeIndex: 1,
                        } as any)
                    })

                    expect(mockThumbSlideTo).not.toHaveBeenCalled()
                })
            })
        })
    })

    describe("when swiper reference is stored and currentSlideIndex changes", () => {
        it("should slide to the next index with the correct behavior", () => {
            const mockSlideTo = jest.fn()
            const {result, rerender} = renderHook(val => useSwiperColourway(val), {
                initialProps: {...mockHookParams, slides: mockSlides},
            })

            act(() => {
                result.current.handleOnProductSwiper({slideTo: mockSlideTo} as any)
            })
            rerender({...mockHookParams, slides: mockSlides, currentSlideIndex: 1})

            expect(mockSlideTo).toHaveBeenCalledWith(1, 0, false)
        })
    })

    describe("when 'thumbsContainerRef' is set and 'handleThumbsSwipeEnd' is triggered", () => {
        it("should set scrollLeft on swipe forward and backward", () => {
            const {result} = renderHook(val => useSwiperColourway(val), {
                initialProps: {
                    ...mockHookParams,
                    thumbsGallery: mockThumbsGallery,
                    slides: mockSlides,
                },
            })

            act(() => {
                result.current.thumbsContainerRef.current = {
                    clientWidth: 24,
                } as any

                result.current.handleThumbsSwipeEnd({
                    previousIndex: 17,
                    activeIndex: 18,
                } as any)
            })

            expect(result.current.thumbsContainerRef.current?.scrollLeft).toBe(432)

            act(() => {
                result.current.handleThumbsSwipeEnd({
                    previousIndex: 1,
                    activeIndex: 0,
                } as any)
            })

            expect(result.current.thumbsContainerRef.current?.scrollLeft).toBe(0)
        })
    })

    describe("when 'thumbsContainerRef' is set and 'handleThumbsSwipeEnd' is triggered when it is not left to right", () => {
        it("should set scrollLeft on swipe forward and backward", () => {
            mockSelectIsLeftToRight(false)
            const {result} = renderHook(val => useSwiperColourway(val), {
                initialProps: {
                    ...mockHookParams,
                    thumbsGallery: mockThumbsGallery,
                    slides: mockSlides,
                },
            })

            act(() => {
                result.current.thumbsContainerRef.current = {
                    clientWidth: 24,
                } as any

                result.current.handleThumbsSwipeEnd({
                    previousIndex: 17,
                    activeIndex: 18,
                } as any)
            })

            expect(result.current.thumbsContainerRef.current?.scrollLeft).toBe(0)

            act(() => {
                result.current.handleThumbsSwipeEnd({
                    previousIndex: 2,
                    activeIndex: 1,
                } as any)
            })

            expect(result.current.thumbsContainerRef.current?.scrollLeft).toBe(24)
        })
    })


    describe("when 'thumbsContainerRef' is not set and 'handleThumbsSwipeEnd' is triggered", () => {
        it("should not set a 'scrollLeft' value on the thumbs container", () => {
            const {result} = renderHook(() => useSwiperColourway(mockHookParams))

            act(() => {
                result.current.handleThumbsSwipeEnd({
                    previousIndex: 0,
                    activeIndex: 1,
                } as any)
            })

            expect(result.current.thumbsContainerRef.current).toBe(null)
        })
    })

    describe('when "handleSetSelectedColourway" is triggered', () => {
        it("should dispatch the correct action", () => {
            const mockDispatch = jest.fn()
            mockUseDispatchReturnValue(mockDispatch)

            const {result} = renderHook(val => useSwiperColourway(val), {
                initialProps: {...mockHookParams, slides: [mockSlides[0]]},
            })

            act(() => {
                result.current.handleSetSelectedColourway("000-one")
            })

            expect(mockDispatch).toHaveBeenCalledWith({
                colourwayItemNumber: "000-one",
                type: "SET_SELECTED_COLOURWAY",
            })
        })
    })

    describe('When "canLoadVisibleColourways" is true and "isDesktopBreakPoint" is true', () => {
        beforeEach(() => {
            mockCanLoadVisibleColourways(true)
        })

        it("should return the preload images", () => {
            renderHook(val => useSwiperColourway(val), {
                initialProps: {
                    ...mockHookParams,
                    isDesktopBreakPoint: true,
                    slides: mockSlides,
                },
            })

            expect(mockPreloader).toHaveBeenCalledWith(["slide-one-url", "slide-two-url", "slide-three-url"])
        })
    })
})
