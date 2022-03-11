import {initiateHarness} from "./init"
import PubSub from "./pubSub"

describe("Test harness initialiser function", () => {
    it("fails initialisation when the url parameter is not in window.location", () => {
        const isInitialised = initiateHarness("testUrlParam", {})
        expect(isInitialised).toBe(false)
    })

    it("fails initialisation when the url parameter name supply is not correct", () => {
        (global as any).window = Object.create(window)
        Object.defineProperty(window, 'location', {
          value: {
            search: "?testUrlParam=true"
          },
        })
        const isInitialised = initiateHarness("wrongTestUrlParam", {})
        expect(isInitialised).toBe(false)
    })

    it("passes initialisation when environment variable and url param are correctly set and subscribes the handlers", () => {
        const spy = jest.spyOn(PubSub, 'subscribe')
        const isInitialised = initiateHarness("testUrlParam", {"test": () => null})
        expect(isInitialised).toBe(true)
        expect(spy).toHaveBeenCalled()
    })
})