import styled from "styled-components"
import Typography from "@mui/material/Typography"
import {breakpoints} from "@monorepo/themes"
import {ProductsMaxItemsData} from "../../models/features/searchBar"

type UlProps = {
    maxitems: ProductsMaxItemsData
}

export const Container = styled.div`
    span {
        font-size: 0.875rem;
        letter-spacing: 0.12px;
        line-height: 1.5;
        display: inline-block;

        > strong {
            font-family: ${props =>
                `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
            text-transform: capitalize;
        }

        @media (min-width: ${breakpoints.values.md}px) {
            padding-top: 0.375rem;
            margin-top: 0.125rem;
        }
    }
`

export const Div = styled.div`
    display: flex;
    justify-content: flex-end;
    color: ${props => props.theme.colours.text.hyperlink};
    text-decoration: underline;
    font-size: 0.875rem;
    cursor: pointer;

    @media (min-width: ${breakpoints.values.md}px) {
        text-transform: ${props => props.theme.styles.AutoCompleteButton?.xs.textTransform};
    }

    @media (min-width: ${breakpoints.values.md}px) {
        display: ${props => props.theme.styles.AutoCompleteButton?.md.display};
        text-decoration: ${props => props.theme.styles.AutoCompleteButton?.md.decoration};
        color: ${props => props.theme.colours.header.autoCompleteButton.color};
        background-color: ${props => props.theme.colours.header.autoCompleteButton.backgroundcolor};
        padding: ${props => props.theme.styles.AutoCompleteButton?.md.padding};
        border-radius: ${props => props.theme.colours.header.autoCompleteButton.radius};
        text-transform: ${props => props.theme.styles.AutoCompleteButton?.md.textTransform};
    }
`
export const ButtonContainer = styled.div`
    text-align: ${props => props.theme.styles.AutoCompleteButton?.md.align};
`
export const Li = styled.li`
    && {
        flex-grow: 0;
        padding: 1rem;
        padding-left: 0;

        &:hover {
            text-decoration: underline;
        }

        a {
            color: ${props => props.theme.colours.text.default};
            text-decoration: none;
            margin: 0.125rem 0;
            display: inline-block;
            padding-top: 150%;
            margin: 0;
            height: 0px;
            position: relative;
            width: 100%;
            background: ${props => props.theme.colours.utilities.backgroundAccent};
            font-size: 0.875rem;
            letter-spacing: 0.12px;
            line-height: 1.5;

            img {
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                height: 100%;
                width: 100%;
            }

            &:hover {
                text-decoration: underline;
                padding-left: 0;
            }

            h5 {
                align-self: flex-start;
                margin: 0;
                font-family: ${props =>
                    `${props.theme.colours.font.primary.medium.family}, ${props.theme.colours.font.default}`};
            }
        }
    }
`

const hideNumberOfItems = maxItems => {
    const total = maxItems + 1
    return `n + ${total}`
}
export const Ul = styled.ul<UlProps>`
    margin: 0;
    padding: 0;
    list-style: none;

    display: flex;
    width: 100%;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    @media (min-width: ${breakpoints.values.md}px) {
        overflow-x: initial;
    }

    li {
        max-width: calc(1000px / (${props => props.maxitems.sm}));
        flex-basis: calc(1000px / (${props => props.maxitems.sm}));

        @media (max-width: ${breakpoints.values.sm - 1}px) {
            &:nth-child(${props => hideNumberOfItems(props.maxitems.xs)}) {
                display: none;
            }
        }
        @media (max-width: ${breakpoints.values.md - 1}px) {
            min-width: 125px;
        }

        @media (min-width: ${breakpoints.values.sm}px) and (max-width: ${breakpoints.values.md - 1}px) {
            max-width: calc(100% / ${props => props.maxitems.sm});
            flex-basis: calc(100% / ${props => props.maxitems.sm});

            &:nth-child(${props => hideNumberOfItems(props.maxitems.sm)}) {
                display: none;
            }
        }
        @media (min-width: ${breakpoints.values.md}px) and (max-width: ${breakpoints.values.lg - 1}px) {
            max-width: calc(100% / ${props => props.maxitems.md});
            flex-basis: calc(100% / ${props => props.maxitems.md});

            &:nth-child(${props => hideNumberOfItems(props.maxitems.md)}) {
                display: none;
            }
        }
        @media (min-width: ${breakpoints.values.lg}px) and (max-width: ${breakpoints.values.xl - 1}px) {
            max-width: calc(100% / ${props => props.maxitems.lg});
            flex-basis: calc(100% / ${props => props.maxitems.lg});

            &:nth-child(${props => hideNumberOfItems(props.maxitems.lg)}) {
                display: none;
            }
        }
        @media (min-width: ${breakpoints.values.xl}px) {
            max-width: calc(100% / ${props => props.maxitems.xl});
            flex-basis: calc(100% / ${props => props.maxitems.xl});

            &:nth-child(${props => hideNumberOfItems(props.maxitems.xl)}) {
                display: none;
            }
        }
    }
`

export const Title = styled(Typography)`
    && {
        white-space: nowrap;
        overflow: hidden;
        text-transform: capitalize;
        text-overflow: ellipsis;
        max-width: 100%;
        margin: 1rem 0 0;
    }
`
export const ProductDetailsContainer = styled.div`
    text-align: ${props => props.theme.styles.AutoCompleteButton?.xs.align};
`
