import {publishTrackEvent} from "../.."

const TrackIsViewLessTriggeredFilter = (filterCategory: string) => {
    publishTrackEvent("filter", {
        filter: {
          category: 'filter',
          action: 'expand less',
          label: filterCategory
        },
    })
}

export default TrackIsViewLessTriggeredFilter
