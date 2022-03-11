import React from "react"
import {render} from "@testing-library/react"
import Cookies from "js-cookie"

import {TimeMachineDate} from "."

describe("Components - TimeMachineDate: ", () => {
    const props = {
        useTimeMachineCookie: false,
    }
    it("should match the snapshot when time-machine-date cookie doesn't exist", () => {
        const {asFragment} = render(<TimeMachineDate {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot when time-machine-date cookie exist", () => {
        Cookies.set("time-machine-date", "2021-04-24T08:50")
        const {asFragment} = render(<TimeMachineDate {...props} />)
        expect(asFragment()).toMatchSnapshot()
    })
})
