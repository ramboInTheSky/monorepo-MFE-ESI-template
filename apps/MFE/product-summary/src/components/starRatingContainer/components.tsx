import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const StarRatingWrapper = styled.a`
    min-height: 1.125rem;
    display: ${({theme}) => `${theme.enablingCenteredContent ? "inline-block" : "block"}`};
    @media (min-width: ${breakpoints.values.md}px) {
        display: inline-block;
        vertical-align: top;
        margin-top: 0.05rem;
    }
`
