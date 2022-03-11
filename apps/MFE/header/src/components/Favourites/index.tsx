/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
import {
    useFavouritesGetCallbackObservable,
    useFavouritesAddCallbackObservable,
    useFavouritesRemoveCallbackObservable,
} from "@monorepo/eventservice"
import Hidden from "@mui/material/Hidden"
import {HEADER_NAV_BAR_QUICK_LINKS, HEADER_NAV_BAR_QUICK_LINKS_FAVOURITES, NO_FOLLOW} from "../../config/constants"

import {Container, Wrapper} from "./components"
import connect from "./connect"
import {removeFromLocalStorage} from "../../utils/removeFromLocalStorage"

type FavouritesProps = {
    iconUrl: string
    altText: string
    enableFavourites: boolean
    updateFavourites: (data: any) => void
    favouritesUrl: string
    hiddenProps?: any | {}
}

export const Favourites = ({
    hiddenProps,
    iconUrl,
    altText,
    enableFavourites,
    updateFavourites,
    favouritesUrl,
}: FavouritesProps) => {
    if (!enableFavourites) return null

    useFavouritesGetCallbackObservable(data => updateFavourites(data))
    useFavouritesAddCallbackObservable(data => updateFavourites(data))
    useFavouritesRemoveCallbackObservable(data => updateFavourites(data))

    return (
        <Wrapper className="favourites" data-testid="header-favourites">
            <Hidden {...hiddenProps} implementation="css">
                <Container onClick={removeFromLocalStorage} data-testid="header-favourites-container">
                    <a
                        href={favouritesUrl}
                        data-ga-v1={HEADER_NAV_BAR_QUICK_LINKS}
                        data-ga-v2={HEADER_NAV_BAR_QUICK_LINKS_FAVOURITES}
                        rel={NO_FOLLOW}
                    >
                        <img src={iconUrl} alt={altText} />
                    </a>
                </Container>
            </Hidden>
        </Wrapper>
    )
}

export default connect(Favourites)
