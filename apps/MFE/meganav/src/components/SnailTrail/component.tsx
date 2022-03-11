import styled from "styled-components"

export const Container = styled.ul<{loaded: boolean}>`
    width: 100%;
    height: 100%;
    border-top-style: none;
    display: flex;
    opacity: var(--display-primary-nav, 0);
    align-items: center;
    flex-direction: row;
    justify-content: ${props => props.theme.dimensions.PrimaryNav.md.justifyContent};
    padding: 0;
    margin: 0;
    -ms-overflow-style: none;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: ${({loaded}) => (loaded ? "smooth" : "auto")};
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
`
