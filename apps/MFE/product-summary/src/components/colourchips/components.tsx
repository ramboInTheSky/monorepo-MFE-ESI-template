import { Collapse } from '@mui/material';
import {breakpoints} from "@monorepo/themes"
import styled from "styled-components"

export const ColourChipCollapse = styled(Collapse)`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

export const ColourChipViewButtonContainer = styled.div``

export const ColourChipsList = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    overflow: hidden;
    max-width: 13.5rem;
    margin: 0;
    ${({theme}) =>
        theme.enablingCenteredContent &&
        `
        justify-content: center;
        margin-left: 0.75rem;
    `}
    > li:nth-child(9n) {
        margin-right: 0;
    }
`

export const ColourChipsContainer = styled.div`
    @media (max-width: ${breakpoints.values.lg - 1}px) {
        display: none;
    }

    > div:nth-child(2n) {
        display: ${({theme}) => `${theme.enablingCenteredContent ? "inline-flex" : "flex"}`};
        margin-top: 0 0.5rem 0 0.5rem;
        cursor: pointer;
    }

    > div:nth-child(2n) > button {
        border: 0;
        padding: 0;
        background: none;
        margin-right: 0.5rem;
        color: ${props => props.theme.colours.text.hyperlink};
        font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
        margin-right: 0.5rem;
        font-size: 0.875rem;
        cursor: pointer;
        line-height: 1.5;

        > img {
            margin-left: 0.5rem;
        }
    }
`
