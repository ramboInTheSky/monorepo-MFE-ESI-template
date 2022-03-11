import {formatTextTestIds} from "@monorepo/utils"
import React, {FC, useCallback} from "react"
import {useColourChipsLazyLoadImage} from "../../../../hooks/useLazyLoadImage"
import {ThumbImageWrapper, ThumbImage} from "../../components"

interface Props {
    id: string
    altText: string
    imageUrl: string
    setSelectedColourWay: (id: string) => void
}

export const ThumbColourChip: FC<Props> = ({id, imageUrl, altText, setSelectedColourWay}) => {
    const {imageProps} = useColourChipsLazyLoadImage(imageUrl, altText)
    const handleOnClick = useCallback(() => {
        setSelectedColourWay(id)
    }, [setSelectedColourWay, id])

    return (
        <ThumbImageWrapper
            onClick={handleOnClick}
            data-testid={formatTextTestIds(`product_summary_thumb_colourchip_${id}`)}
        >
            <ThumbImage {...imageProps} />
        </ThumbImageWrapper>
    )
}
