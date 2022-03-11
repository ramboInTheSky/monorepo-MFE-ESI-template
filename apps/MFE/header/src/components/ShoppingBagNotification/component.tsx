import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"
import Typography from "@mui/material/Typography"

export const Container = styled.div`
    color: ${({theme}) => theme.colours.text.default};
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.colours.popover.backgroundColour || "white"};
    border-radius: 0.25rem;
    width: 20rem;
    @media (max-width: ${breakpoints.values.md - 1}px) {
        width: 18rem;
    }
`

export const NotificationMessage = styled(Typography)`
    && {
        padding: 0.8125rem 1.1875rem 0.75rem 1rem;
        width: 16rem;
        @media (max-width: ${breakpoints.values.md - 1}px) {
            width: 15rem;
        }
    }
`

export const ActionWrapper = styled.div`
    margin: 0.625rem auto;
    display: flex;
    margin: 0rem 0rem;
    padding: 1rem 1rem;
    border-top: ${props => props.theme.colours.utilities.dividerDark};
    && > div,
    && > a {
        width: 18rem;
        @media (max-width: ${breakpoints.values.md - 1}px) {
            width: 16rem;
        }
        height: 2.25rem;
        margin: 0;
        flex-shrink: 1;
    }
`
