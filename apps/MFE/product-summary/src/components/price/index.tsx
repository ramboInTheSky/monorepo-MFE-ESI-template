import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import Link from "@mui/material/Link"
import {SalePrice, WasPrice, PriceValue, PriceContainer, SmDown, MdUp, FromPrice, RectangleDivider} from "./components"
import connect from "./connect"
import {handleProductClick} from "../../events"
import {selectPriceType} from "../../utils/priceFormatter/selectPriceType"
import {TextModel} from "../../models/Text"

interface PriceProps {
    price: string
    linkUrl: string
    tooltipTitle: string
    salePrice: string | null
    wasPrice: string | null
    id: string
    title: string
    colour: string
    currencyCode: string
    text: TextModel
    colourwaysHasSale: boolean
    department: string
    brandNameEnabled: boolean
    isMade2Measure: boolean
    minPrice: string
}

export const Price = ({
    price,
    tooltipTitle,
    linkUrl,
    salePrice,
    wasPrice,
    id,
    title,
    colour,
    currencyCode,
    text,
    colourwaysHasSale,
    department,
    brandNameEnabled,
    isMade2Measure,
    minPrice,
}: PriceProps) => {
    const wasPriceText = `${text.price.was} ${wasPrice}`
    const salePriceText = `${text.price.now} ${salePrice}`
    const wasPriceTextMobile = `${text.price.mobileWas} ${wasPrice}`
    const salePriceTextMobile = `${text.price.mobileNow} ${salePrice}`
    return (
        <PriceContainer>
            {brandNameEnabled && <RectangleDivider />}
            <Link
                href={linkUrl}
                title={tooltipTitle}
                variant="h5"
                data-testid={formatTextTestIds("product_summary_price")}
                onClick={() => {
                    handleProductClick({
                        id,
                        title,
                        price: selectPriceType(price, salePrice),
                        colour,
                        currencyCode,
                        department,
                    })
                }}
            >
                {salePrice && !isMade2Measure && (
                    <div aria-label={`${title} ${wasPriceText} ${salePriceText}`}>
                        <SmDown>
                            <WasPrice
                                data-testid={formatTextTestIds("product_summary_was_price")}
                                brandNameEnabled={brandNameEnabled}
                            >
                                {wasPriceText}
                            </WasPrice>
                            <SalePrice
                                data-testid={formatTextTestIds("product_summary_sale_price")}
                                brandNameEnabled={brandNameEnabled}
                            >
                                {salePriceText}
                            </SalePrice>
                        </SmDown>
                        <MdUp>
                            <WasPrice
                                data-testid={formatTextTestIds("product_summary_was_price")}
                                brandNameEnabled={brandNameEnabled}
                            >
                                {wasPriceTextMobile}
                            </WasPrice>
                            <SalePrice
                                data-testid={formatTextTestIds("product_summary_sale_price")}
                                brandNameEnabled={brandNameEnabled}
                            >
                                {salePriceTextMobile}
                            </SalePrice>
                        </MdUp>
                    </div>
                )}
                {!salePrice && !isMade2Measure && <PriceValue aria-label={`${title} ${price}`}>{price}</PriceValue>}
                {isMade2Measure && (
                    <>
                        <FromPrice data-testid={formatTextTestIds("product_summary_from_price")}>
                            {text.price.from} {minPrice}
                        </FromPrice>
                    </>
                )}
            </Link>
            {colourwaysHasSale && !salePrice && (
                <SalePrice
                    data-testid={formatTextTestIds("product_summary_sale_placeholder")}
                    brandNameEnabled={brandNameEnabled}
                >
                    &nbsp;
                </SalePrice>
            )}
        </PriceContainer>
    )
}
export default connect(Price)
