import React from "react"
import connect from "./connect"

export type QuickLinkProps = {
    text: string | null
    icon: string | null
    url: string
    accessibilityText: string
    componentName: any
}

const QuickLink = ({text, url, icon, accessibilityText, componentName}: QuickLinkProps) => {
    const ComponentName = componentName
    return <ComponentName text={text} url={url} icon={icon} accessibilityText={accessibilityText} />
}

export default connect(QuickLink)
