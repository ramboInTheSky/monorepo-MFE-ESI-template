import styled from "styled-components"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import {breakpoints} from "@monorepo/themes"
import Link from "@mui/material/Link"

export const LanguageSelectorWrapper = styled("div")`
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
    height: 2.125rem;

    /* override existing css in mvc */
    box-sizing: content-box;
    @media (min-width: ${breakpoints.values.md}px) {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        padding: 0.75rem 1.125rem;
        height: 42px;
    }
`

export const LanguageSelectorImg = styled("img")`
    padding: 0.25rem 0;
    vertical-align: middle;
    display: inline;
`

export const LanguageSelectorElement = styled(Grid)`
    span {
        display: inline-block;
    }
    a,
    span {
        font-size: 0.875rem;
        text-transform: capitalize;
    }
`

export const LanguageSelectorLink = styled(Link)`
    &&&.altLanguageLink {
        display: inline-block;
        padding: 0;
        color: ${props => props.theme.colours.text.hyperlink};

        &:active,
        &:hover,
        &:focus,
        &:visited {
            color: ${props => props.theme.colours.text.hyperlink};
        }
    }
`

export const LanguageSelectorTitle = styled(Typography)`
    &&& {
        display: inline-block;
        margin: 0 0.25rem 0 1.125rem;
    }
`

export const LanguageSelectorDescription = styled(Typography)`
    display: inline-block;
`
