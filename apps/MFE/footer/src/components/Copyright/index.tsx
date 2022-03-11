import React, {Component, MouseEvent} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {TextModel} from "models/text"
import {RegionModel} from "../../models/footerModel"
import {SupportedCopyrightTypes, DeviceType, DefaultColumns, deviceSwitcherUtils} from "../../models/regions"

import {CopyrightText, GridContainer, DeviceToggleLink, ChildGrid} from "./components"

import connect from "./connect"
import DefaultCopyright from "./DefaultCopyright"
import configUrlPath from "../../utils/configUrlPath"
import {getRegExValue} from "../../utils/getRegExValue"
import getWithDynamicYear from "../../utils/getWithDynamicYear"

interface CopyrightProps {
    region?: RegionModel
    siteUrl: string
    text: TextModel
    deviceSwitcherFn: (event: MouseEvent<HTMLAnchorElement>, url: string) => void
}
interface CopyrightState {
    cookieDeviceType: string
    showDeviceSwitcher: boolean
}

export class Copyright extends Component<CopyrightProps, CopyrightState> {
    constructor(props: CopyrightProps) {
        super(props)

        this.state = {
            cookieDeviceType: DeviceType.Desktop,
            showDeviceSwitcher: true,
        }
    }

    componentDidMount() {
        if (!window.location.href.startsWith(this.props.siteUrl)) {
            this.setState({
                showDeviceSwitcher: false,
            })
            return
        }

        const AmidoDeviceType = getRegExValue(document.cookie, deviceSwitcherUtils.cookieKey, deviceSwitcherUtils.regex)

        this.setState({
            cookieDeviceType: AmidoDeviceType || DeviceType.Desktop,
        })
    }

    render() {
        const {region, siteUrl, deviceSwitcherFn, text} = this.props
        const {cookieDeviceType, showDeviceSwitcher} = this.state
        if (!region) {
            return <DefaultCopyright text={text} />
        }
        const {elements} = region.subRegions[0]

        return (
            <GridContainer container direction="column" alignItems="center">
                {elements
                    .filter(
                        element =>
                            showDeviceSwitcher ||
                            (element.type !== SupportedCopyrightTypes.DesktopToggle &&
                                element.type !== SupportedCopyrightTypes.MobileToggle),
                    )
                    .map(element => {
                        if (
                            (element.type === SupportedCopyrightTypes.MobileToggle &&
                                cookieDeviceType === DeviceType.Desktop) ||
                            (element.type === SupportedCopyrightTypes.DesktopToggle &&
                                cookieDeviceType === DeviceType.Mobile)
                        ) {
                            const url = configUrlPath(element.url, siteUrl)
                            return (
                                <ChildGrid key={element.type} item xs={DefaultColumns.xs}>
                                    <DeviceToggleLink
                                        href=""
                                        onClick={e => deviceSwitcherFn(e, url)}
                                        data-testid={formatTextTestIds(`footer-copyright-switcher-${element.name}`)}
                                    >
                                        {element.text}
                                    </DeviceToggleLink>
                                </ChildGrid>
                            )
                        }
                        if (element.type === SupportedCopyrightTypes.Copyright) {
                            return (
                                <ChildGrid key={element.type} item xs={DefaultColumns.xs}>
                                    <CopyrightText
                                        variant="body2"
                                        component="h3"
                                        data-testid={formatTextTestIds(`footer-copyright-text`)}
                                    >
                                        {getWithDynamicYear(element.text)}
                                    </CopyrightText>
                                </ChildGrid>
                            )
                        }

                        return null
                    })}
            </GridContainer>
        )
    }
}

export default connect(Copyright)
