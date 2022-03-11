import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export type ContainerProps = {
    isinternationalcountry: boolean
}

export const Container = styled.div<ContainerProps>`
    @media (min-width: ${breakpoints.values.md}px) {
        width: ${props => props.theme.styles.Checkout.md.width};
        height: ${props => props.theme.styles.Checkout.md.height};
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        width: ${props => props.theme.styles.Checkout.lg.width};
        height: ${props => props.theme.styles.Checkout.lg.height};
    }

    @media (min-width: ${breakpoints.values.xl}px) {
        width: ${props => (props.isinternationalcountry ? "10rem" : props.theme.styles.Checkout.xl.width)};
        height: ${props => props.theme.styles.Checkout.xl.height};
    }
`
