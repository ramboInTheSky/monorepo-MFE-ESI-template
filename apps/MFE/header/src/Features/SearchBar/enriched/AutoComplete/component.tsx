import styled from "styled-components"
import Grid from "@mui/material/Grid"
import {breakpoints} from "@monorepo/themes"

export const AutocompleteContent = styled.div`
    ul {
        @media (min-width: ${breakpoints.values.sm}px) and (max-width: ${breakpoints.values.md - 1}px) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            li {
                flex-basis: calc(100% / 2);
                padding-right: 1rem;
            }
        }
    }
`
export const AutocompleteGrid = styled(Grid)`
    border-bottom: ${props => props.theme.colours.utilities.divider};
    padding-bottom: 1rem;

    @media (min-width: ${breakpoints.values.md}px) {
        border-bottom: 0;
        padding-bottom: 0rem;

        border-right: ${props => props.theme.colours.utilities.divider};
    }
`

export const AutocompleteProductsGrid = styled(Grid)`
    padding-top: 1rem;
    min-height: 300px;
    @media (min-width: ${breakpoints.values.md}px) {
        padding-top: 0;
        padding-left: 1rem;
    }
`

export const NoResultText = styled.span`
    padding: 0.5rem 0;
    display: block;
    font-size: 0.875rem;
    font-family: ${props => `${props.theme.colours.font.primary.regular.family}, ${props.theme.colours.font.default}`};
    line-height: 1.5;
    word-break: break-word;

    strong {
        font-family: ${props =>
            `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
    }

    @media (min-width: ${breakpoints.values.md}px) {
        padding: 0.5rem 0;
    }
`
