import {publishTrackEvent} from "../.."

const TrackFilterClear = (filterCategoryName: string) => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "clear",
            label: filterCategoryName
        },
    })
}

export default TrackFilterClear