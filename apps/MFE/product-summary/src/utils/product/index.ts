import {formatTitle} from "../colourwayBuilders"
import State from "../../models/state"

export const getProductTitle = (state: State): string => {
    const {
        enabledSearchDesc,
        summaryData: {title, colourways, department, fit},
    } = state.productSummary
    const {isEnglishLang} = state.request

    const getColourways = colourways || []
    const selectedColourway = getColourways.find(colourway => colourway.selected)
    const formattedTitle: string = enabledSearchDesc
        ? selectedColourway?.title || ""
        : formatTitle({
              title,
              selectedColourway,
              fit,
              department,
              isMultipleColourways: getColourways.length > 1,
              isEnglishLang,
          })

    return formattedTitle
}
