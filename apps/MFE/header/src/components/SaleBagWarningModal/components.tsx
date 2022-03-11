import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background: ${props => props.theme.colours.header.navUpperBackground.color};
    color: ${props => props.theme.colours.text.default};
    padding: 1.375rem 1.5rem;
    width: 90%;
    min-height: 16.625rem;
    @media (min-width: ${breakpoints.values.md}px) {
        min-height: 12.5rem;
        width: 80%;
    }
    @media (min-width: ${breakpoints.values.lg}px) {
        width: 55%;
    }
`

export const ButtonContainer = styled.div`
    height: 2.75rem;
    button:first-child {
        margin-bottom: 0.75rem;
    }

    @media (min-width: ${breakpoints.values.md}px) {
        float: right;
        width: 90%;
        display: flex;
        margin-top: 0.5rem;

        button:first-child {
            margin-right: 1rem;
            margin-bottom: 0;
        }
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        height: 2.25rem;
        width: 80%;
    }
`
