import TextField from "@mui/material/TextField"
import { TextModel } from "models/Text"
import React from "react"

interface FilterSearchInputProps {
    displayName: string
    params?: any
    text: TextModel
}

// eslint-disable-next-line react/display-name
export const FilterSearchInput = React.memo(({displayName, params, text}: FilterSearchInputProps) => {
    return (
        <TextField
            {...params}
            placeholder={`${text.pages.viewAllModal.searchForA} ${displayName}`} 
            InputLabelProps={{shrink: false}} 
            margin="dense"
            variant="outlined" 
        />
    )
})
