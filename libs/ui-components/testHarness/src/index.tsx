import React from "react"
import {
    initiateHarness,
} from "./init"
import TestHarnessUI, {TestHarnessUIProps} from "./UI"
import PubSub from "./pubSub"

export const PubSubInstance: typeof PubSub = PubSub

const TestHarnessUIContainer = (props: TestHarnessUIProps) => {
    const {urlParam, subscriptions} = props

    if (initiateHarness(urlParam, subscriptions)) {
        return <TestHarnessUI {...props} />
    }

    return null
}

export default TestHarnessUIContainer