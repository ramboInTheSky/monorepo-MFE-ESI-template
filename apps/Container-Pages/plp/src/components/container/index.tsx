import React from "react"
import {PlpContainerComponent} from "./components"
import {useUrlListener} from "../../hooks/useUrlListener"
import connect from "./connect"

interface SeparatorComponentProps {
    children: any
    loadPageFromUrl: (url: string) => void
}

export const PlpContainer = ({children, loadPageFromUrl}: SeparatorComponentProps) => {
    useUrlListener(loadPageFromUrl)
    return (
        <PlpContainerComponent maxWidth="xl" id="plp">
            {children}
        </PlpContainerComponent>
    )
}

export default connect(PlpContainer)
