import {publishTrackEvent} from "../.."

const TrackFilterExpanded = (filterName: string) => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "expanded",
            label: filterName,
        },
    })
}

export default TrackFilterExpanded
