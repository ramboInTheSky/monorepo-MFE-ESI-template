import {useEffect, useState} from "react"
import {useSelector} from "react-redux"

import {useHasReachedFooter} from "./useHasReachedFooter"
import {selectIsFetchingNextPage} from "../../ducks/search"

export function useHideFixedItems() {
    const [hideFixedItems, setHideFixedItems] = useState(false)
    const {hasReachedFooter, calculateHasReachedFooter} = useHasReachedFooter()
    const isFetchingNextPage = useSelector(selectIsFetchingNextPage)

    useEffect(() => {
        if (isFetchingNextPage || !hasReachedFooter) {
            setHideFixedItems(false)
        } else if (!isFetchingNextPage && hasReachedFooter) {
            const isCloseToFooter = calculateHasReachedFooter(true)
            setHideFixedItems(!!isCloseToFooter && hasReachedFooter)
        }
    }, [isFetchingNextPage, hasReachedFooter, calculateHasReachedFooter])

    return {
        hideFixedItems,
    }
}
