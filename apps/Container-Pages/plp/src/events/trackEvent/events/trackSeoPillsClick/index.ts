/* istanbul ignore file */
import {publishTrackEvent} from "../.."

const TrackSeoPillsClick = (name: string, link: string) => {
    publishTrackEvent("seoPillsClick", {
        seoPillsImpression: {
            /* eslint-disable */
            link_category: "seoPills",
            link_id: link,
            link_name: name,
            link_value: ""
            /* eslint-enable */
        },
    })
}

export default TrackSeoPillsClick
