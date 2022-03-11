import styled from "styled-components"
import {Popper, MenuItem, MenuList} from "@mui/material"

export const StyledPopper = styled(Popper)`
    z-index: 1;

    &[data-popper-placement*="bottom"] .arrow {
        width: 0;
        height: 0;
        border-bottom: 0.625rem solid ${props => props.theme.colours.text.default};
        border-left: 0.625rem solid transparent;
        border-right: 0.625rem solid transparent;
        margin-top: -0.625rem;
    }
`

export const StyledMenuItem = styled(MenuItem)`
    padding: 0.8125rem 0.9375rem 0.8125rem 0.625rem;
`

export const Arrow = styled.span`
    position: absolute;
    font-size: 0.4375rem;
    width: 3rem;
    height: 3rem;
`

export const StyledMenuList = styled(MenuList)`
    border-top: 0.25rem solid ${props => props.theme.colours.text.default};
    margin-top: 0.875rem;
    padding: 0;
`
