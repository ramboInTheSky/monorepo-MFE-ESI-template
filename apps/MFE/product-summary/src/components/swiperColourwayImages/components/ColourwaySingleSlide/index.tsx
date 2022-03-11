import React, {FC} from "react"
import {SwiperContainer as SingleImageContainer, EmptyDivider} from "../../components"
import {ColourwayImageSlide} from "../ColourwayImageSlide"
import {ColourwaySwiperDetails, ColourwaySwiperDetailsProps} from "../ColourwaySwiperDetails"
import {SlideDetail} from "../../helpers"

interface ColourwaySingleSlideProps {
    slide: SlideDetail
    imageDetails: ColourwaySwiperDetailsProps
    isOnServer?: boolean
}

export const ColourwaySingleSlide: FC<ColourwaySingleSlideProps> = ({slide, imageDetails, isOnServer = false}) => (
    <>
        <SingleImageContainer>
            <ColourwayImageSlide isActiveSlide {...slide} singleTile>
                <ColourwaySwiperDetails {...imageDetails} isOnServer={isOnServer} />
            </ColourwayImageSlide>
        </SingleImageContainer>
        <EmptyDivider />
    </>
)
