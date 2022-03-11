import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const ChevronContainer = styled.div`
    @media (min-width: ${breakpoints.values.md}px) {
        display: none;
    }
`

interface ChevronProps {
    isOpen: boolean
}

export const Chevron = styled.img<ChevronProps>`
    display: inline;
    cursor: pointer;
    transform: ${props => (props.isOpen ? "rotate(-180deg)" : "rotate(0deg)")};
    transition-duration: 500ms;
    margin-bottom: 0.2rem;
`
