import {connect} from "react-redux"
import State from "../../models/State"

const mapStateToProps = (state: State) => ({
    siteUrl: state.request.siteUrl,
    useDevEsi: state.request.useDevEsi,
    url: state.request.url,
    html: state.search.searchBannerHtml,
    includedComponents: state.search.includedComponents,
    requestType: state.request.type,
    enableSearchBanners: state.features.enableSearchBanners,
    text: state.text
})

export default connect(mapStateToProps)
