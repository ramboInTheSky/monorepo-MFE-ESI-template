import React, {FC, useCallback} from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {ColourChipListItem, ColourChipLink} from "./components"
import connect from "./connect"
import {isTouchDevice as getIsTouchDevice} from "../../utils/is-touch-device"
import {handleProductClick} from "../../events"

interface ColourChipProps {
    linkUrl: string
    isSelected: boolean
    setMatchingColourWay: () => void
    itemNumber: string
    src: string
    className?: string
    dataSrc?: string
    id: string
    title: string
    price: string
    colour: string
    currencyCode: string
    department: string
    altText: string
}

export const ColourChip: FC<ColourChipProps> = ({
    linkUrl,
    isSelected,
    setMatchingColourWay,
    itemNumber,
    src,
    className,
    dataSrc,
    id,
    title,
    price,
    colour,
    currencyCode,
    department,
    altText,
}) => {
    const isTouchDevice = getIsTouchDevice()

    const handleOnClick = useCallback(
        (e: React.MouseEvent) => {
            if (isTouchDevice && !isSelected) {
                setMatchingColourWay()
                e.preventDefault()
            } else {
                handleProductClick({id, title, price, colour, currencyCode, department})
            }
        },
        [isSelected, setMatchingColourWay, isTouchDevice, id, title, price, colour, currencyCode, department],
    )

    return (
        <ColourChipListItem className={isSelected ? "selected" : ""} onFocus={setMatchingColourWay}>
            <ColourChipLink title={colour} onClick={handleOnClick} href={linkUrl}>
                {isTouchDevice ? (
                    <img
                        src={src}
                        className={className}
                        data-src={dataSrc}
                        width="20"
                        height="20"
                        data-testid={formatTextTestIds(`product_summary_colourchip_${itemNumber}`)}
                        alt={altText}
                        onMouseEnter={setMatchingColourWay}
                    />
                ) : (
                    <img
                        src={src}
                        className={className}
                        data-src={dataSrc}
                        width="20"
                        height="20"
                        onMouseOver={setMatchingColourWay}
                        onFocus={setMatchingColourWay}
                        data-testid={formatTextTestIds(`product_summary_colourchip_${itemNumber}`)}
                        alt={altText}
                    />
                )}
            </ColourChipLink>
        </ColourChipListItem>
    )
}

export default connect(ColourChip)
