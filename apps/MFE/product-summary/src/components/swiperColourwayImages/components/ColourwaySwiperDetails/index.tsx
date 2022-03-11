import React, {FC} from "react"

import SaleSash from "../../../saleSash"
import FitIcons from "../../../fitIcon"
import {NewInLabel} from "../../components"
import {Fits} from "../../../../config/constants"
import { TextModel } from "../../../../models/Text"

export interface ColourwaySwiperDetailsProps {
    displayNewIn: boolean
    fits: Fits[]
    isOnSale: boolean
    showFitsIcons: boolean
    text: TextModel
    isOnServer?: boolean
}

export const ColourwaySwiperDetails: FC<ColourwaySwiperDetailsProps> = ({
    displayNewIn,
    fits,
    showFitsIcons,
    isOnSale,
    text,
    isOnServer
}) => (
    <>
        {!isOnServer && displayNewIn && <NewInLabel>{text.labels.newIn}</NewInLabel>}
        {!isOnServer && showFitsIcons && <FitIcons fits={fits} />}
        <SaleSash isOnSale={isOnSale} />
    </>
)
