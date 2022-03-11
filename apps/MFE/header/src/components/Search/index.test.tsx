import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {Search, SearchProps} from "."
import {mockTheme, mockText} from "../../../__mocks__/mockStore"

jest.mock("../Icon", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Icon</div>,
}))
jest.mock("../SearchBox", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>SearchBox</div>,
}))
jest.mock("../../Features/SearchBar", () => {
    const ModalComponent = () => <div>Modal</div>
    const RecentSearchesComponent = () => <div>RecentSearches</div>
    const AutoCompleteComponent = () => <div>AutoComplete</div>
    return {
        __esModule: true,
        ModalComponent,
        RecentSearchesComponent,
        AutoCompleteComponent,
    }
})
jest.mock("../Drawer", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Drawer</div>,
}))

describe("Components - Search: ", () => {
    let props: SearchProps
    const {
        searchBox: {closeButton, smallPlaceholder, bigPlaceholder},
        drawer,
    } = mockText
    beforeEach(() => {
        props = {
            handleClose: jest.fn(),
            openDrawer: jest.fn(),
            showAutoComplete: false,
            showRecentSearch: false,
            iconUrl: "sample",
            anchor: "right",
            searchBarType: "EnrichSearch",
            checkRecentSearch: true,
            text: {closeButton, smallPlaceholder, drawer, bigPlaceholder},
        }
    })
    it("should match the snapshot 1", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Search {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot 2", () => {
        props = {...props, showAutoComplete: true}
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Search {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot 3", () => {
        props = {...props, showRecentSearch: true}
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Search {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
