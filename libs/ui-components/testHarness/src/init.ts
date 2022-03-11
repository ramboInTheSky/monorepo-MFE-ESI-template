import PubSub from "./pubSub"
import {parseQueryString} from "./parseQueryString"
import {SubscriptionObject} from "./UI"

type InitiateHarness = (urlParamName: string, object: SubscriptionObject) => boolean

const enableTestHarness = process.env.REACT_APP_ENABLE_TEST_HARNESS || false

export const initiateHarness: InitiateHarness = (urlParamName, object) => {
    if (
        typeof window === "undefined"
        || enableTestHarness !== "true"
        || parseQueryString(window.location.search)[urlParamName] !== "true"
    ) {
        return false
    }

    Object.entries(object).forEach(([eventName, fn]) => {
        PubSub.subscribe(eventName, fn)
    })

    return true
}