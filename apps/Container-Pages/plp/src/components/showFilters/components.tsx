import styled from "styled-components"
import Button from "@mui/material/Button"
import Drawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"
import {breakpoints} from "@monorepo/themes"

interface ModeProps {
    isFullWidthMode: boolean
}

const NoBorderButton = styled.button`
    cursor: pointer;
    border: none;
    padding: 0;
    background: transparent;
    -webkit-tap-highlight-color: transparent;
`

export const CloseIconButton = styled(NoBorderButton)<ModeProps>`
    position: ${({isFullWidthMode}) => (isFullWidthMode ? "initial" : "fixed")};
    right: 30rem;
    top: 0rem;
    margin-right: ${({isFullWidthMode}) => (isFullWidthMode ? "1rem" : 0)};
`

export const CloseIcon = styled.img<ModeProps>`
    height: ${({isFullWidthMode}) => (isFullWidthMode ? "0.8375rem" : "2.75rem")};
    width: ${({isFullWidthMode}) => (isFullWidthMode ? "0.8375rem" : "2.75rem")};
`

export const StyledButton = styled(NoBorderButton)`
    width: 100%;
    height: 2.75rem;
    text-transform: uppercase;
    color: ${({theme}) => theme.colours.text.default};
    font-size: 0.875rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    font-weight: 500;
    letter-spacing: 0.0075rem;
`

export const ViewResultsButton = styled(Button)`
    width: 100%;
    height: 2.75rem;
    text-transform: uppercase;

    &:hover,
    &:active,
    &:focus {
        background: ${({theme}) => theme.colours.form.buttonPrimary.background};
        border: ${({theme}) => theme.colours.form.buttonPrimary.border};
        color: ${({theme}) => theme.colours.form.buttonPrimary.color};
    }
`

export const DrawerContainer = styled(Drawer)`
    position: initial;
    && > div:first-child {
        background: rgba(0, 0, 0, 0.9);
    }
`

export const DrawerContent = styled.div<ModeProps>`
    width: ${({isFullWidthMode}) => (isFullWidthMode ? "100vw" : "30rem")};
    height: 100%;
`

export const CenteredFlexContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    -webkit-flex: 1 auto;
    display: -webkit-flex;
`

export const ShowFiltersContainer = styled(CenteredFlexContainer)`
    flex: 1;
    justify-content: center;
`

export const Title = styled(Typography)`
    letter-spacing: 0.0625rem;
    text-transform: uppercase;
`

export const CloseButton = styled(Button)`
    && {
        padding: 0;
        text-align: right;
        overflow-wrap: anywhere;
        background: ${({theme}) => theme.colours.utilities.backgroundAccent};
        color: ${({theme}) => theme.colours.text.hyperlink};
        font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
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
    }
`

const AccentedContainer = styled(CenteredFlexContainer)`
    justify-content: space-between;
    background: ${({theme}) => theme.colours.utilities.backgroundAccent};
`

export const FiltersContainerHeader = styled(AccentedContainer)`
    height: 2.75rem;
    padding: 1rem;
    border-bottom: ${({theme}) => theme.colours.utilities.dividerDark};
`

export const FiltersContainerFooter = styled(AccentedContainer)<ModeProps>`
    border-top: ${({theme}) => theme.colours.utilities.divider};
    padding: ${({isFullWidthMode}) => (isFullWidthMode ? "0 1rem" : "0 1.5rem")};
    height: 4.75rem;
`

export const FiltersBodyContainer = styled(CenteredFlexContainer)`
    display: flex;
    flex-direction: row;
    height: calc(100% - 7.5rem);
    width: 100%;
`

export const FeatFacetsContainer = styled.div<{showRightBorder: boolean}>`
    width: 100%;
    border-right: ${({showRightBorder, theme}) => (showRightBorder ? theme.colours.utilities.dividerDark : "none")};
    border-bottom: ${({theme}) => theme.colours.utilities.dividerDark};
    background: #ffffff;
`

export const StyledFacetButton = styled(NoBorderButton)<{
    isFocused?: boolean
    hideTopBorder?: boolean
    showLeftBorder?: boolean
}>`
    width: 100%;
    margin: 0;

    // Fix IOS 13 iphone devices
    min-height: min-content;
    padding: 0 1rem;
    position: relative;
    outline-offset: -0.13rem;
    margin: 0;
    ${({isFocused, theme, hideTopBorder, showLeftBorder}) =>
        isFocused
            ? `border-right: none;
        border-top: ${hideTopBorder ? "none" : theme.colours.utilities.dividerDark};
        border-bottom: ${theme.colours.utilities.dividerDark};
        border-left: ${showLeftBorder ? `0.1875rem solid ${theme.colours.text.default}` : "none"};
        background: #ffffff;  
        `
            : isFocused === false &&
              `border-right: ${theme.colours.utilities.dividerDark};
              background: ${theme.colours.utilities.backgroundAccent};
        `}
