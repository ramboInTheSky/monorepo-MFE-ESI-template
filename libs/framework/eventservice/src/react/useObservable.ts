import {useEffect} from "react"
import {ESB} from "../esb"

export const useCommonObservable = (esb: ESB, callback: (data: any) => void) => {
    return useEffect(() => {
        const {subscription} = esb.subscribe(callback)
        return () => {
            subscription.unsubscribe()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
