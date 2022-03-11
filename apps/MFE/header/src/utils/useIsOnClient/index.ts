import {useEffect, useState} from "react"

import {IS_BROWSER} from "../window"

export const useIsOnClient = (callBack?: VoidFunction) => {
    const [isOnClient, setIsOnClient] = useState(false)

    useEffect(() => {
        if (IS_BROWSER()) {
            if (callBack) {
                callBack()
            }
            setIsOnClient(true)
        }
    }, [callBack])

    return {isOnClient}
}
