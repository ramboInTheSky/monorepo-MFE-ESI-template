import styled from "styled-components"
import Typography from "@mui/material/Typography"

export const SocialTitle = styled(Typography)`
    color: ${props => props.theme.colours.text.default};
    width: 100%;
    text-align: center;
    margin-top: 0.25rem;

    /* Override MVC  */
    text-transform: none;
    padding-bottom: 0;
`

export const SocialLinkIcon = styled("img")`
    margin: 0.5rem;
`
