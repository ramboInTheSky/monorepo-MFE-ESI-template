import {useState, useEffect} from "react"
import {
    handleSeoPillsImpression,
    handleVisualPillsImpression,
    setupSeoPillsEventListeners,
    setupVisualPillsEventListeners,
} from "../../utils/searchBanner"

export const useSearchBannerLoaded = (searchBannerHtml: string | null) => {
    const setMobileSearchBannerText = () => {
        const searchBannerText = document.getElementById("search-banner-read-more-content")
        const mobileSearchBannerText = document.getElementById("search-banner-mobile-read-more-content")
        if (searchBannerText && mobileSearchBannerText) {
            mobileSearchBannerText.innerHTML = searchBannerText.innerHTML
        }
    }

    const [searchBannerTextLoaded, setSearchBannerTextLoaded] = useState(false)

    useEffect(() => {
        const hasSearchBannerTextLoaded = () => {
            const searchBannerText = document.getElementById("search-banner-read-more-content")

            if (searchBannerText) {
                setSearchBannerTextLoaded(true)
                setMobileSearchBannerText()
            }

            handleVisualPillsImpression(document)
            handleSeoPillsImpression(document)

            setupSeoPillsEventListeners(document)
            setupVisualPillsEventListeners(document)
        }
        hasSearchBannerTextLoaded()
    }, [searchBannerHtml])

    return searchBannerTextLoaded
}
