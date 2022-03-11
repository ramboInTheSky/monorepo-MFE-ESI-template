import {publishTrackEvent} from "../.."

const TrackViewAllModalSearchBar = (facetValue: string) => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "popup",
            label: "search",
            option: facetValue,
        },
    })
}

export default TrackViewAllModalSearchBar
