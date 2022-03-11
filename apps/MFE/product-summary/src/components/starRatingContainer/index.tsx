import React from "react"

import {StarRating} from "@monorepo/star-rating"
import connect from "./connect"
import {StarRatingWrapper} from "./components"

interface StarRatingContainerProps {
    overallStarRating: number
    linkUrl: string
    tooltipTitle: string
}

export const StarRatingContainer = ({overallStarRating, linkUrl, tooltipTitle}: StarRatingContainerProps) => (
    <StarRatingWrapper
        className={overallStarRating > 0 ? "" : "prod-summary-star-rating--hidden"}
        title={`${tooltipTitle} | ${overallStarRating} rating`}
        href={linkUrl}
        data-testid={`product_summary_star-rating${overallStarRating > 0 ? "" : "--hidden"}`}
        tabIndex={overallStarRating > 0 ? 0 : -1}
    >
        <StarRating value={overallStarRating} />
    </StarRatingWrapper>
)

export default connect(StarRatingContainer)
