import styled from "styled-components"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

export const CopyrightText = styled(Typography)<{component: "h3"}>`
    color: ${props => props.theme?.colours?.text?.muted || "#000"};
    display: block;
    text-align: center;
    font-size: 0.875rem;
    font-family: ${({theme}) => `${theme?.colours?.font?.regular?.family}, ${theme?.colours?.font?.default}`};
    letter-spacing: 0.12px;
    line-height: 1.5rem;
`

export const GridContainer = styled(Grid)`
    padding-top: 1.5rem;
    padding-bottom: 0.75rem;
`

export const ChildGrid = styled(Grid)`
    flex: 1 1 auto;
    padding: 0 0.75rem;
`
// more amperstands = high specificity
export const DeviceToggleLink = styled.a`
    &&& {
        font-size: 0.875rem;
        line-height: 1.5;
        margin-bottom: 0.75rem;
        display: inline-block;
        color: ${props => props.theme.colours.text.hyperlink};
        text-decoration: underline;
    }
`
