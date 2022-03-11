import {publishTrackEvent} from "../.."

const TrackViewAllModalFilterSelect = (facetValue: string) => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "popup",
            label: "select",
            option: facetValue,
        },
    })
}

export default TrackViewAllModalFilterSelect
