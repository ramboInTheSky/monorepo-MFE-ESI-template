import {Modal} from "@mui/material"
import styled from "styled-components"

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

export const Container = styled(Modal)`
    && {
        transition: opacity 0.2s ease;
        animation-delay: 250ms;
        display: flex;
        justify-content: center;
        position: relative !important;
        height: 100vh;

        & > div:first-child {
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1;
        }
        & > [data-test="sentinelStart"] {
            display: none;
        }
        & > [data-test="sentinelEnd"] {
            display: none;
        }
    }
`
