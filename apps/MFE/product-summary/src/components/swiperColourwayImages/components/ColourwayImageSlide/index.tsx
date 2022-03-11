import React, {FC, ReactNode} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {TileCardMedia, TileImage} from "../../components"
import {SlideDetail} from "../../helpers"
import {useProductLazyLoadImage} from "../../../../hooks/useLazyLoadImage"
import {handleProductClick} from "../../../../events"

interface ColourwayImageSlideProps extends SlideDetail {
    children?: ReactNode
    singleTile?: boolean
    numberOfSlides?: number
    index?: number
    isActiveSlide: boolean
}

export const ColourwayImageSlide: FC<ColourwayImageSlideProps> = ({
    id,
    imageUrl,
    linkUrl,
    tooltipTitle,
    children,
    singleTile,
    isActiveSlide,
    textTitle,
    price,
    colour,
    currencyCode,
    department,
}) => {
    const {imageProps} = useProductLazyLoadImage(imageUrl)
    return (
        <TileCardMedia
            $isPositionAbsolute={singleTile}
            title={tooltipTitle}
            component="a"
            href={linkUrl.toLowerCase()}
            onClick={() => {
                handleProductClick({id, title: textTitle, price, colour, currencyCode, department})
            }}
            tabIndex={isActiveSlide ? 0 : -1}
            data-testid="product_summary_image_media"
        >
            <TileImage
                {...imageProps}
                width="224"
                height="336"
                alt={tooltipTitle}
                data-testid={formatTextTestIds(`product_summary_image_${id}`)}
            />
            {children}
        </TileCardMedia>
    )
}
