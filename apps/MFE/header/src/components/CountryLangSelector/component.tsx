import styled from "styled-components"
import {CTA} from "@monorepo/cta"
import {breakpoints} from "@monorepo/themes"
import {Typography, Button as MUIButton, Drawer as MUIDrawer} from "@mui/material"
import {COUNTRY_SELECTOR_DRAWER_BREAKPOINT} from "../../config/constants"

export type CountryFlagImgProps = {
    backgroundImg: string
}

export type StyledIcon = {
    textAlignment?: string
}

export const DrawerContainer = styled(MUIDrawer)`
    position: initial;
    && > div:first-child {
        background: rgba(0, 0, 0, 0.9);
    }

    && > div:nth-child(3) {
        // to fix Safari v13 - as the dropdown menu is hidden with the drawer component overflow-y set as auto
        overflow-y: initial;
        width: 100%;
        @media (min-width: ${COUNTRY_SELECTOR_DRAWER_BREAKPOINT}) {
            overflow-y: auto;
            width: ${props => props.theme.styles.DrawerContainer.xs.width};
        }
    }
`

export const Wrapper = styled.div`
    height: 2.75rem;
    font-size: 0.9375rem;
`

export const StyledIcon = styled.img<StyledIcon>`
    transform: ${({textAlignment}) => `rotate(${textAlignment === "rtl" ? "90" : "270"}deg)`};
    margin: -0.125rem 0 0 0.25rem;
    top: 0;
`

export const ROWLink = styled.a`
    font-family: ${props => `${props.theme.colours.font.primary.regular.family}, ${props.theme.colours.font.default}`};
    color: ${props => props.theme.colours.text.hyperlink};
    text-decoration: underline;
    font-size: 0.875rem;
    &:visited {
        color: ${props => props.theme.colours.text.hyperlink};
    }
`

export const CloseButton = styled(MUIButton)`
    && {
        width: 4.5rem;
        background: ${({theme}) => theme.colours.utilities.backgroundAccent};
        color: ${({theme}) => theme.colours.text.hyperlink};
        font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
        border-radius: 0;
        border: 0;

        &:hover,
        &:active {
            background: ${({theme}) => theme.colours.utilities.backgroundAccent};
            border: 0;
        }

        &:focus {
            border: 0;
            border-radius: 0;
        }
        span {
            font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
        }
    }
`

export const Container = styled.button`
    cursor: pointer;
    padding: ${props => props.theme.styles.CountrySelector.Container.xs.padding};
    background-color: transparent;
    border: none;
    &:active {
        background-color: transparent;
        border: none;
    }
`

export const CountrySelectorROW = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0;
    line-height: 1.25rem;
`

export const CountryFlagImg = styled.img`
    display: flex;
    border: ${({theme}) => {
        return `${
            theme.styles.CountrySelector.flagImg?.borderWidth
                ? theme.styles.CountrySelector.flagImg.borderWidth
                : "0.125rem"
        } solid ${theme.colours.header.navUpperBackground.color}`
    }};
    border-radius: 50%;

    width: 1.375rem;
    height: 1.375rem;
    background: ${({theme}) => theme.colours.header.navUpperBackground.color};
    @media (min-width: ${breakpoints.values.md}px) {
        width: ${({theme}) => theme.styles.CountrySelector.flagImg?.width || "1.5rem"};
        height: ${({theme}) => theme.styles.CountrySelector.flagImg?.height || "1.5rem"};
    }
`

export const CountrySelectorContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({theme}) => theme.colours.text.reversed};
    height: 21.75rem;
    width: 100%;
    @media (min-width: ${COUNTRY_SELECTOR_DRAWER_BREAKPOINT}) {
        width: ${props => props.theme.styles.DrawerContainer.xs.width};
        height: 100%;
    }
`

export const CountrySelectorContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    height: 2.75rem;
    background: ${({theme}) => theme.colours.utilities.backgroundAccent};
`

export const CountrySelectorContainerElement = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem 0;
    @media (min-width: ${COUNTRY_SELECTOR_DRAWER_BREAKPOINT}) {
        padding: 0.5rem 1rem;
    }
`
export const CountrySelectorCTAWrapper = styled.div`
    display: flex;
    margin: 0.5rem 1rem;
    height: 2.75rem;
    @media (min-width: ${breakpoints.values.lg}px) {
        font-size: 0.875rem !important;
        height: 2.25rem;
    }
`

export type CountrySelectorContainerLanguageButtonsProps = {
    selected?: boolean
}

export const CountrySelectorContainerLanguageButtons = styled.button<CountrySelectorContainerLanguageButtonsProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${({theme, selected}) =>
        selected ? theme.colours.form.selectedAccent.border : theme.colours.form.default.border};
    background: ${({theme, selected}) =>
        selected ? "rgba(48, 167, 75, 0.05)" : theme.colours.form.buttonSecondary.background};
    font-weight: ${({theme, selected}) =>
        selected ? theme.colours.font.primary.medium.weight : theme.colours.font.primary.light.weight};
    border-radius: 0.25rem;
    font-family: ${({theme, selected}) =>
        selected
            ? `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`
            : `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    width: calc((100% - 1rem) / 2);
    height: 2.75rem;
    font-size: 0.875rem;
    @media (min-width: ${breakpoints.values.lg}px) {
        height: 2rem;
    }
    cursor: pointer;
    &:focus {
        outline: none;
    }
`

export const Title = styled(Typography)`
    letter-spacing: 1px;
`

export const CountrySelectorContainerLanguage = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
`

export const StayText = styled(Typography).attrs({component: "span"})`
    && {
        color: ${({theme}) => theme.colours.text.hyperlink};
        font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
        font-weight: ${({theme}) => theme.colours.font.primary.medium.weight};
        padding-right: 0.25rem;
    }
`
export const CountrySelectorBottomText = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0.75rem 1rem 0;
`
export const StayButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: none;
    &:active {
        background-color: transparent;
        border: none;
    }
`
export const CTAButton = styled(CTA)`
    font-size: 0.875rem !important;
`
