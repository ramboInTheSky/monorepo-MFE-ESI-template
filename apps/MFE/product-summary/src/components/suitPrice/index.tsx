import React from "react"
import {formatTextTestIds} from "@monorepo/utils"
import {PriceLabel, PriceValue, PriceLink, Container, WasPriceValue, SalePriceValue, PriceContainer} from "./components"
import connect from "./connect"
import {TextModel} from "../../models/Text"

interface PriceProps {
    linkUrl: string
    tooltipTitle: string
    saleJacketPrice: string | null
    wasJacketPrice: string | null
    jacketPrice: string
    suitPrice: string
    wasSuitPrice: string | null
    saleSuitPrice: string | null
    trouserPrice: string
    wasTrouserPrice: string | null
    saleTrouserPrice: string | null
    text: TextModel
    jacketsHasSale: boolean
    trousersHasSale: boolean
}

export const SuitPrice = ({
    tooltipTitle,
    linkUrl,
    trouserPrice,
    wasTrouserPrice,
    saleTrouserPrice,
    suitPrice,
    wasSuitPrice,
    saleSuitPrice,
    jacketPrice,
    wasJacketPrice,
    saleJacketPrice,
    text,
    jacketsHasSale,
    trousersHasSale,
}: PriceProps) => {
    const wasSuitPriceText = `${text.price.was} ${wasSuitPrice}`
    const saleSuitPriceText = `${text.price.now} ${saleSuitPrice}`
    const wasTrouserPriceText = `${text.price.was} ${wasTrouserPrice}`
    const saleTrouserPriceText = `${text.price.now} ${saleTrouserPrice}`
    const wasJacketPriceText = `${text.price.was} ${wasJacketPrice}`
    const saleJacketPriceText = `${text.price.now} ${saleJacketPrice}`
    const suitsHasSale = jacketsHasSale || trousersHasSale

    return (
        <Container>
            <PriceLink
                href={linkUrl}
                title={tooltipTitle}
                variant="h5"
                data-testid={formatTextTestIds("suit_summary_suit_price")}
            >
                <PriceLabel>{text.labels.suitPrice}</PriceLabel>
                <PriceContainer>
                    {saleSuitPrice ? (
                        <>
                            <WasPriceValue data-testid={formatTextTestIds("was_suit_price")}>
                                {wasSuitPriceText}
                            </WasPriceValue>
                            <SalePriceValue data-testid={formatTextTestIds("sale_suit_price")}>
                                {saleSuitPriceText}
                            </SalePriceValue>
                        </>
                    ) : (
                        <PriceValue data-testid={formatTextTestIds("suit_price")}>{suitPrice}</PriceValue>
                    )}
                </PriceContainer>
            </PriceLink>
            {suitsHasSale && !saleSuitPrice && (
                <SalePriceValue data-testid={formatTextTestIds("suit_summary_suit_placeholder")}>&nbsp;</SalePriceValue>
            )}

            <PriceLink
                href={linkUrl}
                title={tooltipTitle}
                variant="h5"
                data-testid={formatTextTestIds("suit_summary_jacket_price")}
            >
                <PriceLabel>{text.labels.jacket}</PriceLabel>
                <PriceContainer>
                    {saleJacketPrice ? (
                        <>
                            <WasPriceValue data-testid={formatTextTestIds("was_jacket_price")}>
                                {wasJacketPriceText}
                            </WasPriceValue>
                            <SalePriceValue data-testid={formatTextTestIds("sale_jacket_price")}>
                                {saleJacketPriceText}
                            </SalePriceValue>
                        </>
                    ) : (
                        <PriceValue data-testid={formatTextTestIds("jacket_price")}>{jacketPrice}</PriceValue>
                    )}
                </PriceContainer>
            </PriceLink>
            {jacketsHasSale && !saleJacketPrice && <SalePriceValue>&nbsp;</SalePriceValue>}

            <PriceLink
                href={linkUrl}
                title={tooltipTitle}
                variant="h5"
                data-testid={formatTextTestIds("suit_summary_trouser_price")}
            >
                <PriceLabel>{text.labels.trousers}</PriceLabel>
                <PriceContainer>
                    {saleTrouserPrice ? (
                        <>
                            <WasPriceValue data-testid={formatTextTestIds("was_trouser_price")}>
                                {wasTrouserPriceText}
                            </WasPriceValue>
                            <SalePriceValue data-testid={formatTextTestIds("sale_trouser_price")}>
                                {saleTrouserPriceText}
                            </SalePriceValue>
                        </>
                    ) : (
                        <PriceValue data-testid={formatTextTestIds("trouser_price")}>{trouserPrice}</PriceValue>
                    )}
                </PriceContainer>
            </PriceLink>
            {trousersHasSale && !saleTrouserPrice && <SalePriceValue>&nbsp;</SalePriceValue>}
        </Container>
    )
}

export default connect(SuitPrice)
