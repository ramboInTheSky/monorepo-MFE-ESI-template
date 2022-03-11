import styled from "styled-components"
import Typography from "@mui/material/Typography"

export const MiniShoppingBagContainer = styled.div`
    color: ${({theme}) => theme.colours.text.default};
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colours.popover.backgroundColour};
    border-radius: 0.25rem;
    width: ${props => props.theme.styles.ShoppingBag.md.width};
`
export const MiniShoppingBagPriceWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    border-bottom: ${props => props.theme.colours.utilities.dividerDark};
    background-color: ${({theme}) => theme.colours.popover.backgroundColour};
`
export const ItemCountWrapper = styled(Typography)`
    && {
        padding: 0.75rem 1rem;
        border-bottom: ${({theme: {colours}}) => colours.utilities.dividerDark};
        background-color: inherit;
        text-transform: ${({theme: {styles}}) => styles.MiniShoppingBagItemCount?.xs.textTransform};
        border-bottom: ${({theme: {styles}}) => styles.MiniShoppingBagItemCount?.xs.borderBottom};
    }
`

export const EmptyBagWrapper = styled.div`
    height: 4.313rem;
    background-color: ${props => props.theme.colours.utilities.backgroundAccent};
    border-bottom: ${props => props.theme.colours.utilities.divider};
    align-items: center;
    justify-content: center;
    display: flex;
`
export const ActionWrapper = styled.div`
    width: 100%;
    display: flex;
    overflow: hidden;
    align-items: center;
    padding: 15px;
    border-top: 1px solid #eaeaea;
    && > a {
        :first-child {
            margin-right: 1rem;
        }
    }
`
export const CartItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
`
