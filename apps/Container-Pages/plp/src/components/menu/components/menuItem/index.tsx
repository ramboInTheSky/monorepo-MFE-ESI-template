import React, {useCallback} from "react"
import {StyledMenuItem, StyledListItemIcon, StyledListItemText} from "./components"
import env from "../../../../config/env"

interface MenuItemProps {
    name: string
    value: string
    isSelected: boolean
    handleClose: (event, value?: string | undefined) => any
}

const MenuItem = ({name, value, isSelected, handleClose}: MenuItemProps) => {
    const onClick = useCallback(
        event => {
            handleClose(event, value)
        },
        [value, handleClose],
    )

    return (
        <StyledMenuItem
            onClick={onClick}
            className={isSelected ? "selected" : ""}
            selected={isSelected}
            autoFocus={isSelected}
        >
            {isSelected && (
                <StyledListItemIcon>
                    <img src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/sort-check.svg`} alt="check icon" />
                </StyledListItemIcon>
            )}
            <StyledListItemText primary={name} primaryTypographyProps={{variant: "h5"}} inset={!isSelected} />
        </StyledMenuItem>
    )
}

export default MenuItem
