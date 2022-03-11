import {useCallback, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import SwiperCore, {Scrollbar, Virtual} from "swiper"

import {PRODUCT_SCROLLBAR_SIZE, SHOW_INITIAL_COLOURCHIPS} from "../../../config/constants"
import {selectIsLeftToRight} from "../../../ducks/text-alignment"
import {
    selectCanLoadVisibleColourways,
    setSelectedColourwayAction,
    setAnimateFavouriteIcon,
} from "../../../ducks/productSummary"
import {usePreloadImages} from "../../../hooks/usePreloadImages"

SwiperCore.use([Virtual, Scrollbar])

export interface ThumbGallery {
    id: string
    imageUrl: string
    altText: string
}

export interface SlideDetail {
    imageUrl: string
    tooltipTitle: string
    linkUrl: string
    id: string
    lazyloadProductImages: boolean
    textTitle: string
    colour: string
    currencyCode: string
    department: string
    price: string
}

export interface UseSwiperColourwayParams {
    thumbsGallery: ThumbGallery[]
    currentSlideIndex: number
    slides: SlideDetail[]
    isDesktopBreakPoint: boolean
}

export const useSwiperColourway = ({
    thumbsGallery,
    currentSlideIndex,
    slides,
    isDesktopBreakPoint,
}: UseSwiperColourwayParams) => {
    const thumbsContainerRef = useRef<HTMLDivElement | null>(null)
    const productSwiperRef = useRef<SwiperCore>()
    const thumbsSwiperRef = useRef<SwiperCore>()
    const activeSlideIndexRef = useRef<number>(0)
    const preloadImages = usePreloadImages()
    const dispatch = useDispatch()
    const canLoadVisibleColourways = useSelector(selectCanLoadVisibleColourways)
    const isLeftToRight = useSelector(selectIsLeftToRight)

    const scrollBarWidth = thumbsGallery.length * PRODUCT_SCROLLBAR_SIZE

    const preloadVisibleColourWayImages = useCallback(() => {
        preloadImages(slides.map(item => item.imageUrl).slice(0, SHOW_INITIAL_COLOURCHIPS))
    }, [slides, preloadImages])

    useEffect(() => {
        if (!productSwiperRef.current || currentSlideIndex === activeSlideIndexRef.current) return
        productSwiperRef.current.slideTo(currentSlideIndex, 0, false)
    }, [currentSlideIndex])

    useEffect(() => {
        if (!canLoadVisibleColourways || !isDesktopBreakPoint) return
        preloadVisibleColourWayImages()
    }, [canLoadVisibleColourways, preloadVisibleColourWayImages, isDesktopBreakPoint])

    const handleOnProductSwiper = useCallback((sc: SwiperCore) => {
        productSwiperRef.current = sc
    }, [])

    const setThumbsSwiper = useCallback((sc: SwiperCore) => {
        thumbsSwiperRef.current = sc
    }, [])

    const handleThumbsSwipeEnd = useCallback(
        (sc: SwiperCore) => {
            if (!thumbsContainerRef.current) return
            let scrolledWidth: number

            if (isLeftToRight) {
                scrolledWidth = Math.floor(
                    (PRODUCT_SCROLLBAR_SIZE / thumbsContainerRef.current.clientWidth) * sc.activeIndex,
                )
            } else {
                scrolledWidth = Math.floor(
                    PRODUCT_SCROLLBAR_SIZE / thumbsContainerRef.current.clientWidth / sc.activeIndex,
                )
            }
            thumbsContainerRef.current.scrollLeft = scrolledWidth * thumbsContainerRef.current.clientWidth
        },
        [isLeftToRight],
    )

    const handleSetSelectedColourway = useCallback(
        (colourWayId: string) => {
            dispatch(setSelectedColourwayAction(colourWayId))
            dispatch(setAnimateFavouriteIcon(false))
        },
        [dispatch],
    )

    const handleProductSlideChange = useCallback(
        (sc: SwiperCore) => {
            const actualIndex = sc.activeIndex
            const currentSlide = slides[actualIndex]

            if (thumbsSwiperRef.current && !isDesktopBreakPoint) {
                thumbsSwiperRef.current.slideTo(actualIndex)
            }

            if (currentSlide) {
                handleSetSelectedColourway(currentSlide.id)
            }
            activeSlideIndexRef.current = actualIndex
        },
        [slides, handleSetSelectedColourway, isDesktopBreakPoint],
    )

    const getActiveIndex = useCallback(() => {
        return activeSlideIndexRef.current
    }, [])
    return {
        handleProductSlideChange,
        handleThumbsSwipeEnd,
        handleOnProductSwiper,
        setThumbsSwiper,
        handleSetSelectedColourway,
        scrollBarWidth,
        thumbsContainerRef,
        getActiveIndex,
    }
}