`

export const Text = styled(Typography)<{disabled?: boolean; $isSecondary?: boolean}>`
    letter-spacing: 0.0075rem;
    white-space: normal;
    text-align: left;
    opacity: ${({disabled}) => (disabled ? 0.4 : 1)};

    span {
        color: ${({theme}) => theme.colours.text.muted};
    }

    ${({$isSecondary, theme}) =>
        $isSecondary &&
        `white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${theme.colours.text.muted};`}
`

export const TextWrapper = styled(CenteredFlexContainer)<{
    noBorder?: boolean
    fullWidth?: boolean
    isKeyFilter?: boolean
}>`
    border-bottom: ${({theme, noBorder}) => (noBorder ? "none" : theme.colours.utilities.divider)};
    height: auto;
    display: flex;
    justify-content: space-between;
    padding: 0.65rem 0;
    width: ${({fullWidth, isKeyFilter}) => {
        // Key filters has translated text and number of items which causes to overlap the checked icon,
        // reduced the width to fit in both for mobile devices
        if (isKeyFilter) return "70%"
        if (fullWidth) return "100%"
        return "90%"
    }};
    flex-direction: column;
    align-items: flex-start;
`

export const FiltersContainer = styled.div`
    width: 100%;
    height: auto;
    overflow-y: auto;

    // hide scrollbar but keep functionality
    -ms-overflow-style: none;
    scrollbar-width: none;

    &&::-webkit-scrollbar {
        display: none;
    }
`

export const LoadingSpinner = styled.span`
    width: 2.75rem;
    height: 2.75rem;
    outline: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &.loading {
        position: relative;
        transition: all 0.2s ease-in;
        &:after {
            content: "";
            opacity: 0;
            position: absolute;
            border-radius: 100%;
            width: 0px;
            height: 0px;
            border: 0.125rem solid rgba(102, 143, 112, 0.05);
            border-left-color: #30a74b;
            border-top-color: #30a74b;
            animation: spin 0.6s infinite linear, grow 0.3s forwards ease-out;
            transition: opacity 0.3s ease;
        }
    }

    @keyframes spin {
        to {
            transform: rotate(359deg);
            opacity: 1;
        }
    }
    @keyframes grow {
        to {
            opacity: 1;
            width: 0.75rem;
            height: 0.75rem;
        }
    }
    @keyframes strokeExpand {
        from {
            height: 0;
        }
        to {
            height: 100%;
        }
    }
    @keyframes strokeExpand2 {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
`

export const Tick = styled.div`
    height: 1.0625rem;
    width: 0.625rem;
    position: relative;
    margin-top: -0.325rem;
    transform: ${props => (props.theme.direction === "ltr" ? "rotate(45deg)" : "rotate(45deg) scale(-1, 1)")};
`
export const TickLine1 = styled.span<{animate: boolean}>`
    position: absolute;
    bottom: 0;
    background: #30a74b;
    transition: height 0.3 ease-in;

    right: 0;
    height: 0;
    width: 0.1875rem;
    animation: strokeExpand 0.4s ease;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;

    ${({animate}) =>
        !animate &&
        `
        animation-direction: reverse;
        animation-play-state: paused;
        animation-delay: 0s;
    `}
`

export const TickLine2 = styled.span<{animate: boolean}>`
    position: absolute;
    bottom: 0;
    background: #30a74b;
    transition: height 0.3 ease-in;

    height: 0.1875rem;
    width: 0px;
    left: 0;
    animation: strokeExpand2 0.2s ease;
    animation-fill-mode: forwards;

    ${({animate}) =>
        !animate &&
        `
        animation-direction: reverse;
        animation-play-state: paused;
        `}
`

export const FiltersPanelContainer = styled.div`
    overflow-y: auto;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;

    // hide scrollbar but keep functionality
    -ms-overflow-style: none;
    scrollbar-width: none;

    &&::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: ${breakpoints.values.xs}) {
        display: none;
    }
`

export const PaddedWrapper = styled.div`
    padding: 1.25rem;
`

export const EmptyFlexContainer = styled.div`
    flex-grow: 1;
    border-right: ${({theme}) => theme.colours.utilities.dividerDark};
    background: ${({theme}) => theme.colours.utilities.backgroundAccent};
`

export const TabbedFacetsContainer = styled.div<{hasSelectedFacet: boolean}>`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: ${({hasSelectedFacet}) => (hasSelectedFacet ? "35%" : "100%")};

    @media (max-width: 320px) {
        width: ${({hasSelectedFacet}) => (hasSelectedFacet ? "40%" : "100%")};
    }
`

export const SelectedFacetIndicator = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0.375rem;
    margin: auto;
    height: 0.25rem;
    width: 0.25rem;
    background: ${({theme}) => theme.colours.form.buttonPrimary.background};
    border-radius: 50%;
`

export const SpinnerWrapper = styled.div`
    position: absolute;
    right: 0;
    margin-top: auto;
    margin-bottom: auto;
    top: 0;
    bottom: 0;
`
