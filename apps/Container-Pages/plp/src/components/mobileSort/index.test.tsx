/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react"
import {render, cleanup} from "@testing-library/react"
import {MobileSort} from "."
import Menu from "../menu"
import { mockText } from "../../../__mocks__/mockStore"

let actualOnSelect
jest.mock("../menu", () => ({
    __esModule: true,
    Menu: jest.fn(() => <div>TEST MENU</div>),
    default: jest.fn(props => {
        actualOnSelect = props.onSelect
        return (
            <div>
                {props.buttonText} {props.onSelect} TEST MENU
            </div>
        )
    }),
}))

const testOnSelect = jest.fn()
const testOptions = {selected: "red", options: [{name: "test", value: "testValue"}]}
describe("Sort Menu: ", () => {
    afterAll(() => {
        cleanup()
    })
    let fragment
    beforeAll(() => {
        const {asFragment} = render(<MobileSort onSelect={testOnSelect} sortOptions={testOptions} text={mockText} />)
        fragment = asFragment()
    })
    it("should match the snapshot ", () => {
        expect(fragment).toMatchSnapshot()
    })

    it("should pass correct functions to Menu", () => {
        expect(Menu).toHaveBeenCalledWith(
            {buttonText: "Sort", onSelect: expect.any(Function), options: testOptions, text:mockText},
            {},
        )
    })

    it("should create expected on Select method", () => {
        actualOnSelect("test")
        expect(testOnSelect).toHaveBeenCalledWith("test")
    })
})
