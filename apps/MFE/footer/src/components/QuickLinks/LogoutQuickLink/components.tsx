import styled from "styled-components"

import Grid from "@mui/material/Grid"
import Hidden from "@mui/material/Hidden"

export const LogoutHidden = styled(Hidden)`
    width: 100%;
`

export const LogoutWrapper = styled.div`
    display: inline-block;
    margin-right: 0.75rem;
    padding: 1rem 0;
`

export const LogoutContainer = styled(Grid)`
    border-bottom: ${props => props.theme.colours.utilities.divider};
`
