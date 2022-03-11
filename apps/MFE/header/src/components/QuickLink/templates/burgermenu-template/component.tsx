import styled from "styled-components"

export const Li = styled.li`
    list-style: none;
    margin: 15px;
    width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    display: flex;
`

export const A = styled.a`
    list-style: none;
    padding: ${props => props.theme.styles.UpperHeader.xs.iconHitArea};
    align-items: center;
    display: flex;
`
export const Img = styled.img`
    width: 14px;
    height: 20px;
`
