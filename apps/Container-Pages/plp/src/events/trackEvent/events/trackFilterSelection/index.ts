import {publishTrackEvent} from "../.."

const TrackFilterSelection = (filterCategory: string, filterOption: string) => {
    publishTrackEvent("filter", {
        filter: {
          category: 'filter',
          action: 'select',
          label: filterCategory,
          option: filterOption
        },
    })
}

export default TrackFilterSelection
