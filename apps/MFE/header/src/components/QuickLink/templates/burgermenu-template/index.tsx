import React from "react"
import {NO_FOLLOW} from "../../../../config/constants"
import {A, Img, Li} from "./component"
import {removeFromLocalStorage} from "../../../../utils/removeFromLocalStorage"
import {buildGaTags} from "../../../../utils/dataGA"

export type QuickLinkProps = {
    text: string | null
    icon: string | null
    url: string
    accessibilityText: string
}

const BurgerMenuQuickLink = ({text, url, icon, accessibilityText}: QuickLinkProps) => {
    return (
        <Li>
            {/* eslint-disable-next-line */}
            <div onClick={removeFromLocalStorage} data-testid="quicklink-container">
                <A href={url} rel={NO_FOLLOW} {...buildGaTags(text)}>
                    {icon && <Img src={icon} alt={accessibilityText} />}
                </A>
            </div>
        </Li>
    )
}

export default BurgerMenuQuickLink
