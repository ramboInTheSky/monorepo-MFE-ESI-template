import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Container = styled.nav`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    max-width: ${breakpoints.values.xl}px;
    padding: ${props => props.theme.dimensions.SecondaryNav.xs.padding};
    @media (min-width: ${breakpoints.values.md}px) {
        height: 100%;
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        min-height: 30rem;
        max-height: calc(100vh - 7rem);
        overflow-y: hidden;
        padding: ${props => props.theme.dimensions.SecondaryNav.lg.padding};
    }
    @media (min-width: ${breakpoints.values.xl}px) {
        padding: ${props => props.theme.dimensions.SecondaryNav.xl.padding};
    }
`

type CatalogueContainer = {
    hasMissions: boolean
    hasBanner: boolean
}

export const CatalogueContainer = styled.section<CatalogueContainer>`
    width: 100%;
    height: 100%;
    display: block;
    padding-bottom: ${({hasMissions}) => (hasMissions ? 0 : "3rem")};
    margin-bottom: ${({hasBanner}) => (hasBanner ? "3rem" : 0)};

    > div {
        overflow-y: hidden;
    }

    @media (min-width: ${breakpoints.values.md}px) {
        padding-bottom: 3rem;
        margin-bottom: 0;

        > div {
            overflow-y: auto;
        }
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        padding-bottom: 0;
    }
`

export const MissionsContainer = styled.section`
    display: flex;
    margin-bottom: 3rem;
    @media (min-width: ${breakpoints.values.md}px) {
        margin-bottom: 0;
        height: auto;
        min-height: calc(100vh - 2.75rem);
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        min-height: 30rem;
    }
`

export const CatalogueAndMissionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    background-color: #ffffff;
    @supports (-webkit-touch-callout: none) {
        padding-bottom: 4rem;
    }
    @media (min-width: ${breakpoints.values.md}px) {
        flex-direction: row;
        overflow-y: hidden;
        padding-bottom: 0;
    }
`
