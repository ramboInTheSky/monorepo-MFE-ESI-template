import React from "react"
import {Modal, ModalProps} from "@mui/material"
import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import {ViewportStyles} from "models/regions"

type Props = ModalProps & {
    styles: ViewportStyles
}

/*
 * Title: Using to style top !important
 * problem: we do not want to use !important but we want a modal and a modal is expected to cover the entire screen
 * in this case however, material UI probably assumes you'll have the entire screen covered and uses inline styles
 * to define this behaviour.
 * Solution: for now we have to use !important
 * Refs:
 *    https://github.com/mui-org/material-ui/issues/16441
 *    https://github.com/mui-org/material-ui/issues/16442
 */

export const Container = styled(({...rest}) => <Modal {...rest} />)<Props>`
    transition: opacity 0.2s ease;
    animation-delay: 250ms;

    & > div:first-child {
        position: fixed;
    }

    && > div:first-child {
        background: ${props =>
            `${
                props.$darkerBackdrop
                    ? `rgba(${props.theme.colours.palette.modal.backdrop.secondary})`
                    : `rgba(${props.theme.colours.palette.modal.backdrop.primary})`
            }`};
    }

    @media (min-width: ${breakpoints.values.md}px) {
        & > div:first-child {
            top: ${props => props.theme.styles.UpperHeader.md.height} !important;
        }
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        & > div:first-child {
            top: ${props => props.theme.styles.UpperHeader.lg.height} !important;
        }
    }
`
