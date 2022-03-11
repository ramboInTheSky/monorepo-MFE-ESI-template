import React from "react"
import {Item} from "../../models/shoppingbag"
import {ItemWrapper} from "./component"
import ProductImage from "../ProductImage"
import connect from "./connect"

export type MiniShoppingBagItemProps = {
    item: Item
    text: any
    gridItemInfo?: boolean
    ComponentName: any
}

export const MiniShoppingBagItem = ({
    item: {
        CistStoreName,
        ItemID,
        itemImageUrl,
        Description,
        AlternativeDescription,
        PriceFormatted,
        SizeDescription,
        Quantity,
        StockMessage,
        StockStatus,
        Url,
        IsDiscount,
        ItemNumber,
        ProductName,
        TPSearchDescription,
    },
    text,
    ComponentName,
}: MiniShoppingBagItemProps) => {
    const {sizeText, qtyText, at} = text
    const ciStoreName = CistStoreName ? `${at} ${CistStoreName}` : ""

    return (
        <ItemWrapper key={ItemID}>
            <ProductImage itemImageUrl={itemImageUrl} url={Url} description={Description} itemNumber={ItemNumber} />

            <ComponentName
                ProductName={ProductName}
                IsDiscount={IsDiscount}
                StockStatus={StockStatus}
                StockMessage={StockMessage}
                Quantity={Quantity}
                SizeDescription={SizeDescription}
                Description={Description}
                PriceFormatted={PriceFormatted}
                AlternativeDescription={AlternativeDescription}
                text={text}
                url={Url}
                TPSearchDescription={TPSearchDescription}
                sizeText={sizeText}
                qtyText={qtyText}
                ciStoreName={ciStoreName}
            />
        </ItemWrapper>
    )
}

export default connect(MiniShoppingBagItem)
