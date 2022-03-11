import React, {FC} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {Swiper, SwiperSlide} from "swiper/react"
import useMediaQuery from "@mui/material/useMediaQuery"
import {breakpoints} from "@monorepo/themes"

import {Fits, PRODUCT_SCROLLBAR_SIZE} from "../../../../config/constants"
import {ColourwayImageSlide} from "../ColourwayImageSlide"
import {SwiperContainer, ThumbsContainer, ThumbsComponent} from "../../components"
import {ColourwaySwiperDetails} from "../ColourwaySwiperDetails"
import {ThumbColourChip} from "../ThumbColourChip"
import {SlideDetail, ThumbGallery, useSwiperColourway} from "../../helpers/useSwiperColourway"
import {TextModel} from "../../../../models/Text"

interface SwiperCarouselProps {
    slides: SlideDetail[]
    thumbsGallery: ThumbGallery[]
    currentSlideIndex: number
    displayNewIn: boolean
    fits: Fits[]
    isOnSale: boolean
    showFitsIcons: boolean
    lazyloadProductImages: boolean
    text: TextModel
}

export const SwiperCarousel: FC<SwiperCarouselProps> = ({
    thumbsGallery,
    slides,
    currentSlideIndex,
    lazyloadProductImages,
    text,
    ...colourwaysImageDetailsProps
}) => {
    const isDesktopBreakPoint = useMediaQuery(`(min-width:${breakpoints.values.lg}px)`)
    const {
        handleProductSlideChange,
        handleThumbsSwipeEnd,
        handleOnProductSwiper,
        handleSetSelectedColourway,
        setThumbsSwiper,
        scrollBarWidth,
        thumbsContainerRef,
        getActiveIndex,
    } = useSwiperColourway({thumbsGallery, slides, currentSlideIndex, isDesktopBreakPoint})

    const virtualProps = {
        virtual: {cache: true, slides},
    }

    const props = virtualProps

    return (
        <>
            {isDesktopBreakPoint ? (
                <SwiperContainer>
                    <Swiper
                        {...props}
                        spaceBetween={2}
                        slidesPerView={1}
                        onSwiper={handleOnProductSwiper}
                        className="product-swiper"
                        onSlideChange={handleProductSlideChange}
                    >
                        {slides.map((slideProps, index) => (
                            <SwiperSlide key={slideProps.id} virtualIndex={index}>
                                <ColourwayImageSlide isActiveSlide={getActiveIndex() === index} {...slideProps}>
                                    <ColourwaySwiperDetails {...colourwaysImageDetailsProps} text={text} />
                                </ColourwayImageSlide>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </SwiperContainer>
            ) : (
                <>
                    <SwiperContainer>
                        <Swiper
                            {...props}
                            spaceBetween={2}
                            slidesPerView={1}
                            onSwiper={handleOnProductSwiper}
                            className="product-swiper"
                            onSlideChange={handleProductSlideChange}
                        >
                            {slides.map((slideProps, index) => (
                                <SwiperSlide key={slideProps.id} virtualIndex={index}>
                                    <ColourwayImageSlide isActiveSlide={getActiveIndex() === index} {...slideProps}>
                                        <ColourwaySwiperDetails {...colourwaysImageDetailsProps} text={text} />
                                    </ColourwayImageSlide>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </SwiperContainer>
                    <ThumbsContainer
                        data-testid={formatTextTestIds("product_summary_thumbs_gallery")}
                        ref={thumbsContainerRef}
                        width={scrollBarWidth}
                    >
                        <ThumbsComponent>
                            {thumbsGallery.map(data => (
                                <ThumbColourChip
                                    {...data}
                                    key={data.id}
                                    setSelectedColourWay={handleSetSelectedColourway}
                                />
                            ))}
                        </ThumbsComponent>
                        <Swiper
                            onSlideChange={handleThumbsSwipeEnd}
                            spaceBetween={2}
                            slidesPerView={1}
                            onSwiper={setThumbsSwiper}
                            className="thumb-swiper"
                            watchSlidesVisibility
                            watchSlidesProgress
                            scrollbar={{
                                draggable: false,
                                dragSize: PRODUCT_SCROLLBAR_SIZE,
                                dragClass: "thumb-scrollbar",
                            }}
                            allowTouchMove={false}
                            virtual
                        >
                            {thumbsGallery.map(({id}, index) => (
                                <SwiperSlide key={id} virtualIndex={index}>
                                    <div />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </ThumbsContainer>
                </>
            )}
        </>
    )
}
