import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export type ContainerProps = {
    isActive: boolean
    marketingStyles: {linkColour?: string; fontFamily?: string; fontWeight?: string}
}
export const Container = styled.li<ContainerProps>`
    list-style: none;
    cursor: pointer;
    flex-shrink: 0;
    height: 100%;
    padding-right: var(--padding, 0);
    padding-left: var(--padding, 0);
    && a {
        background: ${({isActive, theme}) => (isActive ? theme.colours.header.navLowerBackground.active : "inherit")};
        border-bottom: ${({isActive, theme}) =>
            isActive ? theme.dimensions.SnailItem.md.border : theme.dimensions.SnailItem.xs.border};
        border-top: ${props => props.theme.dimensions.SnailItem.xs.border};
        z-index: ${({isActive}) => (isActive ? 4 : 0)};
        padding: ${props => props.theme.dimensions.SnailItem.xs.padding};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        color: ${({isActive, theme, marketingStyles: {linkColour}}) =>
            isActive
                ? theme.colours.text.navigation.linkActive
                : linkColour || theme.colours.text.navigation.link} !important;
        text-decoration: none;
        font-size: 0.875rem;
        letter-spacing: 0.0625rem;
        font-family: ${({theme, marketingStyles: {fontFamily}}) =>
            fontFamily || `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
        font-weight: ${({marketingStyles: {fontWeight}}) => fontWeight || "400"};
        text-transform: uppercase;

        @media (min-width: ${breakpoints.values.xl}px) {
            padding: ${props => props.theme.dimensions.SnailItem.xl.padding};
        }

        &:hover > i {
            display: block;
        }

        &:focus {
            outline-offset: -2px;
        }
    }

    // Rules applied to Accordion
    @media (max-width: ${breakpoints.values.lg - 1}px) {
        &.hiddenAccordion {
            display: none;
        }

        &.first-child-accordion {
            padding-left: ${props => props.theme.dimensions.PrimaryNav.xs.padding};
        }
        &.last-child-accordion {
            padding-right: ${props => props.theme.dimensions.PrimaryNav.xs.padding};
        }

        @media (min-width: ${breakpoints.values.md}px) {
            &.first-child-accordion {
                padding-left: ${props => props.theme.dimensions.PrimaryNav.md.padding};
            }
            &.last-child-accordion {
                padding-right: ${props => props.theme.dimensions.PrimaryNav.md.padding};
            }
        }

        @media (max-width: ${breakpoints.values.md - 1}px) {
            &.first-child-accordion {
                & a {
                    padding-left: ${props => props.theme.dimensions.PrimaryNav.lg.padding};
                }
            }
            &.last-child-accordion {
                & a {
                    padding-right: ${props => props.theme.dimensions.PrimaryNav.lg.padding};
                }
            }
        }
    }

    // Rules applied to Drawer
    @media (min-width: ${breakpoints.values.lg}px) {
        &.hiddenDrawer {
            display: none;
        }

        @media (min-width: ${breakpoints.values.md}px) {
            &.first-child-drawer {
                padding-left: ${props => props.theme.dimensions.PrimaryNav.md.padding};
            }
            &.last-child-drawer {
                padding-right: ${props => props.theme.dimensions.PrimaryNav.md.padding};
            }
        }

        @media (min-width: ${breakpoints.values.xl}px) {
            &.first-child-drawer {
                padding-left: ${props => props.theme.dimensions.PrimaryNav.xl.padding};
            }
            &.last-child-drawer {
                padding-right: ${props => props.theme.dimensions.PrimaryNav.xl.padding};
            }
        }
    }
`
export const Title = styled.div<ContainerProps>`
    color: ${({isActive, theme, marketingStyles: {linkColour}}) =>
        isActive ? theme.colours.text.navigation.linkActive : linkColour || theme.colours.text.navigation.link};
    line-height: 1.5rem;
`

export const Arrow = styled.i`
    display: none;
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid white;
`
