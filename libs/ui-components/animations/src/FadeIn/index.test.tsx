import React from "react"
import {render} from "@testing-library/react"
import {Transition} from "react-transition-group"
import FadeInAnimation from "."

jest.mock("react-transition-group", () => ({
    Transition: jest.fn(({children}) => {
        return children({})
    }),
}))

describe("FadeInAnimation", () => {
    it("should show children when in on state", () => {
        jest.useFakeTimers()
        const props = {
            show: true,
            timeout: 100,
        }
        const {asFragment, getByText} = render(
            <FadeInAnimation {...props}>
                {" "}
                <div>ciao mamma</div>{" "}
            </FadeInAnimation>,
        )
        expect(Transition).toHaveBeenCalled()
        jest.advanceTimersByTime(110)
        expect(asFragment()).toMatchSnapshot()
        expect(getByText("ciao mamma")).toBeTruthy()
    })

    it("should not show children when in off state", () => {
        const props = {
            show: false,
            timeout: 100,
        }
        const {queryByText} = render(
            <FadeInAnimation {...props}>
                {" "}
                <div>ciao mamma</div>{" "}
            </FadeInAnimation>,
        )
        expect(queryByText("ciao mamma")).not.toBeVisible()
    })
})
