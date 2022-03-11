import {CountrySelectorClosedESB} from "@monorepo/eventservice"

const closedESB = new CountrySelectorClosedESB()

const PublishCountrySelectorClosed = () => {
    closedESB.publish()
}

export const SubscribeCountrySelectorClosed = (cb: () => void) => {
    return closedESB.subscribe(cb)
}

export default PublishCountrySelectorClosed
