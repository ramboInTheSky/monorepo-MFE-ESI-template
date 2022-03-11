import {connect} from "react-redux"
import State from "../../models/state"
import {formatTooltipTitle, formatPdpLink} from "../../utils/colourwayBuilders"
import getTitleUtil from "../../utils/getTitleUtil"

export const mapStateToProps = (state: State) => {
    const {
        productSummary: {
            summaryData: {title, colourways, baseUrl, id, fit, department, currencyCode, brand},
            enabledSearchDesc,
            enableBrandDisplay,
        },
        request: {isEnglishLang},
        text,
    } = state

    const selectedColourway = colourways.find(colourway => colourway.selected)
    const colourwaysHasSale = colourways.some(colourway => colourway.salePrice !== null)
    const colourwayWithPersonalisedType = selectedColourway!.personalisedType

    const getTitle = getTitleUtil({
        enabledSearchDesc,
        title,
        selectedColourway,
        fit,
        department,
        colourways,
        isEnglishLang,
    })

    const brandNameEnabled = enableBrandDisplay && brand !== null
    return {
        price: selectedColourway!.price,
        tooltipTitle: formatTooltipTitle(
            getTitle,
            selectedColourway!.id,
            selectedColourway!.price,
            selectedColourway!.salePrice,
        ),
        linkUrl: formatPdpLink(baseUrl, selectedColourway!.url),
        wasPrice: selectedColourway!.wasPrice,
        salePrice: selectedColourway!.salePrice,
        id,
        title: getTitle,
        colour: selectedColourway!.colour,
        currencyCode,
        department,
        text,
        colourwaysHasSale,
        brandNameEnabled,
        isMade2Measure: colourwayWithPersonalisedType === "madeToMeasure",
        minPrice: selectedColourway!.minPrice
    }
}

export default connect(mapStateToProps)
