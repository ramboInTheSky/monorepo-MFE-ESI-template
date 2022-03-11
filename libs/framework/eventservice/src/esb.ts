/* eslint-disable class-methods-use-this */
import {Subscription} from "rxjs"
import Emitter from "./eventEmitter"
import Events from "./events"

// this is a test change please remove me at the next opportunity -- 
export interface SubscribeToEvent {
    subscription: Subscription
}

export interface ESB {
    publish(data: any): void
    subscribe(callback: (data?: any) => void): SubscribeToEvent
}

export abstract class CommonESB {
    private subscriptions: {
        [key: string]: Subscription
    } = {}

    protected PublishData(event: Events, data?: any) {
        Emitter.emit(event, data)
    }

    protected SubscribeToEvent(event: Events, cb: (data?: any) => void): SubscribeToEvent {
        const subscription = Emitter.listen(event, cb)

        if (event in this.subscriptions) throw new Error(`A subscription already exists for event: ${event}`)

        this.subscriptions[event] = subscription
        return {
            subscription,
        }
    }

    public UnsubscribeAll() {
        try {
            Object.keys(this.subscriptions).forEach(key => {
                this.subscriptions[key].unsubscribe()

                delete this.subscriptions[key]
            })
        } catch {
            throw new Error("An error occurred unsubscribing from event")
        }
    }
}
