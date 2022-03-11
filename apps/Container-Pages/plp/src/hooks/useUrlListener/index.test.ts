/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable import/no-extraneous-dependencies */

import {renderHook} from "@testing-library/react-hooks"
import {useUrlListener} from "."

let actualOnPopstate
const mockAddEventListener = jest.fn((_name, callback) => {
    actualOnPopstate = callback
})
const mockRemoveEventListener = jest.fn()

const mockReplaceState = jest.fn()
const mockHistoryGo = jest.fn()

jest.mock("../../utils/window", () => ({
    getWindow: jest.fn(() => ({
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
        history: {
            replaceState: mockReplaceState,
            go: mockHistoryGo,
        },
        location: "www.test.com",
    })),
}))

const mockLoadPageFromUrl = jest.fn()

describe("Given `useUrlListener()`", () => {
    afterAll(() => jest.clearAllMocks())
    beforeAll(() => {
        renderHook(() => useUrlListener(mockLoadPageFromUrl))
    })

    it("should add an event listener", () => {
        expect(mockAddEventListener).toHaveBeenCalledWith("popstate", expect.any(Function))
    })

    it("should add remove the event listener on unmount", () => {
        expect(mockRemoveEventListener).toHaveBeenCalledWith("popstate", expect.any(Function))
    })

    it("should call replace state on initial load", () => {
        expect(mockReplaceState).toHaveBeenCalledWith({type: "PLP-FILTER-EVENT"}, "", "www.test.com")
    })

    it("should call loadPageFromUrl when a history back event fires", () => {
        actualOnPopstate({state: {type: "PLP-FILTER-EVENT"}})

        expect(mockLoadPageFromUrl).toHaveBeenCalledWith("www.test.com")
    })

    it("should load previous history when a history back event fires that is not from PLP", () => {
        actualOnPopstate({})

        expect(mockHistoryGo).toHaveBeenCalledWith(-1)
        mockHistoryGo.mockReset()
        actualOnPopstate({state: {}})
        expect(mockHistoryGo).toHaveBeenCalledWith(-1)
    })
})
