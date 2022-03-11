import styled from "styled-components"
import {Drawer as MUIDrawer} from "@mui/material"

export const DrawerContainer = styled(MUIDrawer)`
    && {
        background: #000000;
    }
    &&.drawer > div:nth-child(3) {
        width: calc(100% - 2.75rem);
    }
`

export const CloseIcon = styled.img`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    height: 2.75rem;
    width: 2.75rem;
`
