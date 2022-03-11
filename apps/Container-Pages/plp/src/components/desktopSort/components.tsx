import styled from "styled-components"
import {FormControl, InputLabel, Popper, TextField} from "@mui/material"
import {breakpoints} from "@monorepo/themes"
import {Autocomplete} from "@mui/material"

export const DesktopSortContainer = styled.div`
    flex-grow: 1;
    padding: 0 1rem 0 0;

    @media (max-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint] - 1}px`}) {
        display: none;
    }
`

export const StyledFormControl = styled(FormControl)`
    flex-direction: row;
    float: right;

    & div[role="presentation"] {
        top: 2rem;
        left: 0;
    }

    & ul[role="listbox"] {
        padding: 0;
    }

    & li {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: "0 0.5rem";
    }

    & li[aria-selected="true"] {
        background-color: #f7f7f7;
        color: ${props => props.theme.colours.text.default};
    }

    & li[aria-selected="true"]:focus {
        background-color: #f7f7f7;
        color: ${props => props.theme.colours.text.default};
    }
    & li[data-focus="true"] {
        background-color: ${props => props.theme.colours.text.muted};
        color: ${props => props.theme.colours.text.reversed};
    }
`

export const StyledAutocomplete = styled(Autocomplete)`
    width: 13.5rem;
    height: 2.25rem;

    &&& > div > div > div {
        top: calc(50%);
        right: 0.875rem;
        transform: translateY(-50%);
    }

    && > div > div {
        padding: 0;
    }

    &&& fieldset {
        border: ${props => props.theme.colours.popover.border};
        border-radius: ${props => props.theme.colours.popover.radius};
    }
`

export const StyledOutlinedInput: any = styled(TextField)`
    &&& > fieldset {
        border: ${props => props.theme.colours.popover.border};
        border-radius: ${props => props.theme.colours.popover.radius};
    }

    &&& > div {
        padding-right: 0;
    }

    &&&& input {
        cursor: pointer;
        padding: 0.625rem 2.25rem 0.5625rem 0.625rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
    }
`
export const StyledInputLabel = styled(InputLabel)`
    transform: translate(-0.3125rem, 0.625rem) translateX(-100%) scale(1);
`
export const StyledPopper = styled(Popper)`
    &&&&$selected {
        background-color: ${props => props.theme.colours.text.disabled};
        color: ${props => props.theme.colours.text.reversed};
    }
    &&&&$selected:hover {
        background-color: ${props => props.theme.colours.text.disabled};
        color: ${props => props.theme.colours.text.reversed};
    }

    &&&& li:hover {
        background-color: ${props => props.theme.colours.text.muted};
        color: ${props => props.theme.colours.text.reversed};
    }
`
