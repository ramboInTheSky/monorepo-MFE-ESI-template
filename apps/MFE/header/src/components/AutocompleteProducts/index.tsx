/* eslint-disable @typescript-eslint/camelcase */

import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import Typography from "@mui/material/Typography"
import connect from "./connect"
import {Ul, Li, Container, Div, Title, ProductDetailsContainer, ButtonContainer} from "./components"
import {AutoCompleteProducts} from "../../models/autocomplete"
import {ProductsMaxItemsData} from "../../models/features/searchBar"
import urls from "../../config/urls"
import {
    SEARCH_DATA_GA,
    HEADER_AUTOCOMPLETE_IMAGE_DATA_GA,
    HEADER_AUTOCOMPLETE_SEE_ALL_RESULTS_DATA_GA,
} from "../../config/constants"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

const {
    autoComplete: {
        images: {oldDirectoryName, newDirectoryName},
    },
} = urls

export type AutocompleteProductsProps = {
    products: AutoCompleteProducts[]
    term: string | any
    maxItems: ProductsMaxItemsData
    handleSuggestionClick: (suggestion: string) => void
    text: any
}

export const AutocompleteProducts = ({
    products,
    term,
    handleSuggestionClick,
    maxItems,
    text,
}: AutocompleteProductsProps) => (
    <Container>
        <span data-testid="header-autocomplete-products-title">
            {text.termTitle}
            <strong>&apos;{term}&apos;</strong>
        </span>
        <Ul data-testid="searchBar-products" maxitems={maxItems}>
            {products.map((product: AutoCompleteProducts) => {
                const {url, title, pid, sale_price, thumb_image} = product

                const newImagePath = thumb_image.replace(oldDirectoryName, newDirectoryName)
                return (
                    <Li key={pid} onClick={removeFromLocalStorage}>
                        <a
                            data-testid={formatTextTestIds(`header-autocomplete-product-${title}`)}
                            href={url}
                            data-ga-v1={SEARCH_DATA_GA}
                            data-ga-v2={term}
                            data-ga-v3={HEADER_AUTOCOMPLETE_IMAGE_DATA_GA}
                            data-ga-v4={title}
                        >
                            <img src={newImagePath} alt={title} />
                            <ProductDetailsContainer>
                                <Title variant="subtitle1">{title}</Title>
                                <Typography variant="h5">&pound;{sale_price}</Typography>
                            </ProductDetailsContainer>
                        </a>
                    </Li>
                )
            })}
        </Ul>
        <ButtonContainer>
            <Div
                data-testid="header-autocomplete-product-button"
                onClick={() => handleSuggestionClick(term)}
                data-ga-v1={SEARCH_DATA_GA}
                data-ga-v2={term}
                data-ga-v3={HEADER_AUTOCOMPLETE_SEE_ALL_RESULTS_DATA_GA}
            >
                {text.searchLinktext}
            </Div>
        </ButtonContainer>
    </Container>
)

export default connect(AutocompleteProducts)
