import {Subscription} from "rxjs"
import {PubSub} from "./pubSub"

describe("PubSub implementation", () => {
    const instance = new PubSub()
    const mockSubscription = jest.fn()

    describe("when subscribe() is called", () => {
        it("adds the handler to the window object and returns an instance of Subscription", () => {
            const subscription = instance.subscribe("test", mockSubscription)
            expect(subscription).toBeInstanceOf(Subscription)
            expect((window as any).subjects).toHaveProperty("$ test")
            expect(instance.subscriptions.test.length).toBe(1)
        })

        it("will add the subscription to the subscriptions array if the key is a duplicate", () => {
            instance.subscribe("test", () => null)
            expect(instance.subscriptions.test.length).toBe(2)
        })
    })

    it("callling publish() triggers the subscribed handlers", () => {
        instance.publish("test", {})
        expect(mockSubscription).toHaveBeenCalled()
    })

    it("when unsubscribe() is called, the subscriptions are closed and not called for a published event", () => {
        jest.clearAllMocks()
        instance.unsubscribe("test")
        expect(instance.subscriptions.test[0].closed).toBe(true)
        expect(instance.subscriptions.test[1].closed).toBe(true)
        instance.publish("test", {})
        expect(mockSubscription).not.toHaveBeenCalled()
    })
})