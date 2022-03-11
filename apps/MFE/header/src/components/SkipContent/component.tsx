import styled from "styled-components"

export const Container = styled.button`
    position: fixed;
    top: -100px;
    width: 13.125rem;
    color: ${({theme}) => theme.colours.form.buttonSecondary.color};
    background: ${({theme}) => theme.colours.form.buttonSecondary.background};
    font-weight: ${({theme}) => theme.colours.text.fontWeightMedium};
    border: 0.125rem solid #1d89dd;
    height: 2.75rem;
    z-index: 10;
    padding-top: 0.625rem;
    transition: all 0.5s;
    text-align: center;

    &:focus {
        top: 0;
    }
`
