import {connect} from "react-redux"
import State from "../../models/state"
import {formatPdpLink, getToolTipTitleByType, formatTitle} from "../../utils/colourwayBuilders"
import { SuitType } from "../../config/constants"

export const mapStateToProps = (state: State) => {
    const {
        productSummary: {
            summaryData: {title: defaultTitle, colourways, baseUrl, type, department, fit},
            enabledSearchDesc,
        },
        request: {isEnglishLang},
    } = state

    const selectedColourway = colourways.find(colourway => colourway.selected)

    const textTitle = enabledSearchDesc
        ? selectedColourway?.title || ""
        : formatTitle({
            title: defaultTitle,
            selectedColourway,
            fit,
            department,
            isMultipleColourways: colourways.length > 1,
            isEnglishLang,
        })
    return {
        overallStarRating: selectedColourway!.overallStarRating || 0,
        linkUrl: formatPdpLink(baseUrl, selectedColourway!.url),
        tooltipTitle: getToolTipTitleByType(type, {
            title: selectedColourway!.title,
            defaultTitle: type === SuitType ? defaultTitle : textTitle,
            colourwayItemNumber: selectedColourway!.id,
            price: selectedColourway!.price,
            salePrice: selectedColourway!.salePrice,
            fit,
            selectedColourway,
            isEnglishLang
        }),
    }
}

export default connect(mapStateToProps)
