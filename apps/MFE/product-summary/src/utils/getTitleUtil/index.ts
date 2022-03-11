import {formatTitle} from "../colourwayBuilders"
import {ColourwayData} from "../../models/searchApi"
import {SuitColourwayData} from "../../models/searchApi/suit"

interface GetTitleProps {
    enabledSearchDesc: boolean
    title: string
    selectedColourway: ColourwayData | undefined
    fit: string | null | undefined
    department: string
    colourways: ColourwayData[] | SuitColourwayData[]
    isEnglishLang: boolean
}

const getTitleUtil = ({enabledSearchDesc, title, selectedColourway, fit, department, colourways, isEnglishLang}: GetTitleProps) => {
    return enabledSearchDesc
        ? selectedColourway?.title || ""
        : formatTitle({
              title,
              selectedColourway,
              fit,
              department,
              isMultipleColourways: colourways.length > 1,
              isEnglishLang,
          })
}

export default getTitleUtil
