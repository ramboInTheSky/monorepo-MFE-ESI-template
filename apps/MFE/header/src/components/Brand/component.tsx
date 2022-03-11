import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Container = styled.div`
    margin: ${props => props.theme.styles.Brand.xs.margin};

    a,
    img {
        display: block;
        width: 100%;
        height: ${props => props.theme.styles.Brand.xs.height};
        width: ${props => props.theme.styles.Brand.xs.width};
        font-size: 0.9375rem;
        @media (min-width: ${breakpoints.values.md}px) {
            height: ${props => props.theme.styles.Brand.md.height};
            width: ${props => props.theme.styles.Brand.md.width};
        }

        @media (min-width: ${breakpoints.values.lg}px) {
            height: ${props => props.theme.styles.Brand.lg.height};
            width: ${props => props.theme.styles.Brand.lg.width};
            margin: ${props => props.theme.styles.Brand.lg.margin};
        }
    }
`
