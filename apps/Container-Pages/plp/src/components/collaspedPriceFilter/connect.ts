import {connect, ConnectedProps} from "react-redux"
import State from "../../models/State"
import {isPriceFilter} from "../../models/Filter/typeGuards"
import getLocaleFromHeaders from "../../utils/getLocaleFromHeaders"
import getRealmFromHeaders from "../../utils/getRealmFromHeaders"
import {FilterPrice} from "../../models/Filter"

export const mapStateToProps = (state: State) => {
    const {filters} = state.search
    const {headers} = state.request
    const locale = getLocaleFromHeaders(headers)
    const realm = getRealmFromHeaders(headers)
    const {text} = state

    const priceFilter = Object.values(filters).find(filter => isPriceFilter(filter)) as FilterPrice

    return {
        priceFilter,
        locale,
        realm,
        text
    }
}

export const connector = connect(mapStateToProps, {})
export type PropsFromRedux = ConnectedProps<typeof connector>
