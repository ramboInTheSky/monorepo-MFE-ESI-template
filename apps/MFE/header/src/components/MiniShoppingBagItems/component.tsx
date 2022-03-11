import styled from "styled-components"

export const MiniShoppingBagContainer = styled.div`
    color: ${({theme}) => theme.colours.text.default};
    display: flex;
    flex-direction: column;
    border-radius: 0.25rem;
    background-color: ${({theme}) => theme.colours.popover.backgroundColour};
`
export const PriceWrapperItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    font-family: ${props => `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
    font-size: 0.875rem;
    padding-top: ${props => props.theme.styles.ShoppingBag?.priceWrapper?.xs.paddingTop};
    padding-bottom: ${props => props.theme.styles.ShoppingBag?.priceWrapper?.xs.paddingBottom};
`

export const PromotionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem 0 1rem;
`

export const StandardDeliveryContainer = styled.div`
    font-size: 0.75rem;
    padding: 0 1rem 0.5rem 1.125rem;
    border-bottom: ${props => props.theme.colours.utilities.dividerDark};
    && > p {
        font-size: 0.75rem;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: 0.0075rem;
        word-break: break-all;
    }
`
export const Block = styled.span`
    display: block;
`

export const ItemsContainer = styled.div`
    min-width: 100%;
    overflow-y: auto;

    > div:first-child {
        border-top: 0;
    }
    -ms-overflow-style: auto;
    scrollbar-width: auto;
    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 0.475rem;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 0.25rem;
        background-color: rgba(0, 0, 0, 0.5);
        box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
    }

    max-width: 19.875rem;
    max-height: ${props => props.theme.styles.ShoppingBag.itemsContainer.lg.maxHeight};

    border-bottom: ${props => props.theme.colours.utilities.divider};
    background-color: ${props => props.theme.colours.utilities.backgroundAccent};
`
