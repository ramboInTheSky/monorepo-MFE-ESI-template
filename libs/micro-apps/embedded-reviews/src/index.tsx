import React from "react"
import {
    ReviewPanelContainer,
    ReviewTitleContainer,
    ReviewProviderLogoContainer,
    ReviewSummaryContainer,
} from "./component"
import text from "./config/text"

interface EmbeddedReviewProps {
    /**
     * This is the realm where the panel will be rendered, i.e. amido
     */
     realm: string
    /**
     * The name of the Review provider, i.e. Feefo
     */
    reviewProvider: string
    /**
     * This is the Review provider image that is displayed inside the panel
     */
    reviewProviderImagePath: string
}

export const EmbeddedReviews = ({realm, reviewProvider, reviewProviderImagePath}: EmbeddedReviewProps) => {
    return (
        <ReviewPanelContainer container alignItems="center" data-testid="review-panel-container">
            <ReviewTitleContainer item xs={6} data-testid="review-title-container">
                {text.panel.title}
            </ReviewTitleContainer>

            <ReviewProviderLogoContainer item xs={6} data-testid="review-provider-logo-container">
                <img
                    src={reviewProviderImagePath}
                    alt={`${reviewProvider} ${text.logo.imageAlt} ${realm}`}
                />
            </ReviewProviderLogoContainer>

            <ReviewSummaryContainer item xs={12} data-testid="review-summary-container">
                {text.summary.noReviews}
            </ReviewSummaryContainer>
        </ReviewPanelContainer>
    )
}
