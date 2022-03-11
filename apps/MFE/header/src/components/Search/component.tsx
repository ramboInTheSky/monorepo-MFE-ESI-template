import styled from "styled-components"
import {Button as MUIButton} from "@mui/material"
import {SupportedSearchBar} from "../../models/features/searchBar"

type BigScreenContainerProps = {
    open: boolean
    searchbartype: string
}

export const BigScreenContainer = styled.div<BigScreenContainerProps>`
    width: ${props => props.theme.styles.SearchBox.xs.width};
    > div {
        border-bottom-left-radius: ${props =>
            props.searchbartype === SupportedSearchBar.SimpleSearch && props.open
                ? "0"
                : props.theme.colours.form.input.radius};
        border-bottom-right-radius: ${props =>
            props.searchbartype === SupportedSearchBar.SimpleSearch && props.open
                ? "0"
                : props.theme.colours.form.input.radius};
    }
`
export const IconContainer = styled.div`
    padding: ${props => props.theme.styles.SearchBoxIcon.xs.padding};
    display: flex;
    cursor: pointer;
    img {
        width: ${props => props.theme.styles.SearchBoxIcon.xs.width};
        height: ${props => props.theme.styles.SearchBoxIcon.xs.height};
    }
`

export const SearchArea = styled.div`
    display: flex;
    height: 2.75rem;

    > div:first-child {
        width: calc(100% - 4.5rem);
    }
`

export const CloseButton = styled(MUIButton)`
    && {
        display: flex;
        width: 4.5rem;
        height: 2.75rem;
        background: ${props => props.theme.colours.utilities.backgroundAccent};
        color: ${props => props.theme.colours.text.hyperlink};
        font-family: ${props =>
            `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
        border-radius: 0;
        border: 0;

        &:hover,
        &:active {
            background: ${props => props.theme.colours.utilities.backgroundAccent};
            border: 0;
        }

        &:focus {
            border: 0;
            border-radius: 0;
        }
    }
`
export const Img = styled.img`
    height: ${({theme: {styles}}) => styles.UpperHeader.xs.iconHeight};
`
