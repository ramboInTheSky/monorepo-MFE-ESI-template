import React from "react"
import {ChargesAndIncentive} from "../../models/shoppingbag"
import ChargesAndIncentiveItem from "../ChargesAndIncentiveItem"

export type ChargesAndIncentiveListProps = {
    incentives: ChargesAndIncentive[]
}

export const ChargesAndIncentiveList = ({incentives}: ChargesAndIncentiveListProps) => {
    return (
        <>
            {incentives.map(x => (
                <ChargesAndIncentiveItem incentive={x} key={`${x.Type}-${x.OfferShortDescription}`} />
            ))}
        </>
    )
}

export default ChargesAndIncentiveList
