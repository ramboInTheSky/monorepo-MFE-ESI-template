import styled from "styled-components"
import {Grid} from "@mui/material"

export const StarRatingContainer = styled(Grid)`
    && {
        align-items: center;
        width: auto;
    }

    && > div {
        display: inline-flex;
    }
`
export const StarRatingsCount = styled.span`
    font-size: 0.8rem;
    line-height: 1.1rem;
    padding-left: 0.1875rem;
`
