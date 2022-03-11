import {TrackEvent, TrackSiteDetailsEvent} from "@monorepo/eventservice"

const TrackingEvent = new TrackEvent()

export const publishTrackingEvent = (eventName: string, data: any) => {
    TrackingEvent.publish({event: eventName, data})
}

const SiteDetailsEvent = new TrackSiteDetailsEvent()

export const publishSiteDetailsEvent = (data: any) => {
    SiteDetailsEvent.publish(data)
}
