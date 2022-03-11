import {connect} from "react-redux"
import {setPageItemsThunk} from "../../ducks/search"

export const mapDispatchToProps = {
    loadPageFromUrl: (historyUrl: string) => setPageItemsThunk({historyUrl}),
}

export default connect(null, mapDispatchToProps)
