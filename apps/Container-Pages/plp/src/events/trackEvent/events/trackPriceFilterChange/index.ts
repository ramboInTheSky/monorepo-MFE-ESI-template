import {publishTrackEvent} from "../.."

const TrackPriceFilterChange = (priceMin: number, priceMax: number) => {
    publishTrackEvent("filter", {
        filter: {
          category: 'filter',
          action: 'select',
          label: 'price',
          option: `${priceMin} - ${priceMax}`,
        },
    })
}

export default TrackPriceFilterChange
