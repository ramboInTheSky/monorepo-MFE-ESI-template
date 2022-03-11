import styled from "styled-components"
import {MenuItem, ListItemText, ListItemIcon} from "@mui/material"

import withStyles from "@mui/styles/withStyles"

export const StyledMenuItem = styled(MenuItem)`
    padding: 0.8125rem 0.9375rem 0.8125rem 0.625rem;
`

const listItemTextStyles = {
    root: {
        margin: 0,
        "&$inset": {
            paddingLeft: "1.875rem",
        },
    },
    inset: {},
}
export const StyledListItemText = withStyles(listItemTextStyles)(ListItemText)

export const StyledListItemIcon = styled(ListItemIcon)`
    min-width: 1.875rem;
`
