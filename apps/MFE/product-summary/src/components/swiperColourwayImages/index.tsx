import React, {FC} from "react"

import "lazysizes"
import "lazysizes/plugins/attrchange/ls.attrchange"

import connect from "./connect"
import {Fits} from "../../config/constants"
import {useIsOnClient} from "../../hooks/useIsOnClient"
import {ColourwaySingleSlide} from "./components/ColourwaySingleSlide"
import {SwiperCarousel} from "./components/SwiperCarousel"
import {SlideDetail, ThumbGallery} from "./helpers"
import { TextModel } from "../../models/Text"

interface SwiperColourwayImageProps {
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

export const SwiperColourwayImages: FC<SwiperColourwayImageProps> = props => {
    const {slides, currentSlideIndex, thumbsGallery, ...colourwaysImageDetailsProps} = props
    const {isOnClient} = useIsOnClient()

    if (!isOnClient) {
        return <ColourwaySingleSlide slide={slides[0]} isOnServer imageDetails={colourwaysImageDetailsProps} />
    }

    return slides.length > 1 ? (
        <>
            <SwiperCarousel {...props} />
        </>
    ) : (
        <>
            <ColourwaySingleSlide slide={slides[0]} imageDetails={colourwaysImageDetailsProps} />
        </>
    )
}

export default connect(SwiperColourwayImages)
