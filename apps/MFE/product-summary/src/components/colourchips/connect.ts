import {connect} from "react-redux"
import {ColourwayData} from "../../models/searchApi"
import State from "../../models/state"
import {formatPdpLink, formatTitle} from "../../utils/colourwayBuilders"
import {selectPriceType} from "../../utils/priceFormatter/selectPriceType"
import {IMAGE_EXTENSION, LG_IMAGE_PATH} from "../../config/constants"

export const mapStateToProps = (state: State) => {
    const {
        productSummary: {
            summaryData: {colourways, imageCdnUrl, baseUrl, fit, title, department, productImageUrlPart, currencyCode},
        },
        lazyload: {colourchips},
        request: {isEnglishLang},
        text,
    } = state

    return {
        colourchips: (colourways as ColourwayData[]).map(colourway => ({
            itemNumber: colourway.id,
            colourChipUrl: colourway.colourChipImage,
            linkUrl: formatPdpLink(baseUrl, colourway.url),
            isSelected: colourway.selected,
            colour: colourway.colour,
            title: colourway.title,
            price: selectPriceType(colourway.price, colourway?.salePrice),
            currencyCode,
            department,
            altText: formatTitle({
                title,
                department,
                fit,
                selectedColourway: colourway,
                isMultipleColourways: colourways.length > 1,
                isEnglishLang,
            }),
            text,
        })),
        text,
        lazyloadColourchips: colourchips,
        colourWayImageUrlBuilder: (id: string) =>
            `${imageCdnUrl}/${productImageUrlPart}/${LG_IMAGE_PATH}/${id}${IMAGE_EXTENSION}`,
    }
}

export default connect(mapStateToProps)
