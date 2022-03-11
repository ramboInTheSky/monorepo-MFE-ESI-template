import {connect} from "react-redux"
import {selectPriceType} from "../../utils/priceFormatter/selectPriceType"
import {ColourwayData} from "../../models/searchApi"
import State from "../../models/state"
import {formatTooltipTitle, formatPdpLink} from "../../utils/colourwayBuilders"
import getTitleUtil from "../../utils/getTitleUtil"

export const mapStateToProps = (state: State) => {
    const {
        productSummary: {
            summaryData: {id, title, colourways, baseUrl, fit, department, currencyCode},
            enabledSearchDesc,
        },
        request: {isEnglishLang},
    } = state

    const selectedColourway = (colourways as ColourwayData[]).find(colourway => colourway.selected)

    const getTitle = getTitleUtil({
        enabledSearchDesc,
        title,
        selectedColourway,
        fit,
        department,
        colourways,
        isEnglishLang,
    })

    return {
        id,
        title: getTitle,
        tooltipTitle: formatTooltipTitle(
            getTitle,
            selectedColourway!.id,
            selectedColourway!.price,
            selectedColourway!.salePrice,
        ),
        linkUrl: formatPdpLink(baseUrl, selectedColourway!.url),
        price: selectPriceType(selectedColourway!.price, selectedColourway?.salePrice),
        colour: selectedColourway!.colour,
        currencyCode,
        department,
    }
}

export default connect(mapStateToProps)
