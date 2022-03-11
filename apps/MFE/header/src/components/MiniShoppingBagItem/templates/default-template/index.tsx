import React from "react"

import Typography from "@mui/material/Typography"
import {PriceParentWrapper, ProductDetailItem, ProductDetails, StatusWrapper} from "./component"

export type MiniShoppingBagDescriptionProps = {
    ProductName: string
    Description: string
    AlternativeDescription: string
    sizeText: string
    SizeDescription: string
    qtyText: string
    Quantity: string
    StockStatus: string
    StockMessage: string
    ciStoreName: string
    PriceFormatted: string
    text: any
    IsDiscount: boolean
}

export const MiniShoppingBagDescription = ({
    AlternativeDescription,
    Description,
    IsDiscount,
    PriceFormatted,
    sizeText,
    SizeDescription,
    Quantity,
    StockMessage,
    StockStatus,
    ciStoreName,
    qtyText,
    text,
}: MiniShoppingBagDescriptionProps) => {
    return (
        <ProductDetails>
            <ProductDetailItem>
                <Typography variant="h5" data-testid="header-mini-shopping-bag-item-description">
                    {AlternativeDescription || Description}
                </Typography>
                <PriceParentWrapper>
                    <Typography variant="h5" align="right">
                        {PriceFormatted}
                    </Typography>
                    {IsDiscount && (
                        <Typography variant="h5" color="error" data-testid="header-mini-shopping-bag-item-sale-price">
                            {text.salePrice}
                        </Typography>
                    )}
                </PriceParentWrapper>
            </ProductDetailItem>

            <Typography variant="body1">
                {sizeText} {SizeDescription}
            </Typography>

            <Typography variant="body1">
                {qtyText} {Quantity}
            </Typography>

            <StatusWrapper status={StockStatus}>{`${StockMessage} ${ciStoreName}`}</StatusWrapper>
        </ProductDetails>
    )
}
