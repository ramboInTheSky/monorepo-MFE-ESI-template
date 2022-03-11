import React from "react"
import {CTA} from "@monorepo/cta"
import connect from "./connect"
import {Container, ActionWrapper, NotificationMessage} from "./component"

export type ShoppingBagNotificationProps = {
    text: any
    itemCount: number
    checkoutUrl: string
}

export const ShoppingBagNotification = ({text, itemCount, checkoutUrl}: ShoppingBagNotificationProps) => {
    return itemCount === 0 ? null : (
        <Container data-testid="header-shopping-bag-notification">
            <NotificationMessage variant="h4" data-testid="header-shopping-bag-notification-message">
                {`${text.shoppingBag.youhaveText} ${itemCount} ${
                    itemCount === 1 ? text.shoppingBag.itemText : text.shoppingBag.itemsText
                } ${text.shoppingBag.inYourBagText}`}
            </NotificationMessage>

            <ActionWrapper data-testid="header-shopping-bag-notification-view-edit-bag-btn">
                <CTA enable text={text.miniShoppingBag.viewAndEditBag} url={checkoutUrl} themeType="Secondary" />
            </ActionWrapper>
        </Container>
    )
}

export default connect(ShoppingBagNotification)
