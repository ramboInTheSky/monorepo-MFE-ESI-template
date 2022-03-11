import React, {FC} from "react"
import {formatPrice} from "@monorepo/utils"

import {connector, PropsFromRedux} from "./connect"
import {FacetName, FacetList} from "./components"

interface Props extends PropsFromRedux {
    locale: string
    realm: string
    text
}

export const CollaspedPriceFilter: FC<Props> = ({priceFilter, locale, realm, text}) => (
    <>
        <FacetName variant="h5" data-testid="plp-collasped-price-name">
            {priceFilter.name}:
        </FacetName>
        <FacetList data-testid="plp-collasped-price-info">
            {text.pages.collaspedFilters.from}{" "}
            {formatPrice(priceFilter.selectedMin, priceFilter.selectedMax, priceFilter.currencyCode, locale, realm)}
        </FacetList>
    </>
)

export default connector(CollaspedPriceFilter)
