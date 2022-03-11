import React, {Component} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import logger from "@monorepo/core-logger"
import {targetWindow} from "../../../utils/targetWindow"
import configUrlPath from "../../../utils/configUrlPath"
import {SubRegionElementModel} from "../../../models/footerModel"
import connect from "./connect"
import {MainList, MainListLink} from "./components"
import CountrySelector from "../CountrySelector"
import {getRegExValue} from "../../../utils/getRegExValue"
import {DeviceType, deviceSwitcherUtils} from "../../../models/regions"
import {HIDE_LINKS_FOR_AMIDO_INTERNATIONAL} from "../../../config/constants"

interface SubRegionElementModelWithClassName extends SubRegionElementModel {
    className?: string
}
interface MainLinksProps {
    elements: SubRegionElementModelWithClassName[] & any
    subRegionTitle: string
    siteUrl: string
    isAmidoInternational: boolean
}

const COUNTRY_SELECT_TITLE = "Shop By Country"

interface MainLinksState {
    data: SubRegionElementModel[] & any
}

export class MainLinksList extends Component<MainLinksProps, MainLinksState> {
    constructor(props: MainLinksProps) {
        super(props)

        this.state = {
            data: props.elements,
        }
    }

    componentDidMount() {
        const AmidoDeviceType = getRegExValue(document.cookie, deviceSwitcherUtils.cookieKey, deviceSwitcherUtils.regex)
        const {elements, isAmidoInternational} = this.props
        let data

        if (DeviceType.Mobile === AmidoDeviceType && isAmidoInternational) {
            data = elements.filter(
                // eslint-disable-next-line @typescript-eslint/prefer-includes
                mainLink => HIDE_LINKS_FOR_AMIDO_INTERNATIONAL.indexOf(mainLink.name) === -1,
            )
        } else data = elements
        this.setState({
            data,
        })
    }

    render() {
        const {siteUrl, subRegionTitle, elements} = this.props
        const {data} = this.state
        return (
            <MainList data-testid={formatTextTestIds(`footer-main-links-title-${subRegionTitle}-list`)}>
                {subRegionTitle === COUNTRY_SELECT_TITLE && <CountrySelector elements={elements} />}
                {subRegionTitle !== COUNTRY_SELECT_TITLE &&
                    data.map((element: SubRegionElementModelWithClassName) => {
                        const {text, accessibilityText, url, openInNewWindow, className, description} = element
                        if (!text || !accessibilityText || !url) {
                            logger.error(
                                `MainLinks Footer: ${element} object does not contain either text, accessibilityText or url`,
                            )
                            return null
                        }

                        return (
                            <li key={text}>
                                <MainListLink
                                    href={configUrlPath(url, siteUrl)}
                                    target={targetWindow(openInNewWindow)}
                                    aria-label={accessibilityText}
                                    data-testid={formatTextTestIds(`footer-main-links-${text}`)}
                                    className={className || undefined}
                                >
                                    {text}
                                </MainListLink>
                                {description && <small>{description}</small>}
                            </li>
                        )
                    })}
            </MainList>
        )
    }
}

export default connect(MainLinksList)
