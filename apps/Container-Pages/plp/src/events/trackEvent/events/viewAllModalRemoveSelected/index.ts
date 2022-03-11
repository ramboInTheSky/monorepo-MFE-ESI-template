import {publishTrackEvent} from "../.."

const TrackViewAllModalRemoveSelected = (facetValue: string) => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "popup",
            label: "clear",
            option: facetValue,
        },
    })
}

export default TrackViewAllModalRemoveSelected
