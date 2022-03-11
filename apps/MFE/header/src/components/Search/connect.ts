import {connect} from "react-redux"
import State from "../../ducks/state"

import urls from "../../config/urls"
import {Anchor, REALM_HEADER} from "../../config/constants"
import {closeAllPanels, openDrawer} from "../../ducks/search"
import {SupportedFeatureTypes} from "../../models/features"

export const mapStateToProps = (state: State) => {
    const realm = state.request.headers![REALM_HEADER] as string
    const {variant} = state.settings
    const anchor: Anchor = state.textAlignment.toLowerCase() === "rtl" ? "left" : "right"
    const {
        searchBox: {closeButton, smallPlaceholder, bigPlaceholder},
        drawer,
    } = state.text

    return {
        checkRecentSearch: state.recents.queryIds.length > 0,
        showAutoComplete: state.search.showAutocomplete,
        showRecentSearch: state.search.showRecentSearch,
        iconUrl: urls.searchBox.searchIconUrl(realm, variant),
        anchor,
        searchBarType: state.features[SupportedFeatureTypes.SearchBar].Value,
        typedCharacters: state.search.typedCharacters,
        text: {closeButton, smallPlaceholder, drawer, bigPlaceholder},
    }
}

export const mapDispatchToProps = (dispatch: any) => ({
    handleClose: () => dispatch(closeAllPanels()),
    openDrawer: () => dispatch(openDrawer()),
})

export default connect(mapStateToProps, mapDispatchToProps)
