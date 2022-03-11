import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const NoResultsContainer = styled.div`
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.875rem;

    @media (min-width: ${breakpoints.values.md}px) {
        padding-left: 2rem;
        padding-right: 2rem;
        padding-top: 1.375rem;
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        padding-top: 1.625rem;
    }

    @media (min-width: ${breakpoints.values.xl}px) {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
        padding-top: 1.625rem;
    }
`

export const CategoryQuickLinksContainer = styled.div`
    width: 100%;
    padding-left: 1rem;
    margin-bottom: 50px;

    @media (min-width: ${breakpoints.values.md}px) {
        padding-left: 2rem;
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        padding-right: 2rem;
    }

    @media (min-width: ${breakpoints.values.xl}px) {
        padding-left: 2.5rem;
        padding-right: 2.5rem;
    }
`
