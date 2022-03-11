import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import "@material-ui/lab/Rating"
import connect from "./connect"
import {BASELINE_PRODUCT_ID, SuitType, ProductType, SofaType} from "../../config/constants"
import {TileCard, TileCardContent, ImageContainer, TileCardBrandName, TileCardBrandNameWrapper} from "./components"
import ColourwayTitle from "../colourwaytitle"
import ColourwayImages from "../swiperColourwayImages"
import ColourChips from "../colourchips"
import Price from "../price"

import SuitPrice from "../suitPrice"
import SuitTitle from "../suitTitle"
import ProductFavourites from "../favourites"
import StarRatingContainer from "../starRatingContainer"

interface ProductComponentProps {
    itemNumber: string
    favouriteBtnEnabled: boolean
    productType: typeof SuitType | typeof ProductType | typeof SofaType
    enableReviewStars: boolean
    enableBrandDisplay: boolean
    brand: string
}

export const Product = (props: ProductComponentProps) => {
    const {itemNumber, favouriteBtnEnabled, productType, enableReviewStars, enableBrandDisplay, brand} = props

    return (
        <TileCard square elevation={0} data-testid={formatTextTestIds(`${productType}_summary_tile_${itemNumber}`)}>
            <ImageContainer>
                <ColourwayImages />
                {favouriteBtnEnabled && <ProductFavourites />}
            </ImageContainer>
            <TileCardContent data-testid={formatTextTestIds(`${productType}_tile_card_content_${itemNumber}`)}>
                {enableBrandDisplay && brand !== null && (
                    <TileCardBrandNameWrapper
                        data-testid={formatTextTestIds(`${productType}_summary_tile_${itemNumber}_brand_wrapper`)}
                    >
                        <TileCardBrandName
                            data-testid={formatTextTestIds(`${productType}_summary_tile_${itemNumber}_brand_name`)}
                        >
                            {brand}
                        </TileCardBrandName>
                    </TileCardBrandNameWrapper>
                )}
                {(productType === ProductType || productType === SofaType || itemNumber === BASELINE_PRODUCT_ID) && (
                    <>
                        <ColourwayTitle />
                        <Price />
                    </>
                )}
                {(productType === SuitType || itemNumber === BASELINE_PRODUCT_ID) && (
                    <>
                        <SuitTitle />
                        <SuitPrice />
                    </>
                )}
                {enableReviewStars && <StarRatingContainer />}
                <ColourChips />
            </TileCardContent>
        </TileCard>
    )
}

export default connect(Product)
