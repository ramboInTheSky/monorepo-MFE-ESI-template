import {handlePropagation} from "."

describe("Handle Propagation: ", () => {
    test("should stop propagation of event", () => {
        const event = {
            stopPropagation: jest.fn(),
        }

        handlePropagation(event)
        expect(event.stopPropagation).toHaveBeenCalledTimes(1)
    })
})
