export const getOrigin = (url: string): string | null => {
    if (!url) return null
    try {
        if (typeof URL === "function") return new URL(url).origin
        // FIX for IE 11, alternative is to use polyfill .
        const parser = document.createElement("a")
        parser.href = url
        return `${parser.protocol}//${parser.hostname}`
    } catch (e) {
        return null
    }
}
