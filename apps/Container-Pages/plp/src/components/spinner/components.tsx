import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const LoadingIconPrevNextPageContainer = styled.div`
    flex: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    margin: 2rem 0;
    img {
        width: 3rem;
        height: 3rem;
    }
`

export const LoadingIconContainer = styled.div`
    z-index: 1;
    position: fixed;
    margin: 0;
    height: 100vh;
    background: white;
    display: flex;
    width: 985px;
    @media (max-width: ${breakpoints.values.xl}px) {
        width: 80vw;
    }

    @media (max-width: ${props =>
            `${breakpoints.values[props.theme.dimensions.plpStyleConfig.inPageFiltersBreakpoint] - 1}px`}) {
        width: 100vw;
        left: 0;
    }

    align-items: center;
    justify-content: center;

    img {
        margin-top: -60vh;
        width: 3rem;
        height: 3rem;
    }
`
