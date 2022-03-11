import {ColourwayData, SummaryType} from "../../models/searchApi"
import {DEPARTMENT_MENSWEAR, DEPARTMENT_HOMEWARE, ProductType, SuitType} from "../../config/constants"

export const formatTooltipTitle = (
    title: string,
    colourwayItemNumber: string,
    price: string,
    salePrice: string | null,
) => `${title} (${colourwayItemNumber}) | ${salePrice ?? price}`

export const formatPdpLink = (baseUrl: string, colourwayUrl: string) => `${baseUrl}/${colourwayUrl}`.toLowerCase()

interface FormatTitleOptions {
    title: string
    department: string
    selectedColourway: ColourwayData | undefined
    fit?: string | null
    isMultipleColourways: boolean
    isEnglishLang: boolean
}

export const formatTitle = ({
    title,
    department = "",
    fit = "",
    selectedColourway,
    isMultipleColourways,
    isEnglishLang,
}: FormatTitleOptions): string => {
    const lowercaseDept = department?.toLowerCase()
    let fitValue
    let colourValue
    const titleValue = title || ""

    if (!isEnglishLang) {
        fitValue = fit && lowercaseDept === DEPARTMENT_MENSWEAR ? `${fit} - ` : ""
        colourValue = (selectedColourway?.colour && `${selectedColourway?.colour} - `) || ""
    } else {
        fitValue = fit && lowercaseDept === DEPARTMENT_MENSWEAR ? `${fit} ` : ""
        colourValue = (selectedColourway?.colour && `${selectedColourway?.colour} `) || ""
    }

    let returnTitle = titleValue

    if (lowercaseDept !== DEPARTMENT_HOMEWARE && !isMultipleColourways) {
        returnTitle = `${fitValue}${titleValue}`
    }

    if (lowercaseDept !== DEPARTMENT_HOMEWARE && isMultipleColourways) {
        returnTitle = `${colourValue}${fitValue}${titleValue}`
    }

    return returnTitle
}

interface FormatSuitTitleParams {
    defaultTitle: string
    title?: string
    selectedColourway: ColourwayData | undefined
    fit?: string | null
    isEnglishLang: boolean
}

export const formatSuitTitle = ({
    title,
    defaultTitle,
    fit,
    selectedColourway,
    isEnglishLang,
}: FormatSuitTitleParams): string => {
    let fitValue = ""
    let colourValue = ""

    const titleValue = defaultTitle.split(":")[0] || ""

    if (!isEnglishLang) {
        fitValue = fit ? `${fit} - ` : ""
        colourValue = (selectedColourway?.colour && `${selectedColourway?.colour} - `) || ""
    } else {
        if (title) return title.split(":")[0]
        return defaultTitle.split(":")[0]
    }
    return `${colourValue}${fitValue}${titleValue}`
}

interface FormatSuitTooltipTitleParams extends FormatSuitTitleParams {
    colourwayItemNumber: string
    price: string
    salePrice: string | null
}

export const formatSuitTooltipTitle = ({
    title,
    defaultTitle,
    colourwayItemNumber,
    price,
    salePrice,
    fit,
    selectedColourway,
    isEnglishLang,
}: FormatSuitTooltipTitleParams): string => {
    return formatTooltipTitle(
        formatSuitTitle({title, defaultTitle, fit, selectedColourway, isEnglishLang}),
        colourwayItemNumber,
        price,
        salePrice,
    )
}

export function getToolTipTitleByType(
    type: SummaryType,
    {title, defaultTitle, colourwayItemNumber, price, salePrice, fit, selectedColourway, isEnglishLang},
) {
    switch (type) {
        case SuitType:
            return formatSuitTooltipTitle({
                title,
                defaultTitle,
                colourwayItemNumber,
                price,
                salePrice,
                fit,
                selectedColourway,
                isEnglishLang,
            })
        case ProductType:
            return formatTooltipTitle(defaultTitle, colourwayItemNumber, price, salePrice)
        default:
            return formatTooltipTitle(defaultTitle, colourwayItemNumber, price, salePrice)
    }
}
