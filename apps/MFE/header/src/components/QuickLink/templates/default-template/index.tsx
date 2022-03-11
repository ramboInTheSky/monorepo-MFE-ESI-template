import React from "react"
import {NO_FOLLOW} from "../../../../config/constants"
import Link from "../../../Link"
import {Li, Text} from "./component"
import {removeFromLocalStorage} from "../../../../utils/removeFromLocalStorage"
import {buildGaTags} from "../../../../utils/dataGA"
import Icon from "../../../Icon"

export type QuickLinkProps = {
    text: string | null
    icon: string | null
    url: string
    accessibilityText: string
}

const DefaultQuickLink = ({text, url, icon, accessibilityText}: QuickLinkProps) => {
    return (
        <Li>
            {/* eslint-disable-next-line */}
            <div onClick={removeFromLocalStorage} data-testid="quicklink-container">
                <Link href={url} rel={NO_FOLLOW} {...buildGaTags(text)}>
                    {text && <Text>{text}</Text>}
                    {icon && <Icon src={icon} alt={accessibilityText} />}
                </Link>
            </div>
        </Li>
    )
}

export default DefaultQuickLink
