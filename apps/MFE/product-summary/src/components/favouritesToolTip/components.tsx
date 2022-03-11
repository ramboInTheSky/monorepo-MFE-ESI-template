import styled from "styled-components"

export const Container = styled.div`
    padding: 1rem;
    min-width: 18rem;
    border: ${props => props.theme.colours.popover.border};
    background: ${props => props.theme.colours.header.myAccount.background};
    border-radius: ${props => props.theme.colours.popover.radius};
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
`

export const Header = styled.div`
    margin-bottom: 1rem;
    font-family: ${({theme}) => `${theme.colours.font.primary.regular.family}, ${theme.colours.font.default}`};
    display: flex;
    justify-content: space-between;
`

export const Title = styled.div`
    font-size: 0.938rem;
`

export const CloseButton = styled.button`
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: 0;
    cursor: pointer;
    padding: 0;
    height: 0.75rem;
    width: 0.75rem;
`

export const CloseImage = styled.img`
    width: 0.75rem;
    height: 0.75rem;
`

export const Content = styled.div`
    font-size: 0.875rem;
`

export const Link = styled.a`
    color: ${props => props.theme.colours.text.hyperlink};
`

export const UserSection = styled.p`
    margin-bottom: 0.2rem;
`
