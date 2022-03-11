import styled from "styled-components"

export const Arrow = styled("div")`
    height: 1.125rem;
    margin-top: -1.0625rem;
    position: absolute;
    font-size: 1.125rem;
    &[data-placement*="bottom"] {
        top: 0.375rem;
        &::before {
            border-bottom: none;
            ${({theme: {direction}}) => (direction === "ltr" ? "border-right: none" : "border-left: none")};
        }
    }
    &[data-placement*="top"] {
        bottom: -0.375rem;
        &::before {
            border-top: none;
            ${({theme: {direction}}) => (direction === "ltr" ? "border-left: none" : "border-right: none")};
        }
    }
    &::before {
        width: 1.375rem;
        height: 1.375rem;
        margin: auto;
        content: "";
        display: block;
        background: #fff;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        border: ${props => props.theme.colours.popover.border};
    }
`
