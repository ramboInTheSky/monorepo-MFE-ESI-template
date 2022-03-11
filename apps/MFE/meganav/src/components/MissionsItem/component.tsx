import styled from "styled-components"

export const ImageTitle = styled.span`
    color: ${props => props.theme.colours.text.default};
    font-size: 0.813rem;
    font-family: ${props => `${props.theme.colours.font.primary.regular.family}, ${props.theme.colours.font.default}`};
    text-decoration: none;
`
export const ImageWrapper = styled.div`
    width: 100%;
    height: 0;
    padding: ${props => props.theme.dimensions.Missions.Item.xs.padding};
    position: relative;
    background: #eaeaea;
    border-radius: ${props => props.theme.colours.borders.primary.radius};
    margin-bottom: 0.5rem;
    overflow: hidden;
`

export const ImageContainer = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: ${props => props.theme.colours.borders.primary.radius};
    height: auto;
    margin-bottom: 1rem;
`

export const Container = styled.a<{numberOfColumns: number}>`
    display: flex;
    flex-direction: column;
    text-align: center;
    flex-grow: 1;
    margin-right: 1rem;
    cursor: pointer;
    text-decoration: none;
    width: ${({numberOfColumns}) => `calc((100% - (${numberOfColumns - 1}rem)) / ${numberOfColumns})`};
    height: 100%;

    :hover {
        span {
            text-decoration: underline;
        }
    }

    :last-child {
        margin-right: 0;
    }
`
