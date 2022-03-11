import styled from "styled-components"
import {FavouriteState} from "../../models/Favourites"
import env from "../../config/env"

interface FavouriteProps {
    favState: string
    shouldAnimate: boolean
}

export const FavouritesContainer = styled.div`
    position: absolute;
    bottom: 1.125rem;
    right: 0.625rem;
    border: ${props => props.theme.colours.utilities.dividerDark};
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    z-index: 100;
    height: 2.25rem;
    width: 2.25rem;
`

export const FavouritesIcon = styled.svg<FavouriteProps>`
    && {
        /* transform:rotate added to prevent pixel snapping and rectify visible jump in animation*/
        /* https://stackoverflow.com/questions/22097660/is-there-a-way-i-can-force-chrome-to-do-subpixel-rendering-for-a-slow-translatio
https://johnresig.com/blog/sub-pixel-problems-in-css/ */
        transform: rotateZ(-0.0000000001deg);
        width: 100%;
        height: 100%;

        ${AnimationProps =>
            AnimationProps.favState === FavouriteState.Inactive &&
            `

                @media all and (-ms-high-contrast: none) {
                    background-image: url(${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/favourites-inactive.png); 
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
        `}

        ${FavouriteProps =>
            FavouriteProps.favState === FavouriteState.Loading &&
            `
            stroke-dasharray: 40;
            stroke-dashoffset: 80;
            stroke-linecap: round;
            animation: favourite-loading 0.8s linear infinite reverse;

            @keyframes favourite-loading {
                0% {
                    stroke-dashoffset: 80;
                }
                100% {
                    stroke-dashoffset: 160;
                }
            }

            @media all and (-ms-high-contrast: none) {
                background-image: url(${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/favourites-loading.gif); 
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        `}

        ${FavouriteProps =>
            FavouriteProps.favState === FavouriteState.Active &&
            FavouriteProps.shouldAnimate &&
            `
            animation: favourite-loaded 1s ease-in-out;
            
            @keyframes favourite-loaded {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.25);
                }
                100% {
                    transform: scale(1);
                }
            }
            
        `}

        ${FavouriteProps =>
            FavouriteProps.favState === FavouriteState.Active &&
            `
            @media all and (-ms-high-contrast: none) {
                background-image: url(${env.REACT_APP_BLOB_STORAGE_PATH}/icons/shared/favourites-active.png); 
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
            
        `}
    }
`

export const FavouritesButton = styled.button`
    && {
        padding: 0.5rem 0.5rem;
        height: 100%;
        width: 100%;
        background: none;
        border: none;
        cursor: pointer;
    }
`
