import React from "react"
import {render, fireEvent, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {SecondaryNavContent, SecondaryNavContentProps} from "."
import {mockTheme} from "../../../__mocks__/mockStore"

jest.mock("../../config/constants", () => {
    return {PRIMARY_NAV_ITEM_HOVER_DELAY: 300}
})
jest.mock("../Banner", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Banner</div>,
}))
jest.mock("../Missions", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Mission</div>,
}))
jest.mock("../Tabs", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Tabs</div>,
}))
jest.mock("../Catalogue", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Catalogue</div>,
}))
jest.useFakeTimers()

describe("Components - SecondaryNavContent:", () => {
    let props: SecondaryNavContentProps
    beforeEach(() => {
        props = {
            activeDepartmentIndex: 0,
            hasTabs: false,
            hasMissions: false,
            isPending: false,
            tabIds: ["all"],
            columns: [],
            department: "",
            tab: null,
            activeTabIndex: 0,
            setTabIndex: jest.fn(),
            setIsInSecondaryMeganavTrue: jest.fn(),
            setIsInSecondaryMeganavFalse: jest.fn(),
            setPreviousPrimaryNav: jest.fn(),
            setNextPrimaryNav: jest.fn(),
            hasBanner: true,
            missions: {title: "", categoryLink: {title: "", target: ""}, items: [], noOfColumns: 0},
            showAsDrawer: true,
        }
    })
    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SecondaryNavContent {...props} />)
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should set active index when exiting from top border only", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <SecondaryNavContent {...props} />
            </SCThemeProvider>,
        )
        const element = screen.getByTestId("sec-nav-content")
        fireEvent.mouseLeave(element)
        jest.runAllTimers()
        expect(props.setIsInSecondaryMeganavFalse).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300)
    })
    it("Should render a loading display", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <SecondaryNavContent {...props} isPending />
            </SCThemeProvider>,
        )
        const catalogues = screen.queryByTestId("catalogue")
        expect(catalogues).not.toBeInTheDocument()
        const missions = screen.queryByTestId("missions")
        expect(missions).not.toBeInTheDocument()
        // TODO fix me after Sumner's approval on animation timing
        // const loader = screen.getByTestId("loader")
        // expect(loader).toBeVisible()
    })
})
