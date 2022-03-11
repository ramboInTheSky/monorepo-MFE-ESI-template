import {publishTrackEvent} from "../.."

const TrackSortOpen = () => {
    publishTrackEvent("sort", {
        sort: {
            category: "sort",
            action: "open",
        },
    })
}

export default TrackSortOpen
