import React from "react"
import Grid from "@mui/material/Grid"
import {makeStyles} from "@mui/styles"
import Rating from "@mui/material/Rating"
import {StarRatingContainer, StarRatingsCount} from "./components"
import {defaultFilledColour, defaultEmptyColour, defaultSize, precision} from "./config/constants"

type SizeType = "small" | "medium" | "large"
interface StarRatingProps {
    /**
     * This is the star rating value. A rating can be displayed at a 0.5 precision
     */
    value?: number
    /**
     * This is the number of reviews which is displayed in the count
     */
    countValue?: number
    /**
     * This is the colour property for the filled stars. You can pass a valid css colour i.e. #000000
     */
    starFilledColour?: string
    /**
     * This is the colour property for the empty stars You can pass a valid css colour i.e. #D1D1D1
     */
    starEmptyColour?: string
    /**
     * This is the size property, it can be small, medium or large. Defaults to small
     */
    size?: SizeType
}

const useStyles = makeStyles({
    iconFilled: {
        color: (styleProps: StarRatingProps) => styleProps.starFilledColour,
    },
    iconEmpty: {
        color: (styleProps: StarRatingProps) => styleProps.starEmptyColour,
    },
})

export const StarRating = ({
    value = 0,
    countValue = null,
    starFilledColour = defaultFilledColour,
    starEmptyColour = defaultEmptyColour,
    size = defaultSize,
}: StarRatingProps) => {
    const styleProps = {starFilledColour, starEmptyColour}
    const classes = useStyles(styleProps)

    return (
        <StarRatingContainer container data-testid="star-rating-container">
            <Grid>
                <Rating
                    classes={{...classes}}
                    precision={precision}
                    value={value}
                    size={size}
                    readOnly
                    data-testid="star-rating"
                />
                {typeof countValue === "number" && (
                    <StarRatingsCount className="star-rating-count" data-testid="star-rating-count">
                        ({countValue})
                    </StarRatingsCount>
                )}
            </Grid>
        </StarRatingContainer>
    )
}

StarRating.defaultProps = {
    value: 0,
    countValue: null,
    starFilledColour: defaultFilledColour,
    starEmptyColour: defaultEmptyColour,
    size: defaultSize,
}
