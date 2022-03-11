import {connect} from "react-redux"
// import {SuitSummaryData} from "../../models/searchApi/suit"
import State from "../../models/state"
import {formatSuitTooltipTitle, formatSuitTitle, formatPdpLink} from "../../utils/colourwayBuilders"

export const mapStateToProps = (state: State) => {
    const {colourways, title: defaultTitle, baseUrl, fit} = state.productSummary.summaryData
    const selectedColourway = colourways.find(colourway => colourway.selected)

    const {title, id: colourwayItemNumber, price, url, salePrice} = selectedColourway!
    const {isEnglishLang} = state.request

    return {
        title: formatSuitTitle({title, defaultTitle, fit, selectedColourway, isEnglishLang}),
        tooltipTitle: formatSuitTooltipTitle({
            title,
            defaultTitle,
            colourwayItemNumber,
            price,
            salePrice,
            fit,
            selectedColourway,
            isEnglishLang,
        }),
        linkUrl: formatPdpLink(baseUrl, url),
    }
}

export default connect(mapStateToProps)
