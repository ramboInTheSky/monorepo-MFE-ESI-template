import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import {MenuItem, Select, FormControl, OutlinedInput} from "@mui/material"
import { makeStyles, createStyles } from '@mui/styles';
import {COUNTRY_SELECTOR_DRAWER_BREAKPOINT} from "../../config/constants"

export const ElementProps = makeStyles(() =>
    createStyles({
        root: {
            "&&": {
                width: "100%",
                height: "2rem",
                display: "flex",
                justifyContent: "flex-start",
                padding: "0 0.5rem",
            },
            "&&$selected": {
                backgroundColor: "#c5c5c5",
                color: "#ffffff",
            },
            "&&$selected:hover": {
                backgroundColor: "#c5c5c5",
                color: "#ffffff",
            },
            "&&:hover": {
                backgroundColor: "#515151",
                color: "#ffffff",
            },
        },
        selected: {
            backgroundColor: "#c5c5c5",
            color: "#ffffff",
        },
        menuPaper: {
            maxHeight: 300,
            width: "28rem",
        },
        icon: {
            minWidth: "2rem",
        },
    }),
)

export const StyledSelect = styled(Select)`
    width: 100%;
    height: 2.75rem;
    @media (min-width: ${COUNTRY_SELECTOR_DRAWER_BREAKPOINT}) {
        width: 28rem;
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        height: 2rem;
    }
    && > div {
        padding: 0.625rem 2.25rem 0.625rem 0.625rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
    }
    && > div:focus {
        background-color: transparent;
    }
    &&.selectOpen {
        border-radius: 0.25rem 0.25rem 0 0;
    }
    && .selectBody {
        border-radius: 0 0 0.25rem 0.25rem;
    }
`

export const StyledOutlinedInput = styled(OutlinedInput)`
    &&& > fieldset {
        border: ${({theme}) => theme.colours.form.default.border};
    }
`

export const SelectedFormControl = styled(FormControl)`
    margin: 0.5rem 0;
    &:hover {
        border: none;
    }
`

export const SelectedMenuItem = styled(MenuItem)`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 0 0.5rem;
    transition: color 0s, background-color 0s;
`

export const StyledIcon = styled.img`
    top: calc(50% - 0.25rem);
    right: 1rem;
`

export const MenuItemCountryFlagImg = styled.img`
    width: 1.5rem;
    height: 1.5rem;

    @media (min-width: ${breakpoints.values.lg}px) {
        height: 1.25rem;
        width: 1.25rem;
    }
`
