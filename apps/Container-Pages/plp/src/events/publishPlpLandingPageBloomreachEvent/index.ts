import {PageLandingESB} from "@monorepo/eventservice"

const PlpLandingPageBloomreachEvent = new PageLandingESB()

export const publishPlpLandingPageBloomreachEvent = (data: any) => {
    PlpLandingPageBloomreachEvent.publish(data)
}
