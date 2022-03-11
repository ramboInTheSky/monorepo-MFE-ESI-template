import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

type AnchorProps = {
    linkColour: string | null
    fontFamily: string | null
    fontWeight: string
    isDirectLink: boolean
}

export const Container = styled.li<AnchorProps>`
    display: flex;
    list-style: none;
    margin-bottom: 1rem;
    width: 100%;

    a {
        display: flex;
        justify-content: space-between;
        text-decoration: none;
        font-size: ${({isDirectLink}) => (isDirectLink ? "0.9375rem" : "0.875rem")};
        line-height: 1.5;
        letter-spacing: 0.12px;
        word-break: break-word;
        color: ${({theme, linkColour}) => linkColour || theme.colours.text.default};
        font-family: ${({theme, fontFamily}) =>
            fontFamily || `${theme.colours.font.secondary.regular.family}, ${theme.colours.font.default}`};
        font-weight: ${({fontWeight}) => fontWeight || "500"};
        @media (min-width: ${breakpoints.values.lg}px) {
            font-size: 0.8125rem;
        }
    }

    a:hover {
        text-decoration: underline;
    }

    @media (min-width: ${breakpoints.values.sm}px) {
        width: ${({isDirectLink}) => (isDirectLink ? "100%" : "50%")};
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        width: 100%;
        line-height: 1.5;
        margin-bottom: 0.5rem;
    }
`

export const Image = styled.img`
    margin: 0 1rem 0 0.25rem;
    width: 1.875rem;
    height: 0.9375rem;
`

export const TitleAndImageContainer = styled.div`
    display: flex;
    align-items: center;
`
