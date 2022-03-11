import React from "react"

import {ProductDetails, ProductNameH, Price, SearchDescription, StatusWrapper} from "./component"

export type BurgerMenuMiniShoppingBagDescriptionProps = {
    ProductName: string
    PriceFormatted: string
    TPSearchDescription: string
    Description: string
    sizeText: string
    SizeDescription: string
    qtyText: string
    Quantity: string
    StockStatus: string
    StockMessage: string
    ciStoreName: string
}

export const BurgerMenuMiniShoppingBagDescription = ({
    ProductName,
    PriceFormatted,
    TPSearchDescription,
    Description,
    sizeText,
    SizeDescription,
    Quantity,
    StockMessage,
    StockStatus,
    ciStoreName,
    qtyText,
}: BurgerMenuMiniShoppingBagDescriptionProps) => {
    return (
        <ProductDetails>
            <div>
                <ProductNameH data-testid="header-mini-shopping-bag-item-name">
                    <span>{ProductName}</span>
                </ProductNameH>
                <SearchDescription data-testid="header-mini-shopping-bag-item-title">
                    {TPSearchDescription || Description}
                </SearchDescription>
            </div>
            <Price data-testid="header-mini-shopping-bag-item-price">
                {PriceFormatted}
            </Price>
            <div>
                <span className="block">
                    {sizeText} {SizeDescription}
                </span>
                <span className="block mt-5px">
                    {qtyText} {Quantity}
                </span>
            </div>
            <StatusWrapper status={StockStatus}>{`${StockMessage} ${ciStoreName}`}</StatusWrapper>
        </ProductDetails>
    )
}
