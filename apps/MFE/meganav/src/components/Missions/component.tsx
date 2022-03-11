import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Container = styled.div`
    background: ${props => props.theme.colours.text.reversed};
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: ${props => props.theme.dimensions.Missions.Container.xs.padding};
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 4rem;
    @media (min-width: ${breakpoints.values.md}px) {
        width: ${props => props.theme.dimensions.Missions.Container.md.width};
        padding-bottom: 2rem;
        background: ${props => props.theme.colours.utilities.backgroundAccent};
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        width: ${props => props.theme.dimensions.Missions.Container.lg.width};
    }
    @media (min-width: ${breakpoints.values.xl}px) {
        width: ${props => props.theme.dimensions.Missions.Container.xl.width};
    }
`
