import {connect} from "react-redux"
import {State} from "../../ducks"
import {SupportedRegionTypes} from "../../models/regions"
import {formatCdnPathWithVariant} from "../../utils/getCdnUrl"
import {REALM_HEADER} from "../../config/constants"

export const mapStateToProps = (state: State) => {
    const REGION = SupportedRegionTypes.Brand
    const brand = state.data?.regions.find(region => region.type === REGION)
    const {siteUrl} = state.request
    const {icon, narrowModeIcon, wideModeIcon, accessibilityText, tooltip, url} = brand!.elements[0]
    const {variant} = state.settings
    const realm = state.request.headers![REALM_HEADER] as string

    return {
        icon: formatCdnPathWithVariant(icon as string, realm, variant),
        wideModeIcon: formatCdnPathWithVariant(wideModeIcon as string, realm, variant),
        narrowModeIcon: formatCdnPathWithVariant(narrowModeIcon as string, realm, variant),
        accessibilityText: accessibilityText as string,
        tooltip: tooltip as string,
        url: `${siteUrl}${url}`,
    }
}

export default connect(mapStateToProps)
