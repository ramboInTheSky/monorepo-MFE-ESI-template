import {formatTextTestIds} from "@monorepo/utils"
import React, {useCallback} from "react"
import {Grow, Paper, ClickAwayListener} from "@mui/material"
import {StyledPopper, Arrow, StyledMenuList} from "./components"
import {Sorting} from "../../../../models/Sorting"
import MenuItem from "../menuItem"

interface MenuPopperProps {
    buttonText: string
    open: boolean
    anchorRef: React.RefObject<HTMLButtonElement>
    setOpen: (value: React.SetStateAction<boolean>) => void
    options: Sorting
    onSelect: (value: string) => void
}

const MenuPopper = ({buttonText, open, anchorRef, setOpen, options, onSelect}: MenuPopperProps) => {
    const [arrowRef, setArrowRef] = React.useState<null | HTMLElement>(null)

    const handleClose = useCallback(
        (event: MouseEvent | TouchEvent, value?: string) => {
            if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
                return
            }
            setOpen(false)
            if (value && value !== options?.selected) {
                onSelect(value)
            }
        },
        [anchorRef, options, setOpen, onSelect],
    )

    const handleListKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === "Tab") {
                event.preventDefault()
                setOpen(false)
            }
        },
        [setOpen],
    )

    const menuBody = useCallback(
        ({TransitionProps}) => {
            return (
                <Grow {...TransitionProps} style={{transformOrigin: "center top"}}>
                    <Paper elevation={3}>
                        <Arrow className="arrow" ref={setArrowRef} />
                        <ClickAwayListener onClickAway={handleClose}>
                            <StyledMenuList
                                autoFocusItem={open}
                                id="menu-list-grow"
                                data-testid={formatTextTestIds("menu-list-grow")}
                                onKeyDown={handleListKeyDown}
                            >
                                {options.options.map(so => (
                                    <MenuItem
                                        key={so.value}
                                        name={so.name}
                                        value={so.value}
                                        isSelected={so.value === options?.selected}
                                        handleClose={handleClose}
                                    />
                                ))}
                            </StyledMenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )
        },
        [handleClose, handleListKeyDown, open, options],
    )

    return (
        <StyledPopper
            id="styled-options-menu"
            data-testid={formatTextTestIds(`plp-menu-options-${buttonText}`)}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            modifiers={[
                {
                    name: "arrow",
                    enabled: true,
                    options: {
                        element: arrowRef,
                    },
                },
                {
                    name: "preventOverflow",
                    options: {
                        padding: 0,
                    },
                },
                {
                    name: "flip",
                    enabled: false,
                },
            ]}
        >
            {menuBody}
        </StyledPopper>
    )
}

export default MenuPopper
