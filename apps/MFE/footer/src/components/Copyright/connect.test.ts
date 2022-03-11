import logger from "@monorepo/core-logger"

import {mockState} from "../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"

import axios from "../../utils/axios"

jest.mock("../../utils/axios", () => ({
    get: jest.fn(),
}))
jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))
describe("Copyright - Given connect - mapStateToProps()", () => {
    const {location} = window
    const mockLocationReload = jest.fn()
    beforeEach(() => {
        delete window.location
        window.location = {href: "http://amido.com", reload: mockLocationReload} as any
    })

    afterEach(() => {
        window.location = location
    })
    it("should return siteurl", () => {
        expect(mapStateToProps(mockState)).toEqual({
            siteUrl: "http://amido.com",
            text: mockState.text,
        })
    })

    describe(" - mergeProps()", () => {
        it("should match the properities with the user logged in ", () => {
            const siteUrl = "http://superman.en.co.uk/ar"
            expect(
                mergeProps(
                    {
                        siteUrl,
                    },
                    null,
                    null,
                ),
            ).toEqual({
                siteUrl,
                deviceSwitcherFn: expect.any(Function),
            })
        })
        it("should call axios get when deviceSwitcherFn is called", async () => {
            const dispatch = jest.fn()
            const mockPreventDefault = jest.fn()
            const got = mergeProps({siteUrl: "http://test.com"}, {dispatch}, {})
            expect(got.deviceSwitcherFn).toBeTruthy()
            await got.deviceSwitcherFn(
                {
                    preventDefault: mockPreventDefault,
                },
                "http://amido.com/changedevice/mobile",
            )

            expect(mockPreventDefault).toHaveBeenCalled()
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(axios.get).toHaveBeenCalledWith("http://amido.com/changedevice/mobile", {
                headers: {Pragma: "no-cache"},
                withCredentials: true,
            })

            expect(mockLocationReload).toHaveBeenCalled()
            mockLocationReload.mockReset()
        })
        it("should call loggers when axios get when deviceSwitcherFn fails", async () => {
            const dispatch = jest.fn()
            const got = mergeProps({siteUrl: "http://test.com"}, {dispatch}, {})
            expect(got.deviceSwitcherFn).toBeTruthy()
            await got.deviceSwitcherFn({}, "")
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(logger.error).toHaveBeenCalled()
        })
    })
})
