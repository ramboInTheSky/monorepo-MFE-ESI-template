import {publishTrackEvent} from "../.."

const TrackCTATabbedFilters = (selectedFiltersOnCTA) => {
    publishTrackEvent("filter", {
        filter: {
          category: 'filter',
          action: 'popup',
          label: 'View Products',
          option: selectedFiltersOnCTA,
        },
    })
}

export default TrackCTATabbedFilters
