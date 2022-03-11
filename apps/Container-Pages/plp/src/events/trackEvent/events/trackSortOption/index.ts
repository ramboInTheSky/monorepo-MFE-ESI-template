import {publishTrackEvent} from "../.."

const TrackSortOption = (label: string) => {
    publishTrackEvent("sort", {
        sort: {
            category: "sort",
            action: "option",
            label: window.decodeURIComponent(label)
        },
    })
}

export default TrackSortOption
