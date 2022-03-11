import {connect} from "react-redux"
import State from "../../models/State"

const mapStateToProps = (state: State) => ({
    siteUrl: state.request.siteUrl,
    useDevEsi: state.request.useDevEsi,
    url: state.request.url,
    totalResults: state.search.totalResults,
    title: state.search.title,
})

export default connect(mapStateToProps)
