import {connect} from "react-redux"
import State from "../../models/state"
import {PublishRemoveFromFav, PublishAddToFav} from "../../events"
import {getListId} from "../../utils/getWindowNextFavourites"
import {setFavouritedColourways, setLoadingFav, setAnimateFavouriteIcon} from "../../ducks/productSummary"
import {PublishToModalsClosed} from "../../events/modalsClosed"

export const mapStateToProps = ({productSummary, text}: State) => {
    const {
        isFav,
        showFavErrorToolTip,
        enabledSearchDesc,
        isLoadingFav,
        animateFavouriteIcon,
        summaryData: {id, title, baseUrl, colourways, fit, department},
    } = productSummary
    return {
        isFav,
        itemNumber: id,
        title,
        showFavErrorToolTip,
        baseUrl,
        colourways,
        enabledSearchDesc,
        fit,
        department,
        isLoadingFav,
        text,
        animateFavouriteIcon,
        selectedColourwayTitle: colourways.find(colourway => colourway.selected)?.title,
    }
}

export const mergeProps = (state: any, {dispatch}: any, ownProps) => ({
    ...state,
    ...ownProps,
    addToFavourites: () => {
        dispatch(setLoadingFav(true))
        dispatch(setAnimateFavouriteIcon(true))
        PublishToModalsClosed()
        const eventId = Date.now().toString()
        const listId = getListId()
        const data = {
            itemNumber: state.colourways.find(colourway => colourway.selected)?.id,
            listId,
            optionCode: -1,
            eventId,
        }
        dispatch(PublishAddToFav(data))
    },

    removeFromFavourites: () => {
        dispatch(setLoadingFav(true))
        dispatch(setAnimateFavouriteIcon(true))
        PublishToModalsClosed()
        const eventId = Date.now().toString()
        const listId = getListId()
        const data = {
            itemNumber: state.colourways.find(colourway => colourway.selected)?.id,
            listId,
            optionCode: -1,
            eventId,
        }
        dispatch(PublishRemoveFromFav(data))
    },
    setFavouritedColourways: (favouritedColourways: string[]) =>
        dispatch(setFavouritedColourways(favouritedColourways)),
})

export default connect(mapStateToProps, null as any, mergeProps)
