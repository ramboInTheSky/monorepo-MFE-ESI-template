import React, {useRef, useEffect} from "react"
import Typography from "@mui/material/Typography"
import connect from "./connect"
import {ShoppingBag} from "../../models/shoppingbag"
import MiniShoppingBagItem from "../MiniShoppingBagItem"
import ChargesAndIncentiveList from "../ChargesAndIncentiveList"
import {bagItemsWheelLock} from "../../utils/wheelLock"
import {
    PriceWrapperItem,
    PromotionWrapper,
    ItemsContainer,
    MiniShoppingBagContainer,
    StandardDeliveryContainer,
} from "./component"

export type MiniShoppingBagItemsProps = {
    text: any
    bag: ShoppingBag
}

export const MiniShoppingBagItems = ({text, bag}: MiniShoppingBagItemsProps) => {
    const {
        Items: items,
        Description,
        MultiBuyDiscount,
        FinalOrderValueFormatted,
        MultiBuyDiscountFormatted,
        ChargesAndIncentives,
    } = bag
    const bagItemsContainerRef = useRef<HTMLDivElement | null>(null)
    const bagItemsRef = useRef<HTMLDivElement | null>(null)

    const handleWheelLock = e => bagItemsWheelLock(e, bagItemsContainerRef, bagItemsRef)

    useEffect(() => {
        const bagItemsContainer = bagItemsContainerRef.current
        // eslint-disable-next-line no-unused-expressions
        bagItemsContainer?.addEventListener("wheel", handleWheelLock, {passive: false})
        return () => {
            // eslint-disable-next-line no-unused-expressions
            bagItemsContainer?.removeEventListener("wheel", handleWheelLock)
        }
    }, [])

    return (
        <MiniShoppingBagContainer ref={bagItemsContainerRef}>
            <ItemsContainer data-testid="header-mini-shopping-bag-items" ref={bagItemsRef}>
                {items.map(item => (
                    <MiniShoppingBagItem item={item} key={item.ItemID} text={text} />
                ))}
            </ItemsContainer>
            {MultiBuyDiscount > 0 && (
                <PromotionWrapper>
                    <Typography variant="h5">{text.promotionalText}</Typography>
                    <Typography variant="h5" data-testid="header-mini-shopping-bag-multibuy-discount">
                        {`${text.negative}${MultiBuyDiscountFormatted}`}
                    </Typography>
                </PromotionWrapper>
            )}
            {ChargesAndIncentives && !!ChargesAndIncentives.length && (
                <ChargesAndIncentiveList incentives={ChargesAndIncentives} />
            )}

            <PriceWrapperItem>
                <span>{text.totalText}</span>
                <span data-testid="header-mini-shopping-bag-total">{FinalOrderValueFormatted}</span>
            </PriceWrapperItem>
            <StandardDeliveryContainer>
                <span>{Description}</span>
            </StandardDeliveryContainer>
        </MiniShoppingBagContainer>
    )
}

export default connect(MiniShoppingBagItems)
