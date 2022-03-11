import {InputBase} from "@mui/material"
import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-shrink: 0;
    height: 2.75rem;
    margin: 0.75rem 0.75rem 0.5rem 0.75rem;
`

export const SearchBar = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    margin: 0;
    align-items: center;
    border-radius: 0.25rem;
    border: ${({theme}) => theme.colours.form.default.border};

    &:focus-within {
        outline: 2px solid #1d89dd;
    }
`

export const Input = styled(InputBase)`
    width: 100%;
    font-size: 1rem;
    input {
        &::-ms-clear {
            display: none;
        }
    }
`

export const SearchIcon = styled.div`
    && {
        width: 2.25rem;
        width: 2.25rem;
        padding: 0;
        margin: 0 0.125rem;
        background: ${({theme}) => theme.colours.form.input.background};
        min-width: auto;

        &:hover,
        &:active {
            background: ${({theme}) => theme.colours.form.input.background};
            border: 0;
        }

        &:focus {
            border: 0;
            border-radius: 0;
        }
    }
`

export const Icon = styled.img`
    cursor: pointer;
`
