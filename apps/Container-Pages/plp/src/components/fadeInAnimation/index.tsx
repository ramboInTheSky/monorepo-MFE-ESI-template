import React from "react"
import {Transition} from "react-transition-group"

export type FadeInAnimationProps = {
    show: boolean
    children: any
    timeout: number
}

export const FadeInAnimation = ({show, children, timeout}: FadeInAnimationProps) => {
    const defaultStyle = {
        transition: `opacity ${timeout}ms ease-in-out`,
        opacity: 0,
    }
    const transitionStyles = {
        entering: {opacity: 1},
        entered: {opacity: 1},
        exiting: {opacity: 0},
        exited: {opacity: 0},
    }

    return (
        <Transition in={show} timeout={timeout} unmountOnExit>
            {state => <div style={{...defaultStyle, ...transitionStyles[state]}}>{children}</div>}
        </Transition>
    )
}

export default FadeInAnimation
