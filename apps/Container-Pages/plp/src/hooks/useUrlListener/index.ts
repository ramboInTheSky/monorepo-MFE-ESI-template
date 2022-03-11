import {useEffect} from "react"
import {HISTORY_EVENT} from "../../config/constants"
import {getWindow} from "../../utils/window"

export const useUrlListener = (loadPageFromUrl: (url: string) => void) => {
    useEffect(() => {
        getWindow()!.history.replaceState({type: HISTORY_EVENT}, "", getWindow()!.location.toString())

        const handleUrlChange = (event: PopStateEvent) => {
            if (event.state && event.state.type === HISTORY_EVENT) {
                loadPageFromUrl(getWindow()!.location.toString())
            } else {
                getWindow()!.history.go(-1)
            }
        }
        getWindow()!.addEventListener("popstate", handleUrlChange)
        return () => {
            getWindow()!.removeEventListener("popstate", handleUrlChange)
        }
    }, [loadPageFromUrl])
}
