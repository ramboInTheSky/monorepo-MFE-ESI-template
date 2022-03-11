import React, {useEffect} from "react"
import {formatPrice} from "@monorepo/utils"
import { TextModel } from "models/Text"
import {FacetPriceContainer, PriceLabel, PriceSliderLabel, StyledSlider} from "./components"
import connect from "./connect"

interface FiltersFeatsProps {
    min: number
    max: number
    selectedMin: number
    selectedMax: number
    locale: string
    realm: string
    currencyCode: string
    updatePriceFilters: (selectedMin: number, selectedMax: number) => void
    text: TextModel
}

function valuetext(value: number) {
    return `${value}`
}

const marks = (min: number, max: number, locale: string, currencyCode: string, realm: string) => [
    {
        value: min,
        label: formatPrice(min, min, currencyCode, locale, realm),
    },
    {
        value: max,
        label: formatPrice(max, max, currencyCode, locale, realm),
    },
]



export const FacetsPrice = ({
    min,
    max,
    selectedMin,
    selectedMax,
    updatePriceFilters,
    locale,
    realm,
    currencyCode,
    text
}: FiltersFeatsProps) => {
    const [value, setValue] = React.useState<number[]>([selectedMin ?? min, selectedMax ?? max])

    const handleChange = (_event: any, newValue: number | number[]) => {
        setValue(newValue as number[])
    }
    useEffect(() => {
        const newSelectedMax = selectedMax > max ? max : selectedMax
        const newSelectedMin = selectedMin < min ? min : selectedMin

        setValue([newSelectedMin, newSelectedMax])
    }, [min, selectedMin, max, selectedMax])

    const handleChangeCommited = (_event: any, newValue: number | number[]) => {
        if (newValue[0] !== selectedMin || newValue[1] !== selectedMax) {
            updatePriceFilters(newValue[0], newValue[1])
        }
    }

    const getAriaLabel = (idx: number) => {    
        const {ariaLabelMin, ariaLabelMax} = text.pages.filters.priceFilterAriaLabels
        switch (idx) {
            case 0:
                return ariaLabelMin
            case 1:
                return ariaLabelMax
            default:
                return ""
        }
    }
    
    
    return (
        <FacetPriceContainer>
            <PriceSliderLabel id="plp-price-slider" data-testid="plp-price-slider-label" gutterBottom>
                {text.pages.filters.priceRange}
                <PriceLabel> {formatPrice(value[0], value[1], currencyCode, locale, realm)}</PriceLabel>
            </PriceSliderLabel>
            <StyledSlider
                data-testid="plp-price-slider"
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommited}
                valueLabelDisplay="off"
                getAriaValueText={valuetext}
                step={10}
                marks={marks(min, max, locale, currencyCode, realm)}
                getAriaLabel={getAriaLabel}
            />
        </FacetPriceContainer>
    )
}
export default connect(FacetsPrice)
