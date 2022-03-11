/* eslint-disable @typescript-eslint/no-floating-promises */
import axios from "../axios"
import {debounceAndGetCancelToken} from "."
import {TOKEN_CANCELLATION_FLAG} from "../../config/constants"

jest.useFakeTimers()
let tokenText = "cancellable-token"
const mockRequestCanceler = jest.fn()
jest.spyOn(axios.CancelToken, "source").mockImplementation(() => ({
    cancel: mockRequestCanceler,
    token: tokenText as any,
}))

describe("Given a debounceAndGetCancelToken()", () => {
    describe("When called should there is no existing token source", () => {
        let tokenResult
        beforeAll(() => {
            tokenResult = debounceAndGetCancelToken(3000)
            jest.runOnlyPendingTimers()
        })

        it("should set a timer", () => {
            expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000)
        })

        it("should create a new token and return it", async () => {
            const token = await tokenResult
            expect(token).toBe("cancellable-token")
        })

        describe("When there is a debounce token already present", () => {
            beforeEach(() => {
                tokenText = "new-cancellable-token"
                tokenResult = debounceAndGetCancelToken(3000)
                jest.runOnlyPendingTimers()
            })

            it("should cancel the token and set new token", async () => {
                const token = await tokenResult
                expect(mockRequestCanceler).toHaveBeenCalledWith(TOKEN_CANCELLATION_FLAG)
                expect(token).toBe("new-cancellable-token")
            })
        })
    })
})
