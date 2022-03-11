import {publishTrackEvent} from "../.."

const TrackFilterClearAll = () => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "clear",
            label: "clear all"
        },
    })
}

export default TrackFilterClearAll