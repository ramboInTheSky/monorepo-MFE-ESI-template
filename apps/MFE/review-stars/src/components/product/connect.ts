import {connect} from "react-redux"
import State from "../../models/state"

export const mapStateToProps = (state: State) => {
    const {
        reviewStars: {
            overallStarRating,
            totalReviewCount
        },
    } = state

    return {
        overallStarRating,
        totalReviewCount,
        hasReviews: totalReviewCount > 0
    }
}

export default connect(mapStateToProps)
