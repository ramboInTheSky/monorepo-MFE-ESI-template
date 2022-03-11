import {getWindow} from "."

const executeOnLoad = (callback: () => void): void => {
    const w = getWindow()
    if (!w) {
        return
    }
    if (w.document.readyState === "complete") {
        callback()
    } else {
        w.addEventListener("load", callback)
    }
}

export default executeOnLoad
