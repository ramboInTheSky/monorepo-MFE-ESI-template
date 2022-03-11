import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

/*
 * Title: Using to style top !important
 * problem: we do not want to use !important but we want a modal and a modal is expected to cover the entire screen
 * in this case however, material UI probably assumes you'll have the entire screen covered and uses inline styles
 * to define this behaviour. But here the modal as it is the case of next, partially exposes the header area hence it
 * does not fully cover the entire screen.
 * Solution: for now we have to use !important
 * Refs:
 *    https://github.com/mui-org/material-ui/issues/16441
 *    https://github.com/mui-org/material-ui/issues/16442
 */

export const Wrapper = styled.div`
    & > div {
        transition: opacity 0.2s ease;
        animation-delay: 250ms;

        & > div:first-child {
            position: fixed;
            top: 0;
            background: rgba(0, 0, 0, 0.9);
        }

        @media (min-width: ${breakpoints.values.md}px) {
            top: ${props => props.theme.styles.UpperHeader.md.height} !important;
        }

        @media (min-width: ${breakpoints.values.lg}px) {
            top: ${props => props.theme.styles.UpperHeader.lg.height} !important;
        }
    }
`
