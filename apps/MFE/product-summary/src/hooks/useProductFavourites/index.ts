import {useState, useMemo, useRef} from "react"
import {FavouriteState} from "../../models/Favourites"

export const useProductFavourites = ({isFav, addToFavourites, removeFromFavourites, isLoadingFav, setFavClicked}) => {
    const refIsFav = useRef(isFav)
    const [favState, setFavState] = useState<FavouriteState>(FavouriteState.Inactive)

    const toggleProductFavourites = () => {
        setFavState(FavouriteState.Loading)
        if (!isLoadingFav) {
            if (isFav) {
                removeFromFavourites()
            } else {
                addToFavourites()
                setFavClicked(true)
            }
        }
    }

    const setFavStateFn = (fav: boolean) => {
        if (fav) {
            setFavState(FavouriteState.Active)
        } else {
            setFavState(FavouriteState.Inactive)
        }
    }

    useMemo(() => {
        if (!isLoadingFav) {
            if (refIsFav.current !== isFav) {
                setFavStateFn(isFav)
            } else if (refIsFav.current === isFav) {
                setFavStateFn(refIsFav.current)
            }
        }
    }, [isFav, isLoadingFav])

    return {
        toggleProductFavourites,
        favState,
    }
}
