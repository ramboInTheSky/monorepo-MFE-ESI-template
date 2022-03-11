import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const ShoppingBagLink = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    height: ${props => props.theme.styles.ShoppingBag.xs.height};
    line-height: 1.125rem;
    @media (min-width: ${breakpoints.values.lg}px) {
        line-height: initial;
    }
    @media (min-width: ${breakpoints.values.md}px) {
        height: 2.8125rem;
    }
    && {
        i {
            font-style: normal;
            font-size: ${props => props.theme.colours.header.shoppingBag.fontSize};
            text-align: center;
            font-family: ${props =>
                `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
            font-weight: ${props => props.theme.colours.header.shoppingBag.fontWeight};
            position: absolute;
            top: ${props => props.theme.styles.ShoppingBag.xs.top};
            left: ${props => props.theme.styles.ShoppingBag.xs.left};
            width: 100%;
            display: block;
            cursor: pointer;
            color: ${props => props.theme.colours.header.shoppingBag.color};

            @media (min-width: ${breakpoints.values.md}px) {
                top: ${props => props.theme.styles.ShoppingBag.md.top};
                font-size: 0.75rem;
            }
            @media (min-width: ${breakpoints.values.lg}px) {
                top: ${props => props.theme.styles.ShoppingBag.lg.top};
            }
        }

        img {
            width: ${props => props.theme.styles.ShoppingBag.xs.imageWidth};
            height: ${props => props.theme.styles.ShoppingBag.xs.imageHeight};

            @media (min-width: ${breakpoints.values.md}px) {
                width: ${props => props.theme.styles.ShoppingBag.md.imageWidth};
                height: ${props => props.theme.styles.ShoppingBag.md.imageHeight};
            }
        }

        a {
            padding: ${props => props.theme.styles.ShoppingBag.xs.padding};
        }

        button {
            padding: 0.625rem 0.625rem 0.5625rem 0.625rem;
            border: 0;
            background: 0;
        }
    }
`

export const ToolTipContent = styled.div`
    padding-top: 0.0625rem;
    border: ${props => props.theme.colours.popover.border};
    background: ${props => props.theme.colours.header.myAccount.background};
    border-radius: ${props => props.theme.colours.popover.radius};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
`
