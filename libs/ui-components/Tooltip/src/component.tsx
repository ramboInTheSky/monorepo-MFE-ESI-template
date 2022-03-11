import styled from "styled-components"
import Popper from '@mui/material/Popper';
export const PopperComponent = styled(Popper)`
    && {
        margin: ${props => {
            if (props.theme.styles.tooltip?.margin) {
                return props.theme.styles.tooltip?.margin
            }
            return "1.5rem 0 0 0"
        }};
        display: flex;
        justify-content: center;
        z-index: 3;

        // for landscape iPhone XR only
        @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape) {
            top: 3.125rem;
        }
    }
`

/**
 * Normally you would use https://cssarrowplease.com/ for this but the end result is an unmaintainable mess of css to
 * support all the themes
 */
export const Arrow = styled.div`
    top: ${props => props.theme.styles.tooltip?.arrow?.positionTop || "0.375rem"};
    width: 4.75rem;
    height: 1.125rem;
    margin-top: -1.0625rem;
    position: absolute;
    font-size: 1.125rem;

    &&:before {
        border: ${props => props.theme.colours.popover.border};
        border-bottom: none;
        ${props => (props.theme.direction === "ltr" ? "border-left: none" : "border-right: none")};
        width: ${props => props.theme.styles.tooltip?.arrow?.width || "1.375rem"};
        height: ${props => props.theme.styles.tooltip?.arrow?.width || "1.375rem"};
        margin: auto;
        content: "";
        display: block;
        background: ${props => props.theme.colours.popover.backgroundColour || "white"};

        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }
`
