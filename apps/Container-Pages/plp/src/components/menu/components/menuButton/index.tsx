import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import { TextModel } from "models/Text"
import {StyledMenuButton} from "./components"

interface MenuButtonProps {
    setOpen: (value: React.SetStateAction<boolean>) => void
    anchorRef: React.RefObject<HTMLButtonElement>
    buttonText: string
    open: boolean
    text: TextModel
}
const MenuButton = ({setOpen, anchorRef, buttonText, open, text}: MenuButtonProps) => {
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen)
    }
    const prevOpen = React.useRef(open)
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus()
        }

        prevOpen.current = open
    }, [open, anchorRef])

    return (
        <StyledMenuButton
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            aria-describedby={open ? "styled-options-menu" : undefined}
            onClick={handleToggle}
            disableRipple
            disableElevation
            variant="text"
            ref={anchorRef}
            data-testid={formatTextTestIds(`plp-menu-button-${buttonText}`)}
        >
            {open ? text.labels.close : buttonText}
        </StyledMenuButton>
    )
}
export default MenuButton
