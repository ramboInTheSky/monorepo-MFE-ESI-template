import styled from "styled-components"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"

export const StyledLink = styled(Link)`
    /* Override MVC  */
    && {
        &:visited {
            color: ${props => props.theme.colours.text.default};
        }
    }
`

export const QuickLinkContent = styled("span")`
    display: inline-block;
    margin-left: 1.125rem;
    margin-right: 0;
`

export const QuickLinkTitle = styled(Typography)`
    /* Override MVC  */

    && {
        text-transform: capitalize;
        padding-bottom: 0;
    }
`
export const QuickLinkDescription = styled(Typography)<{component: "h4"}>`
    /* Priority over parent element (Link element) */
    && {
        color: ${props => props.theme.colours.text.muted};
    }
`

export const QuickLinkImg = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`
