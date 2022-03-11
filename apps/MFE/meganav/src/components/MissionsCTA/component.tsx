import styled from "styled-components"
import {LTR} from "../../config/constants"

export const Container = styled.div`
    display: flex;
    justify-content: flex-end;

    && a {
        white-space: nowrap;
        padding: 0.4375rem 1rem;
        color: ${props => props.theme.colours.form.buttonSecondary.color};
        background: ${props => props.theme.colours.form.default.background};
        border: ${props => props.theme.colours.form.default.border};
        border-radius: 1.375rem;
    }
`

interface ImageProps {
    alignment: string
}

export const Image = styled.img<ImageProps>`
    transform: ${({alignment}) => (alignment === LTR ? "rotate(-90deg)" : "rotate(90deg)")};
    margin-left: 1rem;
`

// FIXME replace border-radius for anchor tag with actual value border-radius: ${props => props.theme.colours.form.default.radius};
