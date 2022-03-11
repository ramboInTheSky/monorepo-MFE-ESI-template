import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {TileTitle} from "./components"
import connect from "./connect"
import {handleProductClick} from "../../events"

interface ColourwayBodyProps {
    linkUrl: string
    title: string
    tooltipTitle: string
    id: string
    price: string
    colour: string
    currencyCode: string
    department: string
}

export const ColourwayTitle = ({
    title,
    linkUrl,
    tooltipTitle,
    id,
    price,
    colour,
    currencyCode,
    department,
}: ColourwayBodyProps) => {
    return (
        <TileTitle
            variant="body1"
            href={linkUrl}
            title={tooltipTitle}
            data-testid={formatTextTestIds(`product_summary_title`)}
            data-label={title}
            data-desc={title}
            data-usespan="False"
            onClick={() => {
                handleProductClick({id, title, price, colour, currencyCode, department})
            }}
        >
            {title}
        </TileTitle>
    )
}

export default connect(ColourwayTitle)
