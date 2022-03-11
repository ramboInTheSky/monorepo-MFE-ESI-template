import {getWindow} from "."

const isFooterInViewport = (): boolean => {
    const w = getWindow()
    if (!w) {
        return false
    }
    const footer = w.document.getElementById("footer-entrypoint")
    const rect = footer!.getBoundingClientRect()

    return (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (w.innerWidth || w.document.documentElement.clientWidth) &&
        rect.top < (w.innerHeight || w.document.documentElement.clientHeight)
    )
}

export default isFooterInViewport
