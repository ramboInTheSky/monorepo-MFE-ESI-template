import styled from "styled-components"
import {CardContent, Card, Typography} from "@mui/material"

export const TileCard = styled(Card)`
    width: 100%;
    height: auto;
    overflow: inherit;
`

export const TileCardContent = styled(CardContent)`
    padding: 0rem;
    position: relative;
    ${({ theme }) => theme.enablingCenteredContent && `
        text-align: center;
  `}
`
export const ImageContainer = styled.div`
    position: relative;
`

export const TileCardBrandNameWrapper = styled.a`
    min-height: 1.125rem;
    display: inline-block;
    vertical-align: top;
    margin-top: 0.05rem;
`

export const TileCardBrandName = styled(Typography)`
    font-size: 1rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    font-weight: ${({theme}) => theme.colours.font.primary.medium.weight};
    text-transform: uppercase;
`
