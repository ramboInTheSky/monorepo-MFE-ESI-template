import React, {useEffect, useRef} from "react"
import Typography from "@mui/material/Typography"
import {CTA} from "@monorepo/cta"
import connect from "./connect"
import Checkout from "../Checkout"
import {ShoppingBag} from "../../models/shoppingbag"
import {shoppingBagwheelLock} from "../../utils/wheelLock"
import MiniShoppingBagItems from "../MiniShoppingBagItems"
import {
    MiniShoppingBagContainer,
    CartItemsContainer,
    MiniShoppingBagPriceWrapper,
    ActionWrapper,
    ItemCountWrapper,
    EmptyBagWrapper,
} from "./component"
import {
    HEADER_NAV_BAR_QUICK_LINKS,
    HEADER_NAV_BAR_SHOPPING_BAG_CHECKOUT,
    HEADER_NAV_BAR_SHOPPING_BAG_VIEW_BAG,
    HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG,
} from "../../config/constants"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

export type MiniShoppingBagProps = {
    text: any
    itemCount: number
    bag: ShoppingBag
    shoppingBagUrl: string
}

export const MiniShoppingBag = ({text, itemCount, bag, shoppingBagUrl}: MiniShoppingBagProps) => {
    const showEmpty = !itemCount && (!bag?.Items || bag?.Items?.length < 1)
    const bagContainerRef = useRef<HTMLDivElement | null>(null)
    const bagItemsRef = useRef<HTMLDivElement | null>(null)

    const handleWheelLock = e => shoppingBagwheelLock(e, bagContainerRef, bagItemsRef)

    useEffect(() => {
        const bagContainer = bagContainerRef.current
        // eslint-disable-next-line no-unused-expressions
        bagContainer?.addEventListener("wheel", handleWheelLock, {passive: false})
        return () => {
            // eslint-disable-next-line no-unused-expressions
            bagContainer?.removeEventListener("wheel", handleWheelLock)
        }
    }, [])

    return (
        <MiniShoppingBagContainer data-testid="header-mini-shopping-bag" ref={bagContainerRef}>
            <ItemCountWrapper variant="h4" data-testid="header-mini-shopping-bag-item-count">
                {`${itemCount} ${itemCount === 1 ? text.itemText : text.itemsText} ${text.inBagText}`}
            </ItemCountWrapper>

            {showEmpty ? (
                <>
                    <EmptyBagWrapper>
                        <Typography variant="h5" data-testid="header-mini-shopping-bag-empty">
                            {text.emptyBagText}
                        </Typography>
                    </EmptyBagWrapper>
                    <MiniShoppingBagPriceWrapper>
                        <Typography variant="h5" component="p">
                            {text.totalText}
                        </Typography>
                        <Typography variant="h5" component="p">
                            {bag.FinalOrderValueFormatted}
                        </Typography>
                    </MiniShoppingBagPriceWrapper>
                </>
            ) : (
                <>
                    <CartItemsContainer data-testid="header-mini-shopping-bag-list" ref={bagItemsRef}>
                        <MiniShoppingBagItems />
                    </CartItemsContainer>
                </>
            )}

            <ActionWrapper>
                <CTA
                    enable
                    text={text.viewAndEditBag}
                    url={shoppingBagUrl}
                    themeType="Secondary"
                    dataGaV1={HEADER_NAV_BAR_QUICK_LINKS}
                    dataGaV2={HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG}
                    dataGaV3={HEADER_NAV_BAR_SHOPPING_BAG_VIEW_BAG}
                    onClick={removeFromLocalStorage}
                />
                <Checkout
                    dataGaV1={HEADER_NAV_BAR_QUICK_LINKS}
                    dataGaV2={HEADER_NAV_BAR_QUICK_LINKS_SHOPPING_BAG}
                    dataGaV3={HEADER_NAV_BAR_SHOPPING_BAG_CHECKOUT}
                />
            </ActionWrapper>
        </MiniShoppingBagContainer>
    )
}

export default connect(MiniShoppingBag)
