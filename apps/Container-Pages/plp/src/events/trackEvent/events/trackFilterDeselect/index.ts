import {publishTrackEvent} from "../.."

const TrackFilterDeselect = (filterCategory: string, filterOption: string) => {
    publishTrackEvent("filter", {
        filter: {
          category: 'filter',
          action: 'remove',
          label: filterCategory,
          option: filterOption
        },
    })
}

export default TrackFilterDeselect
