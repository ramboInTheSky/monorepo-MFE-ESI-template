import React, {useState} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import connect from "./connect"
import ColourChip from "../colourchip"
import {ColourChipsList, ColourChipCollapse, ColourChipsContainer, ColourChipViewButtonContainer} from "./components"
import env from "../../config/env"
import {
    COLOURCHIP_GREY_PLACEHOLDER_URL,
    LAZY_SIZES_CLASSNAME,
    SHOW_INITIAL_COLOURCHIPS,
    COLOURCHIP_UNEXPANDED_HEIGHT,
} from "../../config/constants"
import {usePreloadImages} from "../../hooks/usePreloadImages"
import {TextModel} from "../../models/Text"

interface ColourChip {
    itemNumber: string
    colourChipUrl: string
    linkUrl: string
    isSelected: boolean
    colour: string
    title: string
    price: string
    currencyCode: string
    altText: string
    department: string
}

interface ColourChipsProps {
    colourchips?: ColourChip[]
    lazyloadColourchips?: boolean
    colourWayImageUrlBuilder: (val: string) => string
    text: TextModel
}

export interface ImageProps {
    src: string
    className?: string
    "data-src"?: string
}

const RenderColourChip = ({list, lazyloadColourchips, text}) => {
    return list.map(
        (
            {
                itemNumber,
                linkUrl,
                isSelected,
                colour,
                colourChipUrl,
                title,
                price,
                currencyCode,
                altText,
                department,
            }: ColourChip,
            index: number,
        ) => {
            const lazyLoad = lazyloadColourchips && index + 1 <= SHOW_INITIAL_COLOURCHIPS
            return (
                <ColourChip
                    src={lazyLoad ? `${env.REACT_APP_CDN_BASEURL}${COLOURCHIP_GREY_PLACEHOLDER_URL}` : colourChipUrl}
                    dataSrc={lazyLoad ? colourChipUrl : ""}
                    className={lazyLoad ? LAZY_SIZES_CLASSNAME : ""}
                    key={itemNumber}
                    linkUrl={linkUrl}
                    isSelected={isSelected}
                    itemNumber={itemNumber}
                    colour={colour}
                    id={itemNumber}
                    title={title}
                    price={price}
                    currencyCode={currencyCode}
                    altText={altText}
                    text={text}
                    department={department}
                />
            )
        },
    )
}

const ViewMoreButton = ({isOpen, triggerShowMore, siteText}) => {
    return (
        <ColourChipViewButtonContainer onClick={triggerShowMore}>
            <button type="button" data-testid={formatTextTestIds(`product_summary_colourchips_view_more_button`)}>
                <span>{isOpen ? siteText.buttons.viewLessColourchips : siteText.buttons.viewMoreColourchips}</span>
                <img
                    src={`${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/chevron${isOpen ? "-up" : ""}.svg`}
                    alt={siteText.buttons.chevronAlt}
                />
            </button>
        </ColourChipViewButtonContainer>
    )
}

export const ColourChips = ({colourchips, lazyloadColourchips, colourWayImageUrlBuilder, text}: ColourChipsProps) => {
    const [isViewMoreOpen, setIsViewMoreOpen] = useState(false)

    const preloadImages = usePreloadImages()

    if (!colourchips || colourchips.length <= 1) return null

    const showViewMore = colourchips?.length > SHOW_INITIAL_COLOURCHIPS

    let showNumberOfColourChips = colourchips?.slice(0, SHOW_INITIAL_COLOURCHIPS)
    if (isViewMoreOpen) showNumberOfColourChips = colourchips

    const triggerShowMore = () => {
        preloadImages(
            colourchips.slice(SHOW_INITIAL_COLOURCHIPS).map(chip => colourWayImageUrlBuilder(chip.itemNumber)),
        )
        setIsViewMoreOpen(!isViewMoreOpen)
    }

    return (
        <ColourChipsContainer>
            <ColourChipCollapse
                in={isViewMoreOpen}
                data-testid={formatTextTestIds(`product_summary_colourchips_collapse_wrapper`)}
                collapsedSize={COLOURCHIP_UNEXPANDED_HEIGHT}
                timeout={(colourchips?.length / 9 + 1) * 100}
            >
                <ColourChipsList data-testid={formatTextTestIds(`product_summary_colourchips`)}>
                    <RenderColourChip
                        list={showNumberOfColourChips}
                        lazyloadColourchips={lazyloadColourchips}
                        text={text}
                    />
                </ColourChipsList>
            </ColourChipCollapse>
            {showViewMore && (
                <ViewMoreButton isOpen={isViewMoreOpen} triggerShowMore={triggerShowMore} siteText={text} />
            )}
        </ColourChipsContainer>
    )
}

export default connect(ColourChips)
