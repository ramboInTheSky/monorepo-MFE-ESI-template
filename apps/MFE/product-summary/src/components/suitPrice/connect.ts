import {connect} from "react-redux"
import {SuitSummaryData} from "../../models/searchApi/suit"
import State from "../../models/state"
import {formatPdpLink, formatSuitTooltipTitle} from "../../utils/colourwayBuilders"

export const mapStateToProps = (state: State) => {
    const {colourways, title: defaultTitle, baseUrl, fit} = state.productSummary.summaryData as SuitSummaryData
    const colourwaysHasSale = colourways.some(colourway => colourway.salePrice !== null)
    const associatedColourwayHasSale = colourways.some(colourway => colourway.associatedColourway.salePrice !== null)
    const selectedColourway = colourways.find(colourway => colourway.selected)
    const {isEnglishLang} = state.request

    const {
        title,
        id: colourwayItemNumber,
        price,
        wasPrice,
        salePrice,
        url,
        suitPrice,
        wasSuitPrice,
        saleSuitPrice,
        associatedColourway,
    } = selectedColourway!
    const {text} = state

    return {
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
        jacketPrice: price,
        wasJacketPrice: wasPrice,
        saleJacketPrice: salePrice,
        suitPrice,
        wasSuitPrice,
        saleSuitPrice,
        trouserPrice: associatedColourway.price,
        wasTrouserPrice: associatedColourway.wasPrice,
        saleTrouserPrice: associatedColourway.salePrice,
        text,
        jacketsHasSale: colourwaysHasSale,
        trousersHasSale: associatedColourwayHasSale,
    }
}

export default connect(mapStateToProps)
