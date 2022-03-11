import styled from "styled-components"
import {breakpoints} from "@monorepo/themes"

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;

        a {
            display: flex;
            justify-content: center;
            margin: ${props => props.theme.styles.Favourites.xs.margin};
            height: ${props => props.theme.styles.Favourites.xs.height};
            padding: ${props => props.theme.styles.UpperHeader.xs.iconHitArea};

            @media (min-width: ${breakpoints.values.md}px) {
                height: ${props => props.theme.styles.Favourites.md?.height};

                margin: ${({theme: {styles}}) => {
                    return styles.Favourites.md?.margin || "0.625rem 0.625rem 0.5rem"
                }};
            }
        }
    }

    img {
        width: ${props => props.theme.styles.Favourites.img.xs.width};
        height: ${({theme: {styles}}) => styles.Favourites.img.xs.height};
        padding: ${props => props.theme.styles.Favourites.img.xs.padding};
    
        @media (min-width: ${breakpoints.values.md}px) {
            width: ${props => props.theme.styles.Favourites.img?.md?.width};
            height: ${props => props.theme.styles.Favourites.img?.md?.height};
        }
    }
`

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`
