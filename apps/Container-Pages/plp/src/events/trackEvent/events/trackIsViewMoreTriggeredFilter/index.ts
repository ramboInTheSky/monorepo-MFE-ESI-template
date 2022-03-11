import {publishTrackEvent} from "../.."

const TrackIsViewMoreTriggeredFilter = (filterCategory: string) => {
    publishTrackEvent("filter", {
        filter: {
          category: 'filter',
          action: 'expand more',
          label: filterCategory
        },
    })
}

export default TrackIsViewMoreTriggeredFilter
