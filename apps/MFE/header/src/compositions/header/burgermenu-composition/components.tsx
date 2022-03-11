import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Header = styled.header`
    @media (max-width: ${breakpoints.values.md - 1}px) {
        display: flex;
        flex-direction: row-reverse;
    }
`
export const VerticalDivider = styled.div`
    @media (max-width: ${breakpoints.values.md - 1}px) {
        border-left: 1px solid #eaeaea;
        height: 24px;
        color: #eaeaea;
        margin: 0px 4px;
    }
`

export const InnerContainer = styled.nav`
    display: flex;
    height: 100%;
    background-color: inherit;
    z-index: 2;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    max-width: ${breakpoints.values.xl}px;

    .header-adaptive-brand {
        order: ${props => props.theme.styles.Brand.xs.order};
        justify-content: center;
        display: flex;
        flex: 1;
    }
    .header-adaptive-my-account {
        order: ${props => props.theme.styles.MyAccount.xs.order};
        display: flex;
        align-items: center;
        margin: 15px;
        width: 28px;
        height: 28px;
        justify-content: center;
    }
    .header-adaptive-search {
        order: ${props => props.theme.styles.SearchBox.xs.order};
    }
    .header-adaptive-links {
        order: ${props => props.theme.styles.Quicklinks.xs.order};
        width: auto;
        display: flex;
        align-items: center;
    }
    .header-adaptive-checkout {
        flex-shrink: 0;
        order: ${props => props.theme.styles.Checkout.xs.order};
    }
    .favourites {
        display: flex;
        align-items: center;
        margin: 15px;
        width: 28px;
        height: 28px;
        justify-content: center;
        order: ${props => props.theme.styles.Favourites.xs.order};
    }
    .countrylangselector {
        display: flex;
        align-items: center;
        width: auto;
        order: ${props => props.theme.styles.CountrySelector.xs.order};
        min-width: auto;
        margin: 15px;
    }

    .shoppingbag {
        margin: 20px 15px 20px 20px;
        display: flex;
        align-items: center;
        height: ${props => props.theme.styles.ShoppingBag.xs.height};
        justify-content: center;
        width: ${props => props.theme.styles.ShoppingBag.xs.width};
        order: ${props => props.theme.styles.ShoppingBag.xs.order};
    }

    @media (min-width: ${breakpoints.values.md}px) {
        height: ${props => props.theme.styles.UpperHeader.md.height};

        .header-adaptive-brand {
            width: ${props => props.theme.styles.Brand.md.width};
        }

        .header-adaptive-search {
            margin: ${props => props.theme.styles.SearchBox.md.margin};
            width: ${props => props.theme.styles.SearchBox.md.width};
            flex: 1;
        }

        .header-adaptive-links {
            order: ${props => props.theme.styles.Quicklinks.md.order};
            width: ${props => props.theme.styles.Quicklinks.md.width};
        }
    }

    @media (max-width: ${breakpoints.values.md - 1}px) {
        .header-adaptive-brand {
            order: ${props => props.theme.styles.Brand.md.order};
            a {
                justify-content: center;
                display: flex;
            }
        }

        .shoppingbag {
            margin: 10px;
        }

        .header-adaptive-search {
            order: ${props => props.theme.styles.SearchBox.md.order};
            margin: 10px;
        }

        .header-adaptive-my-account {
            display: none;
        }

        .favourites {
            display: none;
        }

        .countrylangselector {
            display: none;
        }
    }

    @media (min-width: ${breakpoints.values.lg}px) {
        .header-adaptive-brand {
            width: ${props => props.theme.styles.Brand.lg.width};
            height: ${props => props.theme.styles.Brand.lg.height};
        }
    }
`

export const Links = styled.div`
    display: flex;
    order: 3;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    @media (max-width: ${breakpoints.values.md}px) {
        flex: 0;
    }
`
