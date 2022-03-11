import React, {useCallback} from "react"
import { TextModel } from "models/Text"
import {StyledMenuContainer} from "./components"

import MenuButton from "./components/menuButton"
import MenuPopper from "./components/menuPopper"
import {Sorting} from "../../models/Sorting"
import TrackSortOpen from "../../events/trackEvent/events/trackSortOpen"

interface MenuProps {
    options?: Sorting
    buttonText: string
    onSelect: (value: string) => void
    text: TextModel
}
// This seems to be the simpliest implementation of a material UI Menu/Tooltip with an arrow.
// See https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/popper/ScrollPlayground.js

export const Menu = (props: MenuProps) => {
    const {options, onSelect, buttonText, text} = props
    const anchorRef = React.useRef<HTMLButtonElement>(null)

    const [open, setOpen] = React.useState(false)

    const setOpenHandler = useCallback((isOpen) => {
        setOpen(isOpen)
        if (isOpen) TrackSortOpen()
    }, [setOpen])

    return (
        <StyledMenuContainer>
            <MenuButton setOpen={setOpenHandler} anchorRef={anchorRef} buttonText={buttonText} open={open} text={text}/>
            <MenuPopper
                anchorRef={anchorRef}
                buttonText={buttonText}
                open={open}
                setOpen={setOpenHandler}
                options={options!}
                onSelect={onSelect}
            />
        </StyledMenuContainer>
    )
}
export default Menu
