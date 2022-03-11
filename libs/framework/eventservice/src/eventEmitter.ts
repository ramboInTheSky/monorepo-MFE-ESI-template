/* eslint-disable class-methods-use-this */
import * as Rx from "rxjs"
import {Subscription} from "rxjs"
import Events from "./events"

declare const window: MyWindow
// eslint-disable-next-line @typescript-eslint/unbound-method
const hasOwnProp = {}.hasOwnProperty

interface Subjects {
    [key: string]: any
}

interface MyWindow extends Window {
    subjects: Subjects
}

if (typeof window !== "undefined") {
    window.subjects = window.subjects ?? {

        // MVC helper function to allow MVC to listen to register listen events 
        // Only to be called from MVC as a temp fix as it cannot access this package 
        setupEvent : (eventName: string) => {
            if (!window.subjects[eventName]){ 
                window.subjects[eventName] = new Rx.ReplaySubject(1)
            }
        }
    }
}
class Emitter {
    private static instance: Emitter

    public static get Instance() {
        if (!this.instance) this.instance = new this()
        return this.instance
    }

    private createName(name: string) {
        return `$ ${name}`
    }

    public emit(name: Events, data: any) {
        const fnName = this.createName(name)
        // eslint-disable-next-line no-unused-expressions
        window.subjects[fnName] || (window.subjects[fnName] = new Rx.ReplaySubject(1))
        window.subjects[fnName].next(data)
    }

    public listen(name: Events, handler: any): Subscription {
        const fnName = this.createName(name)
        // eslint-disable-next-line no-unused-expressions
        window.subjects[fnName] || (window.subjects[fnName] = new Rx.ReplaySubject(1))
        return window.subjects[fnName].subscribe(handler)
    }

    public dispose() {
        const {subjects} = window
        // eslint-disable-next-line no-restricted-syntax
        for (const prop in subjects) {
            if (hasOwnProp.call(subjects, prop)) {
                subjects[prop].dispose()
            }
        }

        window.subjects = {}
    }
}

export default Emitter.Instance
