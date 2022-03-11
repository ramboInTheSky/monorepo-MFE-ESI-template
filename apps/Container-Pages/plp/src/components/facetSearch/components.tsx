import styled from "styled-components"
import Autocomplete from "@mui/material/Autocomplete"

export const AutocompleteContainer = styled.div``
export const FacetSearchAutocomplete = styled(Autocomplete)`
    && {
        width: 14.5rem;
        margin-right: 1rem;

        && > div {
            margin: 0;
        }

        && > div > div {
            height: 2rem;
            padding: 0 0.375rem 0 0;
            background-color: #ffffff;
        }

        && > div > div > input {
            height: 100%;
            padding: 0 0 0 0.5rem;
        }
    }
    && button {
        display: none;
    }
    && input {
        font-size: 0.75rem;
    }
`
