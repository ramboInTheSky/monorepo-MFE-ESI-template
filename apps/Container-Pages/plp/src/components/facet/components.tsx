import styled from "styled-components"
import {Typography} from "@mui/material"
import {breakpoints} from "@monorepo/themes"

declare module "@mui/material/styles/withStyles" {
    // Augment the BaseCSSProperties so that we can control jss-rtl
    interface BaseCSSProperties {
        /**
         * Used to control if the rule-set should be affected by rtl transformation
         */
        flip?: boolean
    }
}

export const FacetCountLabel = styled.span`
    color: ${props => props.theme.colours.text.muted};
    display: inline-block;
    margin-left: 0.125rem;
`

export const FacetCheckbox = styled.input`
    opacity: 0;
    position: absolute;
    left: -200px;
`

export const FacetTooltipIcon = styled.img`
    display: none;
    opacity: 1;
    position: absolute;
    right: -0.3125rem;
    padding-top: 0rem;
    width: 2rem;
    height: 2rem;
    z-index: 0;

    @media (min-width: ${breakpoints.values.lg}px) {
        display: block;
    }
`

interface FacetLabetTextProperties {
    needsTruncating: boolean
}

export const FacetLabelText = styled.span<FacetLabetTextProperties>`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: ${props => (props.needsTruncating ? "7.25rem" : "auto")};
`

type FacetLabelProps = any & {
    $checked: boolean
    $disabled: boolean
}

export const FacetLabel: any = styled(Typography)`
    && {
        outline: none;
        position: relative;
        margin: 0;
        padding-left: 2rem;
        height: 2rem;
        line-height: 2rem;
        cursor: pointer;
        display: flex;
        min-width: 0;
        &:before {
            box-sizing: border-box;
            position: absolute;
            top: 0.3125rem;
            left: 0;
            display: block;
            width: 1.25rem;
            height: 1.25rem;
            pointer-events: auto;
            content: "";
            user-select: none;
            background-color: transparent;
            cursor: pointer;
            border: 0.0625rem solid #949494;
            border-radius: 0.25rem;
            margin: 0.0625rem;
            transition: background-color 0.1s ease-out, border-color 0.1s ease-out, boxShadow 0.1s ease-out;
        }
        &:after {
            position: absolute;
            display: block;
            content: "";
            transform-origin: center;
            width: 0.625rem;
            height: 0.25rem;
            top: 0.75rem;
            left: 0.3125rem;
            border-color: #000;
            border: 0.125rem solid;
            border-top: none;
            opacity: 0;
        }
        &&:after {
            flip: false;
            transition: all 0.15s ease;
            top: 0.75rem;
            opacity: 0;
            /*! @noflip */
            border-right: none;
            transform: scale(0.25) rotate(-45deg);
        }
        ${(props: FacetLabelProps) =>
            props.$checked &&
            `
            &:before {
                border: 0.125rem solid #257f39;
                background-color: rgba(48, 167, 75, 0.05);
            }
            &&:after {
                flip: false;
                transform: scale(1) rotate(-45deg);
                top: 0.75rem;
                opacity: 1;
            }
        `}
        ${(props: FacetLabelProps) =>
            props.$disabled &&
            `
            opacity: 0.3;
        `}
    }
`
