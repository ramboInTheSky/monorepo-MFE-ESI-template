import Button from "@mui/material/Button"
import styled from "styled-components"
import Theme from "../../models/theme"

type StyledFilterButtonProps = any & {
    $large?: boolean
    theme: Theme
}

export const StyledFilterButton: any = styled(Button)`
    && {
        ${(props: StyledFilterButtonProps) => props.$large && "padding: 0.15rem 0 0 0;"}
        padding-left: 0;
        color: ${(props: StyledFilterButtonProps) =>
            props.$large ? props.theme.colours.form.buttonPrimary.color : props.theme.colours.text.hyperlink};
        background-color: ${(props: StyledFilterButtonProps) =>
            props.$large ? props.theme.colours.form.buttonPrimary.background : "transparent"};
        overflow-anchor: none;
        min-width: auto;
        &&:hover {
            background-color: ${(props: StyledFilterButtonProps) =>
                props.$large ? props.theme.colours.form.buttonPrimary.background : "transparent"};
        }
        &&:focus {
            border: none;
        }
        && span {
            justify-content: flex-start;
            text-align: left;
        }
        ${(props: StyledFilterButtonProps) =>
            props.$large &&
            `
            && span {
                justify-content: center; 
                text-align: center;
                padding: 0.438rem 0.75rem; 
                letter-spacing: 0.054rem;
            }`}
    }
`
