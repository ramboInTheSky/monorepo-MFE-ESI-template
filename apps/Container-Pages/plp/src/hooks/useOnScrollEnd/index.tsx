import {useEffect} from "react"

export function useOnScrollEnd(callback: Function, deps: any[] = []) {
    useEffect(() => {
        let timeout
        function handleScroll() {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                callback()
            }, 66)
        }
        document.addEventListener("scroll", handleScroll)
        return () => document.removeEventListener("scroll", handleScroll)
    }, [...deps]) // eslint-disable-line react-hooks/exhaustive-deps
}
