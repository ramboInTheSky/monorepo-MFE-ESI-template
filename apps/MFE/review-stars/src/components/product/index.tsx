import React from "react"
import {StarRating} from "@monorepo/star-rating"
import connect from "./connect"
import {StarRatingContainer} from "./component"

interface ProductReviewStarsComponentProps {
    overallStarRating: number
    totalReviewCount: number
    hasReviews: boolean
}

export const ProductReviewStars = ({
    overallStarRating,
    totalReviewCount,
    hasReviews,
}: ProductReviewStarsComponentProps) => (
    <StarRatingContainer className={!hasReviews ? "no-reviews" : ""}>
        <StarRating value={overallStarRating} countValue={totalReviewCount} />
    </StarRatingContainer>
)

export default connect(ProductReviewStars)
