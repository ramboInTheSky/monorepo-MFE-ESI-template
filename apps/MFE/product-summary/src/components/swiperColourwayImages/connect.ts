import {connect} from "react-redux"
import State from "../../models/state"
import {formatPdpLink, getToolTipTitleByType, formatTitle} from "../../utils/colourwayBuilders"
import {getShowFitIconsByType} from "../../utils/getShowFitIconsByType"
import {selectPriceType} from "../../utils/priceFormatter/selectPriceType"
import {ColourwayData} from "../../models/searchApi"
import { SuitType } from "../../config/constants"

export const mapStateToProps = (state: State) => {
    const {
        productSummary: {
            summaryData: {
                title: defaultTitle,
                colourways,
                baseUrl,
                showNewIn,
                saleSashPosition,
                type,
                fit,
                department,
                currencyCode,
            },
            enabledSearchDesc,
        },
        lazyload,
        request: {isEnglishLang},
        text,
    } = state
    let currentSlideIndex = 0
    const thumbsGallery: {id: string; imageUrl: string; altText: string}[] = []
    let textTitle = ""

    const slides = (colourways as ColourwayData[]).map((colourway, index) => {
        if (colourway.selected) {
            currentSlideIndex = index

            const selectedColourway = colourways[index]

            textTitle = enabledSearchDesc
                ? selectedColourway?.title || ""
                : formatTitle({
                    title: defaultTitle,
                    selectedColourway,
                    fit,
                    department,
                    isMultipleColourways: colourways.length > 1,
                    isEnglishLang,
                })
        }
        const {id, title, price, url, salePrice} = colourway

        thumbsGallery.push({
            id: colourway.id,
            imageUrl: colourway.colourChipImage,
            altText: textTitle,
        })

        return {
            id,
            imageUrl: colourway.mainImage,
            tooltipTitle: getToolTipTitleByType(type, {
                title,
                defaultTitle: type === SuitType ? defaultTitle : textTitle,
                colourwayItemNumber: id,
                price,
                salePrice,
                fit,
                selectedColourway: colourway,
                isEnglishLang,
            }),
            linkUrl: formatPdpLink(baseUrl, url),
            lazyloadProductImages: lazyload.productImages,
            textTitle,
            colour: colourway.colour,
            price: selectPriceType(price, salePrice),
            currencyCode,
            department,

            text,
        }
    })

    const selectedColourway = colourways[currentSlideIndex]
    const isOnSale = selectedColourway?.salePrice !== null
    const displayNewIn = currentSlideIndex === 0 && showNewIn && !isOnSale

    const getTitle: string = enabledSearchDesc
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
        thumbsGallery,
        displayNewIn,
        fits: selectedColourway?.fits,
        isOnSale,
        showFitsIcons: getShowFitIconsByType(type, {isOnSale, saleSashPosition}),
        slides,
        currentSlideIndex,
        lazyloadProductImages: lazyload.productImages,
        textTitle: getTitle,
        colour: selectedColourway.colour,
        price: selectPriceType(selectedColourway.price, selectedColourway.salePrice),
        currencyCode,
        text,
    }
}

export default connect(mapStateToProps)
