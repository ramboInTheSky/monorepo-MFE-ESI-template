import React, {useContext} from "react"
import {ThemeContext} from "styled-components"
import Accordion from "@monorepo/accordion"
import env from "../../config/env"

const {REACT_APP_BLOB_STORAGE_PATH} = env

type AccordionComponentProps = {
    title: string
    children: JSX.Element
}

export const AccordionComponent = ({title, children}: AccordionComponentProps) => {
    const {colours} = useContext(ThemeContext)

    const props = {
        titleColor: colours.text.default,
        border: colours.utilities.divider,
        arrowIconUrl: `${REACT_APP_BLOB_STORAGE_PATH}/icons/shared/chevron.svg`,
        title,
    }

    return <Accordion {...props}>{children}</Accordion>
}

export default AccordionComponent
