import {connect} from "react-redux"
import {QuickLinkProps} from "../QuickLink"
import {State} from "../../ducks"
import {SupportedRegionTypes} from "../../models/regions"
import {formatCdnPathWithVariant} from "../../utils/getCdnUrl"
import {REALM_HEADER} from "../../config/constants"

export const mapStateToProps = (state: State) => {
    const {siteUrl} = state.request
    const {variant} = state.settings
    const realm = state.request.headers![REALM_HEADER] as string
    const quickLinkObject = state.data?.regions.find(region => region.type === SupportedRegionTypes.QuickLinks)
    const quickLinks = quickLinkObject?.elements
        .filter(link => link.type === "link")
        .map(({text, url, accessibilityText, icon}) => {
            const iconUrl = icon ? formatCdnPathWithVariant(icon, realm, variant) : null
            return {
                text,
                url: `${siteUrl}${url}`,
                accessibilityText: accessibilityText ?? "",
                icon: iconUrl,
            } as QuickLinkProps
        })

    return {
        quickLinks,
    }
}

export default connect(mapStateToProps)
