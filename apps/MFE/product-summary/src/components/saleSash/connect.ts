import {connect} from "react-redux"
import State from "../../models/state"

export const mapStateToProps = (state: State) => {
    return {
        saleSashUrl: state.productSummary.summaryData.saleSash,
        saleSashPosition: state.productSummary.summaryData.saleSashPosition,
    }
}

export default connect(mapStateToProps)
