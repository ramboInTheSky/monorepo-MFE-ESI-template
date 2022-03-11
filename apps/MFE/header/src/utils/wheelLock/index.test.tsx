/* eslint-disable */
import {bagItemsWheelLock, shoppingBagwheelLock} from "."

describe("Wheel Locks : ", () => {
    describe("bagItemsWheelLock: ", () => {
        it("should return falsy when event type is not wheel", () => {
            const event = {type: "scroll", deltaY: 0}
            const container: React.MutableRefObject<null> = {current: null}
            const bagItemsContainer: React.MutableRefObject<null> = {current: null}

            const response = bagItemsWheelLock(event, container, bagItemsContainer)
            expect(response).toBeFalsy()
        })

        it("should trigger preventDefault for invalid element", () => {
            const event = {type: "wheel", deltaY: 0, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => true}} as any
            const bagItemsContainer = {current: null} as any

            bagItemsWheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
        })

        it("should trigger preventDefault for invalid bagItem container", () => {
            const event = {type: "wheel", deltaY: 0, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => true}} as any
            const bagItemsContainer = {current: {contains: () => false}} as any

            bagItemsWheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
        })

        it("should trigger preventDefault for invalid bagItem container", () => {
            const event = {type: "wheel", deltaY: 2, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => true}} as any
            const bagItemsContainer = {
                current: {contains: () => false, scrollHeight: 50, scrollTop: 5, clientHeight: 45},
            } as any

            bagItemsWheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).toHaveBeenCalledTimes(1)
        })

        it("should trigger preventDefault for event with falsy scrollTop and truthy deltaY", () => {
            const event = {type: "wheel", deltaY: 1, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => false}} as any
            const bagItemsContainer = {
                current: {contains: () => false, scrollHeight: 50, scrollTop: 0, clientHeight: 50},
            } as any

            bagItemsWheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).toHaveBeenCalled()
        })

        it("should not trigger preventDefault for event for truthy scrollTop and falsy deltaY", () => {
            const event = {type: "wheel", deltaY: -2, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => false}} as any
            const bagItemsContainer = {
                current: {contains: () => false, scrollHeight: 50, scrollTop: 10, clientHeight: 45},
            } as any

            bagItemsWheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).not.toHaveBeenCalled()
        })

        it("should not trigger preventDefault for event with truth scrollTop and truth deltaY", () => {
            const event = {type: "wheel", deltaY: 1, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => false}} as any
            const bagItemsContainer = {
                current: {contains: () => false, scrollHeight: 50, scrollTop: 5, clientHeight: 50},
            } as any

            bagItemsWheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).not.toHaveBeenCalled()
        })

        it("should trigger preventDefault for event with falsy scrollTop and falsy deltaY", () => {
            const event = {type: "wheel", deltaY: -2, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => false}} as any
            const bagItemsContainer = {
                current: {contains: () => false, scrollHeight: 50, scrollTop: 0, clientHeight: 45},
            } as any

            bagItemsWheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).toHaveBeenCalled()
        })
    })

    describe("shoppingBagwheelLock: ", () => {
        it("should return falsy when event type is not wheel", () => {
            const event = {type: "scroll", deltaY: 0}
            const container: React.MutableRefObject<HTMLDivElement | null> = {current: null}
            const bagItemsContainer: React.MutableRefObject<HTMLDivElement | null> = {current: null}
            const response = shoppingBagwheelLock(event, container, bagItemsContainer)
            expect(response).toBeFalsy()
        })

        it("should return falsy with  bagItem container contain fx being falsy", () => {
            const event = {type: "wheel", deltaY: 0, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => true}} as any
            const bagItemsContainer = {current: {contains: () => false}} as any

            const response = shoppingBagwheelLock(event, container, bagItemsContainer)
            expect(response).toBeFalsy()
        })

        it("should not trigger preventDefault with  container contain fx being falsy", () => {
            const event = {type: "wheel", deltaY: 0, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => false}} as any
            const bagItemsContainer = {current: {contains: () => true}} as any

            shoppingBagwheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).not.toHaveBeenCalled()
        })

        it("should trigger preventdefault with  container contain fx being truthy", () => {
            const event = {type: "wheel", deltaY: 0, target: 5, preventDefault: jest.fn()}
            const container = {current: {contains: () => true}} as any
            const bagItemsContainer = {current: {contains: () => false}} as any

            shoppingBagwheelLock(event, container, bagItemsContainer)
            expect(event.preventDefault).toHaveBeenCalled()
        })
    })
})
