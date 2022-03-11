import {publishTrackEvent} from "../.."

const TrackViewAllModalRemoveAll = () => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "popup",
            label: "clear all",
        },
    })
}

export default TrackViewAllModalRemoveAll
