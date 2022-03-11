import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import {Hidden as MUIHidden, AccordionSummary, Accordion, AccordionDetails} from "@mui/material"
import {DEFAULT_IMAGE_PLACEHOLDER} from "../../config/constants"

type TitleProps = {
    linkColour: string
    fontFamily: string | null
    fontWeight: string
    isFirstElement?: boolean
}

export const AccordionPanel = styled(Accordion)`
    background: none;
    box-shadow: none;
    width: 100%;
    border-bottom: ${props => props.theme.colours.utilities.divider};
`
export const AccordionPanelDetails = styled(AccordionDetails)`
    padding: 0;
`
// FIXME replace AccordionPanelSummary background: ${props => props.theme.colours.utilities.backgroundAccent};
export const AccordionPanelSummary = styled(AccordionSummary)`
    && {
        background: ${props => props.theme.colours.utilities.backgroundAccent};
        @media (min-width: ${breakpoints.values.md}px) {
            background: #ffffff;
        }
        padding: 0;
        min-height: auto;
        width: 100%;
        && > div {
            margin: 0;
        }
        > div:nth-child(2) {
            padding: 1rem;
        }

        img {
            width: 0.75rem;
        }
    }
`
export const Hidden = styled(MUIHidden)`
    width: 100%;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: start;
    @media (min-width: ${breakpoints.values.lg}px) {
        border-top: 0;
    }
`
export const Title = styled.div<TitleProps>`
    height: 2.75rem;
    padding-left: 1rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    font-size: 0.9375rem;
    letter-spacing: 0.12px;
    word-break: break-word;
    color: ${({theme, linkColour}) => linkColour || theme.colours.text.default};
    font-family: ${({theme, fontFamily}) =>
        fontFamily || `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    font-weight: ${({fontWeight}) => fontWeight || "500"};

    @media (min-width: ${breakpoints.values.md}px) {
        padding-left: 2rem;
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        height: unset;
        padding-left: 0;
        font-size: 0.875rem;
        margin: ${({isFirstElement}) => (isFirstElement ? "0 0 0.75rem 0" : "1.25rem 0 0.75rem")};
        background: none;
    }
`
export const List = styled.ul`
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    align-items: start;
    padding: 0.813rem 1rem 0 1rem;
    height: inherit;
    flex-wrap: wrap;
    width: 100%;
    @media (min-width: ${breakpoints.values.md}px) {
        padding-left: 2rem;
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        padding: 0;
        flex-direction: column;
        flex-wrap: nowrap;
    }
`

export const ImagePlaceholder = styled.span<{url?: string}>`
    && {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-image: url(${({url}) => url || DEFAULT_IMAGE_PLACEHOLDER}), url(${DEFAULT_IMAGE_PLACEHOLDER});
        background-size: cover;
        background-repeat: no-repeat;
        margin: 0 0.75rem 0 0;
        flex-shrink: 0;
    }
`
