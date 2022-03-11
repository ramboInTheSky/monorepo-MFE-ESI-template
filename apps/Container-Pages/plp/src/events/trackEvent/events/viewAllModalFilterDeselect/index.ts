import {publishTrackEvent} from "../.."

const TrackViewAllModalFilterDeselect = (facetValue: string) => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "popup",
            label: "remove",
            option: facetValue,
        },
    })
}

export default TrackViewAllModalFilterDeselect
