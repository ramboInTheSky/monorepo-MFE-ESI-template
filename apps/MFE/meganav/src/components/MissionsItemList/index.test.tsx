import React from "react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {render, screen} from "@testing-library/react"
import MissionsItemList, {MissionsItemListProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

jest.mock("../MissionsItem", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div data-testid="missions-image">MissionsItem</div>,
}))

describe("MissionsItemList", () => {
    let props: MissionsItemListProps
    beforeEach(() => {
        props = {
            items: [
                {imageUrl: "imageUrl1", target: "target1", title: "title1"},
                {imageUrl: "imageUrl2", target: "target2", title: "title2"},
                {imageUrl: "imageUrl3", target: "target3", title: "title3"},
            ],
            department: "sample department",
            noOfColumns: 3,
        }
    })

    it("Should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsItemList {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should render list of missions image", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <MissionsItemList {...props} />
            </SCThemeProvider>,
        )
        const missionsImages = screen.getAllByTestId("missions-image")
        expect(missionsImages).toHaveLength(props.items.length)
    })
})
