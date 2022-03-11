import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {Grid, Typography} from "@mui/material"
import {TextModel} from "models/Text"
import {SearchApiRequestTypes} from "../../config/constants"
import {
    StyledProductTitle,
    StyledCount,
    StyledNoResultsFound,
    StyledTextWrapper,
    StyledSecondaryText,
    StyledCapitalizedText,
    SearchBannerChevronContainer,
} from "./components"
import connect from "./connect"
import SearchBannerChevron from "../searchBannerChevron"
import FadeInAnimation from "../fadeInAnimation"
import {useSearchBannerLoaded} from "../../hooks/useSearchBannerLoaded"
import SeoHeading from "../seoHeading"

interface ResultsTitleProps {
    type: SearchApiRequestTypes
    title: string
    relaxedQuery: string
    totalResults: number
    isAutocorrected: boolean
    originalSearchTerm: string | null
    hasSelectedFilters: boolean
    searchBannerHtml: string | null
    overrideHeading: boolean
    text: TextModel
}

export const ResultsTitle = ({
    type,
    title,
    relaxedQuery,
    totalResults,
    isAutocorrected,
    originalSearchTerm,
    hasSelectedFilters,
    searchBannerHtml,
    overrideHeading,
    text,
}: ResultsTitleProps) => {
    const searchBannerTextLoaded = useSearchBannerLoaded(searchBannerHtml)

    return (
        <StyledProductTitle data-testid={formatTextTestIds("plp-results-title-wrapper")}>
            <Grid container alignItems="center">
                <Grid
                    item
                    zeroMinWidth
                    xs={10}
                    id="plp-results-title-container"
                    data-default-title={title}
                    data-testid="plp-results-title-container"
                >
                    {(!isAutocorrected || hasSelectedFilters) && (
                        <>
                            {type === SearchApiRequestTypes.Keyword && relaxedQuery !== "" && hasSelectedFilters && (
                                <h1
                                    data-testid={formatTextTestIds("plp-results-title")}
                                    title={`"${relaxedQuery}" (${totalResults})`}
                                >
                                    <StyledTextWrapper data-testid="plp-product-title-text">
                                        &quot;{relaxedQuery}&quot;
                                    </StyledTextWrapper>
                                    <StyledCount>&nbsp;({totalResults})</StyledCount>
                                </h1>
                            )}
                            {type === SearchApiRequestTypes.Keyword && relaxedQuery !== "" && !hasSelectedFilters && (
                                <>
                                    <h1 data-testid={formatTextTestIds("plp-results-title")}>
                                        <StyledTextWrapper data-testid="plp-product-title-text">
                                            {text.pages.products.showingResultsNearestMatches}
                                        </StyledTextWrapper>
                                    </h1>
                                    <StyledNoResultsFound data-testid={formatTextTestIds("plp-no-results-text")}>
                                        &nbsp;{text.pages.products.zeroResultsFor} &quot;{title}&quot;
                                    </StyledNoResultsFound>
                                </>
                            )}
                            {type === SearchApiRequestTypes.Keyword && relaxedQuery === "" && (
                                <h1 data-testid={formatTextTestIds("plp-results-title")}>
                                    <StyledTextWrapper data-testid="plp-product-title-text">
                                        &quot;{title}&quot;
                                    </StyledTextWrapper>
                                    <StyledCount>&nbsp;({totalResults})</StyledCount>
                                </h1>
                            )}
                            {type === SearchApiRequestTypes.Category && (
                                <StyledTextWrapper data-testid="plp-product-title">
                                    {overrideHeading ? (
                                        <SeoHeading />
                                    ) : (
                                        <h1>
                                            {totalResults} {title}
                                        </h1>
                                    )}
                                </StyledTextWrapper>
                            )}
                        </>
                    )}

                    {isAutocorrected && !hasSelectedFilters && (
                        <>
                            <Typography
                                variant="h3"
                                data-testid={formatTextTestIds("plp-results-title")}
                                title={`${text.pages.products.showingResultsFor} "${title}"`}
                            >
                                {text.pages.products.showingResultsFor}
                                &nbsp;<StyledCapitalizedText>&quot;{title}&quot;</StyledCapitalizedText>
                                &nbsp;
                                <StyledCount>({totalResults})</StyledCount>
                            </Typography>
                            <StyledSecondaryText data-testid={formatTextTestIds("plp-no-results-text")}>
                                {text.pages.products.zeroResultsFor} &quot;{originalSearchTerm}&quot;
                            </StyledSecondaryText>
                        </>
                    )}
                </Grid>
                <SearchBannerChevronContainer item xs={2} data-testid="plp-search-banner-chevron-container">
                    <FadeInAnimation timeout={300} show={searchBannerTextLoaded}>
                        <SearchBannerChevron />
                    </FadeInAnimation>
                </SearchBannerChevronContainer>
            </Grid>
        </StyledProductTitle>
    )
}

export default connect(ResultsTitle)
