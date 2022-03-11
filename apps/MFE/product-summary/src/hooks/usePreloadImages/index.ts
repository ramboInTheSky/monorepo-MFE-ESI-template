import {useCallback, useEffect, useRef} from "react"

export const usePreloadImages = () => {
    const imageCacheRef = useRef<HTMLImageElement[]>([])

    useEffect(() => {
        return () => {
            imageCacheRef.current = []
        }
    }, [])

    return useCallback((imageUrls: string[]) => {
        imageUrls.forEach(url => {
            if (imageCacheRef.current.some(img => img.src === url)) return

            const image = new Image()
            image.src = url
            imageCacheRef.current.push(image)
        })
    }, [])
}
