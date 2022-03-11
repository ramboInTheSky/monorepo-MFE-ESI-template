import {Subscription, ReplaySubject} from "rxjs"

declare const window: MyWindow

interface Subjects {
    [key: string]: any
}

interface MyWindow extends Window {
    subjects: Subjects
}

// Essentially a slight rewrite of the Emitter in the @monorepo/eventservice
// Seemed quicker (and safer) than having the eventservice export it

export class PubSub {
    subscriptions: {[name: string] : Subscription[]} = {}

    constructor() {
        if (typeof window !== "undefined" && !window.subjects) {
            window.subjects = {}
        }
    }

    private static createName(name: string) {
        return `$ ${name}`
    }

    private static upsertSubject(name: string): ReplaySubject<any> {
        const fnName = PubSub.createName(name)
        if (!window.subjects[fnName]) {
            window.subjects[fnName] = new ReplaySubject(0)
        }

        return window.subjects[fnName]
    }

    // eslint-disable-next-line class-methods-use-this
    public publish(name: string, data: any) {
        PubSub.upsertSubject(name).next(data)
    }

    public subscribe(name: string, handler: any): Subscription {
        const subscription = PubSub.upsertSubject(name).subscribe(handler)
        if (!this.subscriptions[name]) {
            this.subscriptions[name] = []
        }
        this.subscriptions[name].push(subscription)
        return subscription
    }

    public unsubscribe(name: string) {
        if (this.subscriptions[name]) {
            this.subscriptions[name].forEach(subscription => {
                subscription.unsubscribe()
            })
        }
    }
}

export default new PubSub()