import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const InnerContainer = styled.nav`
    display: flex;
    height: 100%;
    background-color: inherit;
    z-index: 2;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    align-items: center;

    max-width: ${breakpoints.values.xl}px;

    padding: ${props => props.theme.styles.UpperHeader.xs.padding};

    @media (min-width: ${breakpoints.values.md}px) {
        padding: ${props => props.theme.styles.UpperHeader.md.padding};
    }

    @media (min-width: ${breakpoints.values.xl}px) {
        padding: ${props => props.theme.styles.UpperHeader.xl.padding};
    }

    .header-adaptive-brand {
        order: ${props => props.theme.styles.Brand.xs.order};
        margin: ${props => props.theme.styles.Brand.xs.margin};
        width: ${props => props.theme.styles.Brand.xs.width};
        min-width: ${props => props.theme.styles.Brand.xs.width};
        width: ${props => props.theme.styles.Brand.xs.width};
    }
    .header-adaptive-my-account {
        order: ${props => props.theme.styles.MyAccount.xs.order};
    }
    .header-adaptive-search {
        order: ${props => props.theme.styles.SearchBox.xs.order};
        margin: ${props => props.theme.styles.SearchBox.xs.margin};
        width: ${props => props.theme.styles.SearchBox.xs.width};
        min-width: ${props => props.theme.styles.SearchBox.xs.width};
    }
    .header-adaptive-links {
        order: ${props => props.theme.styles.Quicklinks.xs.order};
        width: ${props => props.theme.styles.Quicklinks.xs.width};
        min-width: ${props => props.theme.styles.Quicklinks.xs.width};
    }
    .header-adaptive-checkout {
        flex-shrink: 0;
        order: ${props => props.theme.styles.Checkout.xs.order};
    }
    .favourites {
        width: 2.75rem;
        min-width: 2.75rem;
        order: ${props => props.theme.styles.Favourites.xs.order};
    }
    .countrylangselector {
        width: ${props => props.theme.styles.CountrySelector.xs.width};
        order: ${props => props.theme.styles.CountrySelector.xs.order};
        min-width: ${props => props.theme.styles.CountrySelector.xs.width};
    }

    .shoppingbag {
        width: ${props => props.theme.styles.ShoppingBag.xs.width};
        order: ${props => props.theme.styles.ShoppingBag.xs.order};
        min-width: 2.75rem;
        @media (min-width: ${breakpoints.values.md}px) {
            margin: ${props => props.theme.styles.ShoppingBag.md.margin};
        }
    }

    @media (min-width: ${breakpoints.values.md}px) {
        height: ${props => props.theme.styles.UpperHeader.md.height};

        .header-adaptive-brand {
            width: ${props => props.theme.styles.Brand.md.width};
        }

        .header-adaptive-search {
            margin: ${props => props.theme.styles.SearchBox.md.margin};
            width: ${props => props.theme.styles.SearchBox.md.width};
        }

        .header-adaptive-links {
            order: ${props => props.theme.styles.Quicklinks.md.order};
            width: ${props => props.theme.styles.Quicklinks.md.width};
        }
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        .header-adaptive-brand {
            width: ${props => props.theme.styles.Brand.lg.width};
            height: ${props => props.theme.styles.Brand.lg.height};
        }
    }
`
