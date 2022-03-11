import styled from "styled-components"
import Typography from "@mui/material/Typography"
import {breakpoints} from "@monorepo/themes"
import {Button as MUIButton} from "@mui/material"

export const CloseIcon = styled.img`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    height: 2.75rem;
    width: 2.75rem;
`

export const ClearButton = styled(MUIButton).attrs({disableRipple: true})`
    && {
        color: ${props => props.theme.colours.text.hyperlink};
        background: none;
        font-family: ${props =>
            `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
        font-size: 0.875rem;
        font-weight: ${props => props.theme.colours.font.primary.medium.weight};
        line-height: 1.43;
        padding: 0;
        justify-content: flex-end;
        border: 0;

        &:hover,
        &:active {
            background: inherit;
            border: 0;
        }

        &:focus {
            border: 0;
            border-radius: 0;
        }
    }
`

export const Title = styled(Typography)`
    && {
        letter-spacing: 0.0625rem;
    }
`

export const HeaderContainer = styled.div`
    align-items: center;
    background: ${props => props.theme.colours.utilities.backgroundAccent};
    border-top: ${props => props.theme.colours.form.input.border};
    border-bottom: ${props => props.theme.colours.form.input.border};
    display: flex;
    justify-content: space-between;
    padding: calc(0.75rem - 1px) 1.025rem calc(0.812rem - 1px) 1rem; // substracting 1px accounts for the border top and bottom
    color: ${props => props.theme.colours.text.default};

    @media (min-width: ${breakpoints.values.md}px) {
        background: ${props => props.theme.colours.utilities.backgroundAccent};
        padding: 0.5rem 0.625rem;
        border-top: 0;
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    flex: 0 0 auto;
    justify-content: flex-start;
    margin: 0;
    padding: 0.25rem 1rem;
    color: ${props => props.theme.colours.text.default};

    @media (min-width: ${breakpoints.values.md}px) {
        padding: 0.125rem 0.625rem;
    }

    ul {
        margin: 0;
        padding: 0;

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

export const Container = styled.div`
    background: white;

    @media (min-width: ${breakpoints.values.md}px) {
        border-radius: ${props => props.theme.colours.form.input.radius};
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border: ${props => props.theme.colours.form.input.border};
        width: ${props => props.theme.styles.SearchBox.md.width};
    }
`

export const SeeAllLinkContainer = styled.div`
    border-top: ${props => props.theme.colours.utilities.divider};
    margin-top: 1rem;
    padding-top: 1rem;

    a {
        display: flex;
        justify-content: flex-end;
        color: ${props => props.theme.colours.text.hyperlink};
        text-decoration: underline;
        font-size: 0.875rem;

        @media (min-width: ${breakpoints.values.md}px) {
            padding-right: 1rem;
        }
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
`
