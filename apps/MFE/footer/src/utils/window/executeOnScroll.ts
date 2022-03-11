import {getWindow} from "."

const executeOnScroll = (callback: () => void): void => {
    const w = getWindow()
    if (!w) {
        return
    }
    const onScroll = () => {
        clearTimeout(timeoutId)
        callback()
        w.removeEventListener("scroll", onScroll)
        w.removeEventListener("resize", onScroll)
    }

    w.addEventListener("scroll", onScroll)
    w.addEventListener("resize", onScroll)

    // defensive fallback for when during page load footer not initally visible as images load in
    const timeoutFallback = () => {
        w.removeEventListener("scroll", onScroll)
        w.removeEventListener("resize", onScroll)

        callback()
    }
    console.log(setTimeout)
    const timeoutId = setTimeout(timeoutFallback, 5000)
}
export default executeOnScroll
