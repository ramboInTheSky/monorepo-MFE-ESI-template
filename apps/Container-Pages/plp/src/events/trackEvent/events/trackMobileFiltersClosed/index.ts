import {publishTrackEvent} from "../.."

const TrackMobileFiltersClosed = () => {
    publishTrackEvent("filter", {
        filter: {
            category: "filter",
            action: "closed",
        },
    })
}

export default TrackMobileFiltersClosed
