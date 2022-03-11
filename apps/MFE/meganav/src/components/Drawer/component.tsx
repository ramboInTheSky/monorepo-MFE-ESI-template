import styled from "styled-components"
import {Drawer as MUIDrawer} from "@mui/material"

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

export const DrawerContainer = styled(MUIDrawer)`
    && {
        position: relative !important;
        height: 100vh;
    }

    &&.drawer > div:nth-child(1) {
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        z-index: 0;
    }
    &&.drawer > div:nth-child(3) {
        box-shadow: none;
        position: absolute;
        width: calc(100% - 3rem);
    }
`

export const CloseIcon = styled.img`
    position: fixed;
    top: 2.75rem;
    left: 0;
    cursor: pointer;
    height: 2.75rem;
    width: 2.75rem;
`
