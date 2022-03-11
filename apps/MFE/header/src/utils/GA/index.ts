/* istanbul ignore file */
declare let TrackGAEvent: any

// Temp solution until we have a proper GA system in place
export const TrackGAEventWrapper = (category: string, action: string, label: string, value: number) => {
    if (typeof TrackGAEvent !== "undefined" && typeof TrackGAEvent.formatToParts !== "function") {
        TrackGAEvent(category, action, label, value)
    } else {
          // eslint-disable-next-line no-console
        console.log("GA EVENT", category, action, label, value)
    }
}

export default TrackGAEventWrapper
