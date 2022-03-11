import styled from "styled-components"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {breakpoints} from "@monorepo/themes"
import {Grid as MuiGrid, Button as MUIButton} from "@mui/material"

export const HeaderContainer = styled.div`
    align-items: center;
    background: ${props => props.theme.colours.utilities.backgroundAccent};
    border-bottom: ${props => props.theme.colours.form.input.border};
    border-top: ${props => props.theme.colours.form.input.border};
    color: ${props => props.theme.colours.text.default};

    @media (min-width: ${breakpoints.values.md}px) {
        background: white;
        border: none;
        padding: 1.5rem 0 0;
    }
`
export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

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

        @media (min-width: ${breakpoints.values.md}px) {
            letter-spacing: 0.0075rem;
        }
    }
`

export const TitleContainerStyled = styled(Container)`
    && {
        padding: 0.75rem 1rem;

        @media (min-width: ${breakpoints.values.md}px) {
            padding: 0 2rem;
        }

        @media (min-width: ${breakpoints.values.xl}px) {
            padding: 0 2.5rem;
        }
    }
`
export const ContentContainerStyled = styled(Container)`
    && {
        padding: 0.25rem 1rem;

        @media (min-width: ${breakpoints.values.md}px) {
            padding: 0 2rem;
        }

        @media (min-width: ${breakpoints.values.xl}px) {
            padding: 0 2.5rem;
        }
    }
`
export const GridContent = styled(MuiGrid)`
    margin: 0;
    background: white;
    color: ${props => props.theme.colours.text.default};
`

export const GridWrapper = styled(MuiGrid)`
    @media (min-width: ${breakpoints.values.md}px) {
        display: flex;
        padding: 1rem 0;
    }

    ul li a {
        transition: transform 0.1s ease, padding 0.15s ease;
        &:hover {
            padding-left: 0.5rem;
        }
    }
`
