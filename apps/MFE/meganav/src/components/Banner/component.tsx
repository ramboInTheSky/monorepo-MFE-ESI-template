import styled from "styled-components"

import {breakpoints} from "@monorepo/themes"

export const Container = styled.div`
    height: 4rem;
    text-align: center;
    height: 6.25rem;
    @media (min-width: ${breakpoints.values.lg}px) {
        height: 2.5rem;
    }
    a,
    img {
        width: 100%;
        height: 100%;
    }
`
