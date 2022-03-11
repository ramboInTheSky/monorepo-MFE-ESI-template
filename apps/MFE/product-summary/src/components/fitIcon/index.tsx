import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import connect from "./connect"
import {Fits, FitsIcons, LAZY_SIZES_CLASSNAME, FIT_ICON_PLACEHOLDER_URL} from "../../config/constants"
import env from "../../config/env"
import {StyledImage, FitsContainer} from "./components"
import {TextModel} from "../../models/Text"

interface FitIconsProps {
    fits?: Fits[]
    isLazyloadFitIcons?: boolean
    text: TextModel
}

interface FitIconProps {
    fit: Fits
    isLazyloadFitIcons?: boolean
    text: TextModel
}

const FitIcon = ({fit, isLazyloadFitIcons = false, text}: FitIconProps) => {
    const getImageAttr = imageAttr(isLazyloadFitIcons, fit, text)
    return <StyledImage {...getImageAttr} />
}

export const FitIcons = ({fits, isLazyloadFitIcons, text}: FitIconsProps) => {
    if (!fits || fits.length <= 0) {
        return null
    }

    return (
        <FitsContainer>
            {fits.map(fit => (
                <FitIcon key={fit} fit={fit} isLazyloadFitIcons={isLazyloadFitIcons} text={text} />
            ))}
        </FitsContainer>
    )
}

type ImgAttr = {
    src: string
    "data-testid": string
    "data-src"?: string
    className?: string
    alt: string
}

const imageAttr = (lazyloadFitIcons: boolean, fit: string, text): ImgAttr => {
    const testId = formatTextTestIds(`product_summary_fit_icon_${fit}`)
    const src = `${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/${FitsIcons[fit]}`
    const placeholder = `${env.REACT_APP_BLOB_STORAGE_PATH}${FIT_ICON_PLACEHOLDER_URL}`
    const alt = `${text.fitIconAltText} ${fit}`

    const lazyloadAttr: ImgAttr = {
        "data-testid": testId,
        "data-src": src,
        src: placeholder,
        className: LAZY_SIZES_CLASSNAME,
        alt,
    }
    const defaultAttr: ImgAttr = {
        "data-testid": testId,
        src,
        alt,
    }

    return lazyloadFitIcons ? lazyloadAttr : defaultAttr
}

export default connect(FitIcons)
