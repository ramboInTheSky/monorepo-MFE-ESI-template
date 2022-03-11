import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {MeganavESI} from "."
import * as utils from "../../utils/window"
import {mockTheme} from "../../../__mocks__/mockStore"

jest.mock("../../utils/window", () => ({
    IS_BROWSER: jest.fn(),
}))

describe("Components - MegaNavESI: ", () => {
    describe("When running on the server", () => {
        beforeEach(() => {
            jest.spyOn(utils, "IS_BROWSER").mockImplementationOnce(() => {
                return false
            })
        })

        it("should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MeganavESI timeMachineDate="20200102" siteUrl="/batman" useDevEsi />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot when show date is null", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MeganavESI timeMachineDate={null} siteUrl="/batman" useDevEsi />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When running on the client", () => {
        beforeEach(() => {
            jest.spyOn(utils, "IS_BROWSER").mockImplementationOnce(() => {
                return true
            })
        })

        it("should match the snapshot", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MeganavESI timeMachineDate="20200102" siteUrl="/batman" useDevEsi />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot when show date is null", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <MeganavESI timeMachineDate={null} siteUrl="/batman" useDevEsi />
                </SCThemeProvider>,
            )
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
