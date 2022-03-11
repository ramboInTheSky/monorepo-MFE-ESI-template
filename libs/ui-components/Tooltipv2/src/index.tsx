import React, {useState, useEffect} from "react"
import {usePopper} from "react-popper"
import {ClickAwayListener} from "@mui/base"
import {Arrow} from "./component"

let timerId: any

export interface ToolTipProps {
    children: JSX.Element
    timeout?: number
    handleClose: (event: MouseEvent | TouchEvent) => void
    referenceElement: HTMLElement | null
}

const Tooltipv2 = ({children, referenceElement, timeout = undefined, handleClose}: ToolTipProps) => {
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
    const {styles, attributes} = usePopper(referenceElement, popperElement, {
        modifiers: [
            {name: "arrow", options: {element: arrowElement}},
            {name: "offset", options: {offset: [18, 18]}},
        ],
    })

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
    const currentPlacement = attributes.popper?.["data-popper-placement"]
    return (
        <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            onMouseLeave={setMouseOut}
            onMouseEnter={setMouseIn}
        >
            <Arrow ref={setArrowElement} data-placement={currentPlacement} style={styles.arrow} />
            <ClickAwayListener onClickAway={handleClose}>{children}</ClickAwayListener>
        </div>
    )
}

export default Tooltipv2
