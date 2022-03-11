import {connect} from "react-redux"
import State from "../../models/state"
import {setShowFavErrorToolTip} from "../../ducks/productSummary"
import {FavErrorToolTipType} from "../../models/ProductSummary"

export const mapStateToProps = ({productSummary, text}: State) => ({
    showFavErrorToolTip: productSummary.showFavErrorToolTip,
    baseUrl: productSummary.summaryData.baseUrl,
    text
})

export const mapDispatchToProps = (dispatch: any) => ({
    setShowFavErrorToolTip: (show: FavErrorToolTipType | null) => dispatch(setShowFavErrorToolTip(show)),
})

export default connect(mapStateToProps, mapDispatchToProps)
