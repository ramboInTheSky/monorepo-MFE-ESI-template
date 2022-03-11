import Api from "../../config/api/searchBanner"
import TrackSeoPillsClick from "../../events/trackEvent/events/trackSeoPillsClick"
import TrackSeoPillsImpression from "../../events/trackEvent/events/trackSeoPillsImpression"
import TrackVisualPillsClick from "../../events/trackEvent/events/trackVisualPillsClick"
import TrackVisualPillsImpression from "../../events/trackEvent/events/trackVisualPillsImpression"

export const getSearchBanner = Api("getSearchBanner")

export const getSearchBannerUrl = (apiUrlSettings, url) => {
    return getSearchBanner.url(apiUrlSettings)(encodeURIComponent(url.replace("/search-banners/", "")))
}

export const handleVisualPillsImpression = (document: Document) => {
    const visualPillsCollection = document.getElementsByClassName("roundelsItem image")
    if (visualPillsCollection.length > 0) {
        const visulPillsImpression = Array.prototype.reduce.call(
            visualPillsCollection,
            (agg, roundel) => (agg ? `${agg} | ${roundel.getAttribute("alt")}` : roundel.getAttribute("alt")),
            "",
        ) as string
        TrackVisualPillsImpression(visulPillsImpression)
    }
}

export const handleSeoPillsImpression = (document: Document) => {
    const seoPillsIterator = document.getElementsByClassName("search-quick-link")
    if (seoPillsIterator.length > 0) {
        const pillsImpression = Array.prototype.reduce.call(
            seoPillsIterator,
            (agg, roundel) => (agg ? `${agg} | ${roundel.textContent}` : roundel.textContent),
            "",
        ) as string
        TrackSeoPillsImpression(pillsImpression)
    }
}

export const setupSeoPillsEventListeners = (document: Document) => {
    const seoPillsIterator = document.querySelectorAll("a.search-quick-link")
    if (seoPillsIterator.length > 0) {
        const seoPills = Array.from(seoPillsIterator)
        seoPills.map(seoPill =>
            seoPill.addEventListener("click", e => {
                const el = e.target as Element
                TrackSeoPillsClick(el.textContent as string, el.getAttribute("href") as string)
            }),
        )
    }
}

export const setupVisualPillsEventListeners = (document: Document) => {
    const visualPillsIterator = document.querySelectorAll("div.roundelsItem")
    if (visualPillsIterator.length > 0) {
        const visualPills = Array.from(visualPillsIterator)
        visualPills.map(visualPill =>
            visualPill.addEventListener("click", e => {
                const el = e.currentTarget as any
                TrackVisualPillsClick(
                    el.querySelector(".text").textContent,
                    el.querySelector(".link").getAttribute("href"),
                )
            }),
        )
    }
}
