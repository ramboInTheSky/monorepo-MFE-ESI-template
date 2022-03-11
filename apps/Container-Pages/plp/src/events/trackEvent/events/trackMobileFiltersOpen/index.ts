import {publishTrackEvent} from "../.."

const TrackMobileFiltersOpen = () => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "open",
        },
    })
}

export default TrackMobileFiltersOpen
