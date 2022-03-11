import {TrackEvent} from "@monorepo/eventservice"

const TrackEventESB = new TrackEvent()

export const publishTrackEvent = (eventName: string, data: any) => {
    TrackEventESB.publish({event: eventName, data})
}
