import {connect} from "react-redux"
import {State} from "../../ducks"
import {createRecentQuery} from "../../ducks/recents"
import {search} from "../../ducks/search"

export const mapStateToProps = (state: State) => {
    const {
        autoComplete: {
            searchLinktext,
            enrich: {termTitle},
        },
    } = state.text
    const {products, q} = state.autocomplete
    const {siteUrl} = state.request
    const ProductsMaxItems = state.features.SearchBar.Autocomplete?.ProductsMaxItems

    if (ProductsMaxItems && products && products.length > 0) {
        Object.keys(ProductsMaxItems).forEach(key => {
            if (products.length <= 4) {
                const defaultMaxItem = 5
                ProductsMaxItems[key] = ProductsMaxItems[key] > defaultMaxItem ? ProductsMaxItems[key] : defaultMaxItem
                return false
            }
            if (ProductsMaxItems[key] > products.length) {
                ProductsMaxItems[key] = products.length
            }
        })
    }

    return {
        products,
        term: q,
        siteUrl,
        maxItems: ProductsMaxItems,
        text: {searchLinktext, termTitle}
    }
}

// stateProps is the result of mapStateToProps
// {dispatch}  is the object resultingfrom mapDispatchToProps
// ownProps is the container component own props
export const mergeProps = (stateProps: any, {dispatch}: any, ownProps: any) => {
    return {
        ...stateProps,
        dispatch,
        ...ownProps,
        handleSuggestionClick: (suggestion: string): void => {
            dispatch(createRecentQuery(suggestion))
            dispatch(search(stateProps.siteUrl, suggestion))
        },
    }
}

export default connect(mapStateToProps, null, mergeProps)
