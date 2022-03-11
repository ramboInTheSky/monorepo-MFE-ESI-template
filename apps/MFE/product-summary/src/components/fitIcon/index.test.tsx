import React from "react"
import {render} from "@testing-library/react"
import {FitIcons} from "."
import {Fits} from "../../config/constants"
import text from "../../../__mocks__/default-text.json"


describe("Given a FitIcons Component", () => {
    it("should match the snapshot with isLazyloadFitIcons as true", () => {
        const {asFragment} = render(<FitIcons fits={[Fits.Petite, Fits.Tall]} isLazyloadFitIcons text={text}/>)
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot with isLazyloadFitIcons as false", () => {
        const {asFragment} = render(<FitIcons fits={[Fits.Petite, Fits.Tall]} text={text}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it("when no fits are provided, it should match the snapshot ", () => {
        const {asFragment} = render(<FitIcons fits={[]} text={text}/>)
        expect(asFragment()).toMatchSnapshot()
    })

    it("when undefined fits are provided, it should match the snapshot ", () => {
        const {asFragment} = render(<FitIcons fits={undefined as any} text={text}/>)
        expect(asFragment()).toMatchSnapshot()
    })
})
