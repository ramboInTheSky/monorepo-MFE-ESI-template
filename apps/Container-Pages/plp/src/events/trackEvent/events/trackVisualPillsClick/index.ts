/* istanbul ignore file */
import {publishTrackEvent} from "../.."

const TrackVisualPillsClick = (name: string, link: string) => {
    publishTrackEvent("visualPillsClick", {
        visualPillsClick: {
            /* eslint-disable */
            link_category: "visualPills",
            link_id: link,
            link_name: name,
            link_value: "",
            /* eslint-enable */
        },
    })
}

export default TrackVisualPillsClick
