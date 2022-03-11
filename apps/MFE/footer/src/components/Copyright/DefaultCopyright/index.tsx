import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {TextModel} from "models/text"
import {CopyrightText} from "../components"

type DefaultCopyrightProps = {
    text: TextModel
}
const DefaultCopyright = (props: DefaultCopyrightProps) => {
    const date = new Date()
    const getYear = date.getFullYear()
    const copyrightText = `${getYear} ${props.text.defaultCopyrightText}`
    return (
        <CopyrightText
            data-testid={formatTextTestIds(`footer-copyright-default-text`)}
            component="h3"
            variant="inherit"
            align="center"
        >
            &copy; {copyrightText}
        </CopyrightText>
    )
}

export default DefaultCopyright
