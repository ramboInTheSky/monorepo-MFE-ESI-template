import styled from "styled-components"

const buttonOverrides = `
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: 0;
    cursor: pointer;
    padding: 0;
`

export const Container = styled.div`
    padding: 1rem;
    width: 18rem;
    border: ${props => props.theme.colours.popover.border};
    background: ${props => props.theme.colours.header.myAccount.background};
    border-radius: ${props => props.theme.colours.popover.radius};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
`

export const ErrorContainer = styled(Container)`
    width: 8.9rem;
    text-align: center;
`

export const Header = styled.div`
    margin-bottom: 1rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    display: flex;
    justify-content: space-between;
`

export const Title = styled.div`
    font-family: ${({theme}) => `${theme.colours.font.primary.medium.family}, ${theme.colours.font.default}`};
    font-size: 0.938rem;
    font-weight: 500;
`

export const CloseButton = styled.button`
    ${buttonOverrides}
    height: 0.75rem;
    width: 0.75rem;
`

export const CloseImage = styled.img`
    width: 0.75rem;
    height: 0.75rem;
`

export const Content = styled.div`
    font-size: 0.875rem;
    line-height: 1.313rem;
`

export const ShoppingLinkWrapper = styled.div`
    text-align: center;
`

export const ShoppingLink = styled.button`
    ${buttonOverrides}
    color: ${props => props.theme.colours.text.hyperlink};
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    font-size: 0.875rem;
    text-decoration: underline;
`

export const ManageFavouritesButton = styled.div`
    height: 2.25rem;
    margin: 1.1rem 0 1.1rem;
    & > a {
        text-decoration: none;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 !important;
        font-size: 1rem !important;
        font-weight: 500 !important;
        visibility: visible !important;
    }
`