import React from "react"
import {render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Missions} from "."

jest.mock("../MissionsTitle", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div data-testid="missionstitle">MissionsTitle</div>,
}))
jest.mock("../MissionsCTA", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div data-testid="missionscta">MissionsCTA</div>,
}))
jest.mock("../MissionsItemList", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div data-testid="missionsimagelist">MissionsItemList</div>,
}))
describe("Missions", () => {
    let props
    beforeEach(() => {
        props = {
            data: {
                noOfColumns: 1,
                items: [
                    {
                        imageUrl: "/sampleimageUrl2",
                        target: "/sampleTarget2",
                        title: "sampletitle2",
                    },
                ],
                categoryLink: {
                    title: "samplecategorylink",
                    target: "/sampletarget",
                },
                title: "sampletitle",
            },
        }
    })
    it("Should match snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Missions {...props} />)
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should have required subcomponents", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <Missions {...props} />)
            </SCThemeProvider>,
        )
        const missionsTitle = screen.getByTestId("missionstitle")
        const missionsImageList = screen.getByTestId("missionsimagelist")
        const missionsCTA = screen.getByTestId("missionscta")
        expect(missionsTitle).toBeInTheDocument()
        expect(missionsImageList).toBeInTheDocument()
        expect(missionsCTA).toBeInTheDocument()
    })
})
