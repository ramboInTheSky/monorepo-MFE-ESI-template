import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const NavigationBar = styled.div`
    @media (max-width: ${breakpoints.values.md - 1}px) {
        display: none;
    }
`
