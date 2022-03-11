import styled from "styled-components"
import Button from "@mui/material/Button"

export const OpenFiltersButton = styled(Button)`
    && {
        background: ${({theme}) => theme.colours.form.buttonSecondary.background};
        border: ${({theme}) => theme.colours.form.buttonSecondary.border};
        color: ${({theme}) => theme.colours.form.buttonSecondary.color};
        font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
        font-size: 0.75rem;
        height: 2.25rem;
        text-transform: uppercase;
        width: 7.0625rem;
        margin-bottom: 0.375rem;

        &:hover,
        &:active,
        &:focus {
            background: ${({theme}) => theme.colours.form.buttonSecondary.background};
            border: ${({theme}) => theme.colours.form.buttonSecondary.border};
            color: ${({theme}) => theme.colours.form.buttonSecondary.color};
        }
    }
`

export const ButtonContainer = styled.div`
    border-top: ${({theme}) => theme.colours.plp.facetDivider};
    margin-top: 1rem;
    padding-top: 1rem;
    cursor: pointer;
`
