import React from "react"
import stylisRTLPlugin from "stylis-plugin-rtl"
import {StyleSheetManager} from "styled-components"

interface WithStyleSheetProps {
    children: JSX.Element
    textAlignment: string
}
Object.defineProperty(stylisRTLPlugin, "name", {value: "stylis-rtl"}) // uniquely name plugins passed to StyleSheetManager

const WithStyleSheet = ({textAlignment, children}: WithStyleSheetProps) => {
    const isRTL = textAlignment.toLowerCase() === "rtl"
    return isRTL ? <StyleSheetManager stylisPlugins={[stylisRTLPlugin]}>{children}</StyleSheetManager> : <>{children}</>
}

export default WithStyleSheet
