import Link from "@mui/material/Link"
import styled from "styled-components"
import Theme from "../../models/theme"

type CharacterLinkProps = {
    disabled?: boolean
    selected?: boolean
    component: string
    theme: Theme
}

export const CharacterLink: any = styled(Link)<CharacterLinkProps>`
    && {
        padding: 0.1875rem;
        overflow-anchor: none;
        font-size: 0.875rem;
        font-family: ${(props: CharacterLinkProps) => props.theme.colours.font.primary.medium.family};
        font-weight: ${(props: CharacterLinkProps) => props.theme.colours.text.navigation.fontWeight};
        color: ${(props: CharacterLinkProps) => {
            if (props.disabled) {
                return props.theme.colours.text.disabled
            }
            return props.selected ? props.theme.colours.text.default : props.theme.colours.text.hyperlink
        }};
        cursor: ${(props: CharacterLinkProps) => (props.disabled ? "default" : "pointer")};
    }
    &&:hover {
        text-decoration: ${(props: CharacterLinkProps) => (props.disabled ? "none" : "underline")};
    }
`
