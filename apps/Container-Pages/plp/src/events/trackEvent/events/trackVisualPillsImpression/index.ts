/* istanbul ignore file */
import {publishTrackEvent} from "../.."

const TrackVisualPillsImpression = (name: string) => {
    publishTrackEvent("visualPillsImpression", {
        visualPillsImpression: {
            /* eslint-disable */
            link_category: "visualPills",
            link_id: "Impression",
            link_name: name,
            link_value: "",
            /* eslint-enable */
        },
    })
}

export default TrackVisualPillsImpression
