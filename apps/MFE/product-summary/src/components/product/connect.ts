import {connect} from "react-redux"
import State from "../../models/state"
import setFavouriteEnabled from "../../utils/setFavouriteEnabled"
import isMadeToMeasure from "../../utils/isMadeToMeasure"
import {ProductType} from "../../config/constants"

export const mapStateToProps = (state: State) => {
    const {
        productSummary: {
            summaryData: {id: itemNumber, type: productType, colourways, brand},
            enableFav,
            enableReviewStars,
            enableBrandDisplay,
        },
    } = state
    const selectedColourway = colourways.find(colourway => colourway.selected)
    const isMade2Measure = isMadeToMeasure(selectedColourway!.personalisedType)
    const isPersonalised = !colourways[0].personalisedType
    return {
        itemNumber,
        favouriteBtnEnabled: (enableFav && !isMade2Measure) ? setFavouriteEnabled(productType, isPersonalised) : false,
        productType,
        enableReviewStars: enableReviewStars ? productType === ProductType : false,
        enableBrandDisplay,
        brand
    }
}

export default connect(mapStateToProps)
