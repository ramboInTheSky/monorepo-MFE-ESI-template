import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import Typography from "@mui/material/Typography"
import {ChargesAndIncentive} from "../../models/shoppingbag"
import {PromotionWrapper} from "../MiniShoppingBagItems/component"

export type ChargesAndIncentiveItemProps = {
    incentive: ChargesAndIncentive
}

export const ChargesAndIncentiveItem = ({incentive}: ChargesAndIncentiveItemProps) => {
    return (
        <PromotionWrapper>
            <Typography variant="h5">{incentive.OfferTypeDescription}</Typography>
            <Typography variant="h5" data-testid={formatTextTestIds("header-mini-shopping-bag-additional-incentive")}>
                {incentive.AdditionalAmountFormatted}
            </Typography>
        </PromotionWrapper>
    )
}

export default ChargesAndIncentiveItem
