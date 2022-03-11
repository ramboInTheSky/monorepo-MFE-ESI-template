import styled from "styled-components"

export const Image = styled.img`
    height: ${props => props.theme.styles.ShoppingBag.productImage.lg.height};
    width: ${props => props.theme.styles.ShoppingBag.productImage.lg.width};
`

export const ImageWrapper = styled.div`
    padding: 1rem;
`
