/* istanbul ignore file */
import {publishTrackEvent} from "../.."

const TrackSeoPillsImpression = (name: string) => {
    publishTrackEvent("seoPillsImpression", {
        seoPillsImpression: {
            /* eslint-disable */
            link_category: "seoPills",
            link_id: "Impression",
            link_name: name,
            link_value: ""
            /* eslint-enable */
        },
    })
}

export default TrackSeoPillsImpression
