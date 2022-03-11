import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme, mockText} from "../../../../../__mocks__/mockStore"
import {EnrichAutoComplete, AutoCompleteProps} from "."

jest.mock("../../../../components/Autocomplete", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({handleFocus}) => (
        <ul>
            <li>
                <a href="/abc" data-testid="first-anchor" onFocus={handleFocus}>
                    abc
                </a>
            </li>
            <li>
                <a href="/abcdef">abcdef</a>
            </li>
        </ul>
    ),
}))
jest.mock("../../../../components/AutocompleteProducts", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => (
        <ul>
            <li>
                <a href="/abc">
                    <img src="abc.com/amido-something.jpg" alt="abc" /> abc
                </a>
            </li>
            <li>
                <a href="/abcdef">
                    <img src="abcdef.com/amido-something.jpg" alt="abcdef" /> abcdef
                </a>
            </li>
        </ul>
    ),
}))

describe("Components - EnrichAutoComplete: ", () => {
    let props: AutoCompleteProps
    beforeEach(() => {
        props = {
            isLoading: true,
            getAutoCompleteThunk: jest.fn(),
            numFound: 2,
            suggestions: [
                {
                    q: "aaa",
                    dq: "aaa",
                },
                {
                    q: "vvv",
                    dq: "vvv",
                },
            ],
            typedCharacters: "vvv",
            text: mockText.autoComplete,
        }
    })
    it("should match the snapshot for AutoCompleteContainer - Show loader", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <EnrichAutoComplete {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should match the snapshot for AutoCompleteContainer - show data", () => {
        const newProps = {
            ...props,
            isLoading: false,
            numFound: 2,
            suggestions: [
                {
                    q: "aaa",
                    dq: "aaa",
                },
                {
                    q: "vvv",
                    dq: "vvv",
                },
            ],
            typedCharacters: "vvv",
        }
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <EnrichAutoComplete {...newProps} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should match the snapshot for AutoCompleteContainer - no result found", () => {
        const newProps = {
            ...props,
            isLoading: false,
            numFound: 0,
            suggestions: [],
            typedCharacters: "aaaa",
        }
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <EnrichAutoComplete {...newProps} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("should handle focus", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <EnrichAutoComplete {...props} />
            </SCThemeProvider>,
        )
        const link = screen.getByTestId("first-anchor")
        fireEvent.focus(link)
        expect(props.getAutoCompleteThunk).toHaveBeenCalled()
    })
})
