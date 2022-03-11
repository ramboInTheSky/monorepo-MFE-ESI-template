import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Username = styled.span`
    && {
        text-overflow: ellipsis;
        max-width: 105px;
        white-space: nowrap;
        overflow: hidden;

        @media (min-width: ${breakpoints.values.xl}px) {
            white-space: unset;
        }
    }
`
export const SmallIconContainer = styled.div`
    align-content: center;
    a {
        padding: ${props => props.theme.styles.MyAccount.SmallIcon.xs.padding};
        font-size: 0.9375rem;
        @media (min-width: ${breakpoints.values.md}px) {
            display: flex;
            align-items: center;
        }
        @media (min-width: ${breakpoints.values.lg}px) {
            display: initial;
        }
    }

    img {
        width: ${props => props.theme.styles.MyAccount.SmallIcon.xs.width};
        height: ${props => props.theme.styles.MyAccount.SmallIcon.xs.width};
        vertical-align: initial;
    }

    @media (min-width: ${breakpoints.values.md}px) {
        a {
            padding: 0.625rem;
        }
        img {
            width: ${props => props.theme.styles.MyAccount.SmallIcon.md.width};
            height: ${props => props.theme.styles.MyAccount.SmallIcon.md.height};
        }
    }
`

export const IconContainer = styled.div<{showContainer: boolean}>`
    display: ${({showContainer}) => (showContainer ? "flex" : "none")};
    align-items: center;
    color: ${props => props.theme.colours.text.navigation.link};
    a:active,
    a:hover,
    a:focus,
    a:visited {
        color: ${props => props.theme.colours.text.navigation.link};
    }
    padding: ${props => props.theme.styles.MyAccount.IconContainer.xs.padding};
    img {
        margin: ${props => props.theme.styles.MyAccount.IconOnly.xs.margin};
        width: ${props => props.theme.styles.MyAccount.IconOnly.xs.width};
        height: ${props => props.theme.styles.MyAccount.IconOnly.xs.height};

        @media (min-width: ${breakpoints.values.lg}px) {
            margin: ${props => props.theme.styles.MyAccount.IconOnly.lg.margin};
        }
    }

    a {
        padding: ${props => props.theme.styles.UpperHeader.xs.iconHitArea};
    }
`

export const Container = styled.div`
    margin: ${props => props.theme.styles.MyAccount.xs.margin};
    width: ${props => props.theme.styles.MyAccount.xs.width};
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
export const ViewAccountSummaryLink = styled.div`
    padding: 0.8rem 0.75rem 0 0.75rem;
    display: flex;
    text-decoration: none;
    cursor: pointer;
    align-items: center;
    justify-content: flex-start;
    && a,
    && a:hover {
        position: initial;
        color: ${props => props.theme.colours.text.default};
        text-decoration: none;
        font-size: inherit;
    }
    &&& a:hover {
        color: ${props => props.theme.colours.text.default};
    }

    :hover {
        text-decoration: underline;
    }
`

export const StyledHr = styled.hr`
    margin: ${props => props.theme.styles.MyAccount.Divider.xs.margin};
`

export const SignoutButton = styled.div`
    height: 2.25rem;
`
export const ToolTipContent = styled.div`
    font-size: ${props => props.theme.colours.popover.fontSize};
    width: 14.5rem;
    height: 8.625rem;
    border: ${props => props.theme.colours.popover.border};
    background: ${props => props.theme.colours.header.myAccount.background};
    border-radius: ${props => props.theme.colours.popover.radius};
    text-transform: capitalize;
    text-align: center;
    box-shadow: ${props => props.theme.colours.popover.boxShadow};
    // for landscape iPhone XR only
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) {
        position: absolute;
        top: -3.75rem;
    }
    hr {
        border: ${props => props.theme.colours.utilities.divider};
    }
`

export const ToolTipTitle = styled.span`
    color: #000000;
    font-family: ${props => `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
    line-height: 1.5;
    letter-spacing: 0.12px;
    padding-left: 0.6rem;
`

export const ToolTipUsername = styled.div`
    height: 2.5rem;
    color: #000000;
    font-family: ${props => `${props.theme.colours.font.primary.regular.family}, ${props.theme.colours.font.default}`};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
`

export const TooltipHeader = styled.div`
    height: 1.5rem;
`

export const TooltipFooter = styled.div`
    padding: 0.75rem;
    height: calc(100% - 1.5rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const ImgAccount = styled.img`
    height: ${({theme: {styles}}) => styles.UpperHeader.xs.iconHeight};
`
