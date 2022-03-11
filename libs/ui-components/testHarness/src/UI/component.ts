import styled from "styled-components"

export const TestHarnessContainer = styled.div`
    position: fixed;
    top: 2rem;
    right: 2rem;
    padding: 1rem;
    background: white;
    border: 0.1rem solid red;

    h4 {
        margin: 1rem 0;
    }

    h2 {
        margin: 0 0 1rem;
    }
`

export const TestHarnessToggle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    color: white;
    background: red;
    cursor: pointer;
`

export const Row = styled.div`
    margin: 1rem 0;
`