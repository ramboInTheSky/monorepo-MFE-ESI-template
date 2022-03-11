import React, {useState, useEffect} from "react"
import {ClickAwayListener, PopperPlacementType} from "@mui/material"
import {FadeInAnimation} from "@monorepo/animations"
import {Arrow, PopperComponent} from "./component"

// type Modifiers = {
//     name: string
//     enabled: boolean
//     options?: {
//         rootBoundary?: string
//     }
// }

export interface ToolTipProps {
    children: JSX.Element
    timeout?: number
    open: boolean
    anchorEl: null | HTMLElement
    handleClose: (event: MouseEvent | TouchEvent) => void
    animationTimeout?: number
    placement?: PopperPlacementType
    enableModArrow?: boolean
    modifiers?: []
}

let timerId: any = 0

const ToolTip = ({
    open,
    anchorEl,
    children,
    handleClose,
    timeout = undefined,
    animationTimeout = 350,
    placement = "bottom",
    enableModArrow = false,
    modifiers = [],
}: ToolTipProps) => {
    const [arrowRef, setArrow] = useState<null | HTMLElement>(null)

    const setMouseOut = () => {
        if (timeout) {
            clearTimeout(timerId)
            timerId = setTimeout(handleClose, timeout)
        }
    }

    useEffect(() => {
        setMouseOut()
    })

    const setMouseIn = () => {
        if (timeout) clearTimeout(timerId)
    }

    return (
        <FadeInAnimation show={open} timeout={animationTimeout}>
            <PopperComponent
                onMouseLeave={setMouseOut}
                onMouseEnter={setMouseIn}
                open={open}
                anchorEl={anchorEl}
                keepMounted
                disablePortal
                transition
                modifiers={[
                    ...modifiers,
                    {
                        name: "arrow",
                        enabled: enableModArrow,
                        options: {
                            element: arrowRef,
                        },
                    },
                ]}
                placement={placement}
            >
                <Arrow ref={enableModArrow ? setArrow : null} />
                <ClickAwayListener onClickAway={handleClose}>{children}</ClickAwayListener>
            </PopperComponent>
        </FadeInAnimation>
    )
}

export default ToolTip
