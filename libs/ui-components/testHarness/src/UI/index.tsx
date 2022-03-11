import React, {useState} from "react"
import PubSub from "../pubSub"
import {
    TestHarnessToggle,
    TestHarnessContainer,
    Row
} from "./component"

export interface TestHarnessUIProps {
    urlParam: string
    subscriptions: SubscriptionObject
    events?: EventTriggerObject
}

type EventTriggerObject = {
    [key: string]: any
}

export type SubscriptionObject = {
    [key: string]: (data: any) => void
}

// Map event names into a { EVENT_NAME: true } -type map (to track subscription status)
const mapSubscriptionState = (subscriptionObject: SubscriptionObject) =>
    Object.keys(subscriptionObject)
    .map((key) => ({[key]: true}))
    .reduce((acc, obj) => ({
        ...acc,
        ...obj
    }), {})

const TestHarnessUI = ({subscriptions, events = {}}: TestHarnessUIProps) => {
    /* eslint-disable react/jsx-key */
    const [isOpen, setIsOpen] = useState(false)
    const [subscribedState, setSubscribedState] = useState(mapSubscriptionState(subscriptions))
    const subscriptionEntries = Object.entries(subscriptions)
    const eventEntries = Object.entries(events)

    const toggleSubscription = (name, fn) => {
        if (subscribedState[name] === true) {
            PubSub.unsubscribe(name)
        } else {
            PubSub.subscribe(name, fn)
        }
        setSubscribedState({
            ...subscribedState,
            [name]: !subscribedState[name]
        })
    }

    return (
        <>
            <TestHarnessToggle
                onClick={() => setIsOpen(!isOpen)}
                data-testid="test-harness-button"
            >
                T
            </TestHarnessToggle>
            {isOpen &&
                <TestHarnessContainer>
                    <h2>Test Harness Utility</h2>
                    <hr/>
                    <h4>Subscriptions</h4>
                    {subscriptionEntries.map(([eventName, fn]) =>
                        <Row>
                            {eventName}
                            <input
                                type="checkbox"
                                onClick={() => toggleSubscription(eventName, fn)}
                                checked={subscribedState[eventName]}
                            />
                        </Row>
                    )}
                    <hr/>
                    <h4>Events</h4>
                    {eventEntries.map(([eventName, data]) => 
                        <Row>
                            <input
                                type="button"
                                onClick={() => PubSub.publish(eventName, data)}
                                value={eventName} 
                            />
                        </Row>
                    )}
                </TestHarnessContainer>
            }
        </>
    )
}

export default TestHarnessUI