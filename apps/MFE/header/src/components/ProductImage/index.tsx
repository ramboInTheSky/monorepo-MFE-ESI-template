import React from "react"
import Link from "../Link"
import {ImageWrapper, Image} from "./component"

export type ProductImageProps = {
    description: string
    itemImageUrl?: string
    url: string
    itemNumber: string
}

export const ProductImage = ({itemImageUrl, url, description, itemNumber}: ProductImageProps) => {
    const img = (
        <ImageWrapper>
            <Image data-testid="header-mini-shopping-bag-item-image" src={itemImageUrl} alt={description} />
        </ImageWrapper>
    )
    let imageContainer = img
    if (url !== "") {
        imageContainer = <Link href={`${url}#${itemNumber}`}>{img}</Link>
    }

    return imageContainer
}

export default ProductImage
