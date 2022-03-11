import styled from "styled-components"
import Grid from "@mui/material/Grid"
import {breakpoints} from "@monorepo/themes"

export const ReviewPanelContainer = styled(Grid)`
    && {
        @media (max-width: ${breakpoints.values.md - 1}px) {
            padding: 0rem 1rem 1rem 1rem;
            margin-top: 0rem;
        }

        border-top: 0.0625rem solid #eaeaea;
        margin-top: 1rem;
    }
`

//  TODO: Get font-weight and font-family from theme
export const ReviewTitleContainer = styled(Grid)`
    && {
        font-weight: bold;
        font-size: 0.938rem;
        margin-top: 0.75rem;
        margin-bottom: 0.75rem;
    }
`

export const ReviewProviderLogoContainer = styled(Grid)`
    && {
        display: flex;
        justify-content: flex-end;
    }
`

//  TODO: Get background-color and font size from theme
export const ReviewSummaryContainer = styled(Grid)`
    && {
        height: 3.125rem;
        padding: 1rem;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 0.875rem;
    }
`
