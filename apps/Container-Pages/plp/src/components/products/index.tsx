import React, {useEffect} from "react"
import {TextModel} from "models/Text"
import Product from "../product"
import connect from "./connect"
import BackToTop from "../backToTop"
import ProductsHeader from "../productsHeader"
import {ProductItem} from "../../models/Product"
import {useCallbackRef} from "../../hooks/useCallbackRef"
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll"
import {useInitialScrollPosition} from "./useInitialScrollPosition"
import {useScrollPositionTracking} from "./useScrollPositionTracking"
import {publishProductSummaryHydrate} from "../../events/productSummaryHydrate"
import publishProductNumbersToMonetate from "../../events/publishProductNumbersToMonetate"
import SearchBanner from "../searchBanner"
import PublishProductSummaryTrackPage from "../../events/publishProductSummaryTrackPage"
import {handleBloomreachCategoryInfo} from "../../events/trackEvent/events/handleBloomreachCategoryInfo"
import {SeoLink} from "../SeoLink"
import {ConnectSpinner, ConnectPrevNextSpinner} from "../spinner"

import {ProductGrid, ProductsRoot, ProductGridItem, NoResultsContainer, ProductGridWrapper} from "./components"

export const productIdFor = (itemNumber: string) => `plp-product-summary-tile-${itemNumber}`

interface ProductsComponentProps {
    items: ProductItem[]
    endPage: number
    startPage: number
    itemsPerPage: number
    hasNextPage: boolean
    requestedPage: number
    hasPreviousPage: boolean
    isFetchingNextPage: boolean
    isFetchingPreviousPage: boolean
    isFetchingPageItems: boolean
    fetchPreviousPage: () => Promise<any>
    fetchNextPage: () => Promise<any>
    unfixFacets: VoidFunction
    fixFacets: VoidFunction
    siteUrl: string
    useDevEsi: boolean
    fetchTriggerOffset: number
    isAutocorrected: boolean
    hasSelectedFilters: boolean
    text: TextModel
    url: string
    searchCategoryId: string
    searchCategoryName: string
    pushSearchResultsEvent: () => void
}

export const Products = (props: ProductsComponentProps) => {
    const {
        items,
        endPage,
        startPage,
        itemsPerPage,
        hasNextPage,
        requestedPage,
        hasPreviousPage,
        isFetchingNextPage,
        isFetchingPreviousPage,
        isFetchingPageItems,
        fetchPreviousPage,
        fetchNextPage,
        unfixFacets,
        fixFacets,
        siteUrl,
        useDevEsi,
        fetchTriggerOffset,
        isAutocorrected,
        hasSelectedFilters,
        text,
        url,
        pushSearchResultsEvent,
        searchCategoryId,
        searchCategoryName,
    } = props

    const totalItems = items.length
    const [gridContainerElement, gridContainerRef] = useCallbackRef()

    useInfiniteScroll({
        endPage,
        startPage,
        totalItems,
        hasNextPage,
        itemsPerPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        fetchTriggerOffset,
        gridContainerElement,
        isFetchingNextPage,
        isFetchingPreviousPage,
        isFetchingPageItems,
        onBeforeFetchingPreviousPage: fixFacets,
        onAfterRestoringUpScrollPosition: unfixFacets,
    })

    useInitialScrollPosition({
        itemsPerPage,
        requestedPage,
        gridContainerElement,
        onWillRepositionScroll: fixFacets,
        onAfterScrollReposition: unfixFacets,
    })

    useScrollPositionTracking({
        startPage,
        itemsPerPage,
        gridContainerElement,
    })

    useEffect(() => {
        publishProductSummaryHydrate()
        publishProductNumbersToMonetate(items.map(item => item.itemNumber))
    }, [items])

    useEffect(() => {
        const ids = items.map(({itemNumber}, index) => ({
            itemNumber,
            index: (startPage - 1) * itemsPerPage + index,
        }))
        PublishProductSummaryTrackPage(ids)
        handleBloomreachCategoryInfo({id: searchCategoryId, name: searchCategoryName})
        pushSearchResultsEvent()
    }, [])

    return (
        <ProductsRoot>
            <ProductsHeader />
            {isFetchingPreviousPage && (
                <ConnectPrevNextSpinner
                    ariaValueText={text.labels.loadingPreviousPage}
                    testid="plp-previous-page-spinner"
                />
            )}
            {!isFetchingPageItems && <SearchBanner />}
            <SeoLink url={url} title={text.labels.previous} />
            <ProductGridWrapper
                className="plp-product-grid-wrapper"
                $largerTopPaddingDesktop={isAutocorrected && !hasSelectedFilters}
            >
                {!isFetchingPageItems && items.length === 0 && (
                    <NoResultsContainer data-testid="plp-no-results-container">
                        {text.pages.products.noResults}
                    </NoResultsContainer>
                )}
                {isFetchingPageItems && (
                    <ConnectSpinner
                        ariaValueText={text.labels.loadingProducts}
                        testid="plp-results-loading-page-spinner"
                    />
                )}
                <ProductGrid ref={gridContainerRef}>
                    {items.map((item, index) => (
                        <ProductGridItem
                            key={item.itemNumber}
                            data-testid="plp-product-grid-item"
                            data-index={(startPage - 1) * itemsPerPage + index}
                            id={productIdFor(item.itemNumber)}
                        >
                            <Product
                                itemNumber={item.itemNumber}
                                itemType={item.type}
                                newIn={item.newIn}
                                html={item.html}
                                siteUrl={siteUrl}
                                useDevEsi={useDevEsi}
                            />
                        </ProductGridItem>
                    ))}
                </ProductGrid>
            </ProductGridWrapper>
            <SeoLink url={url} hasNextPage={hasNextPage} title={text.labels.next} />
            {isFetchingNextPage && (
                <ConnectPrevNextSpinner ariaValueText={text.labels.loadingNextPage} testid="plp-next-page-spinner" />
            )}
            <BackToTop />
        </ProductsRoot>
    )
}

export default connect(Products)
