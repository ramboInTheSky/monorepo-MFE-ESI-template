import {useRef, useEffect} from "react"
import {useSelector} from "react-redux"
import State from "../../models/state"
import {onPageLoadGtmTrigger} from "../../utils/onPageLoadGtmTrigger"
import {doGoogleAnalytics} from "../../utils/featureSwitch"
import removeCurrencyAndSpaces from "../../utils/removeCurrencyAndSpaces"
import {getSearchKeyword} from "../../utils/getPLPDefaultTitle"
import isMadeToMeasure from "../../utils/isMadeToMeasure"

const selectStateForGTM = (state: State) => {
    if (!state.productSummary) return null

    const {colourways, currencyCode, department} = state.productSummary.summaryData
    const {text} = state
    if (colourways.length <= 0) return null
    const firstProduct = colourways[0]
    const useSalePrice = !!firstProduct.salePrice
    let finalPrice

    const selectedColourway = colourways.find(colourway => colourway.selected)
    
    if(isMadeToMeasure(selectedColourway?.personalisedType)) {
        finalPrice = `${text.price.from} ${selectedColourway?.minPrice}`
    } else if (useSalePrice) {
        finalPrice = firstProduct.salePrice || ""
    } else {
        finalPrice = firstProduct.price
    }

    if(!isMadeToMeasure(selectedColourway?.personalisedType)) {
        finalPrice = removeCurrencyAndSpaces(finalPrice)
    }
    return {
        productId: firstProduct.id,
        productTitle: firstProduct.title,
        price: finalPrice,
        colour: firstProduct.colour,
        currencyCode,
        department,
        searchKeyword: department,
    }
}

const useGTMSelectorProps = () => {
    // To enforce running only once
    const state = useSelector(selectStateForGTM, () => true)
    return state
}

export const useGTMOnHydrate = () => {
    const isMounted = useRef(false)
    const state = useGTMSelectorProps()

    useEffect(() => {
        if (!doGoogleAnalytics()) return
        if (isMounted.current || !state) return
        const {href, search} = window.location
        state.searchKeyword = getSearchKeyword(href, search) || state.searchKeyword
        onPageLoadGtmTrigger(state)
        isMounted.current = true
    }, [state])
}

export default useGTMOnHydrate
