import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme, mockText} from "../../../../../__mocks__/mockStore"
import {SimpleAutocomplete} from "."

jest.mock("../../../../components/Autocomplete", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => (
        <ul>
            <li>
                <a href="/abc">abc</a>
            </li>
            <li>
                <a href="/abcdef">abcdef</a>
            </li>
        </ul>
    ),
}))

describe("Components - SimpleAutocomplete: ", () => {
    const props = {
        term: "shirt",
        getConnectedPlpUrl: jest.fn(),
        text: mockText.autoComplete,
    }
    it("should match the snapshot for AutoCompleteContainer", () => {
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
            typedCharacters: "",
        }
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SimpleAutocomplete {...newProps} />
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
            typedCharacters: "",
        }
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SimpleAutocomplete {...newProps} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
})
