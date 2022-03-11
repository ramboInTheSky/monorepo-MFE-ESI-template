import {useCallback, useState} from "react"

export function useCallbackRef() {
    const [value, setValue] = useState<any>(null)
    const ref = useCallback((node: HTMLElement) => {
        if (node !== null) setValue(node)
    }, [])
    return [value, ref]
}
