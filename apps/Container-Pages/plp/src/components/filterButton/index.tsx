import React from "react"
import {StyledFilterButton} from "./components"

interface FilterButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    text: string
    large?: boolean
    "data-testid"?: string
}

export const FilterButton = ({large, onClick, text, ...rest}: FilterButtonProps) => (
    <StyledFilterButton
        $large={large}
        type="button"
        onClick={onClick}
        disableRipple
        disableElevation
        disableFocusRipple={false}
        data-testid={rest["data-testid"]}
    >
        {text}
    </StyledFilterButton>
)

export default FilterButton
