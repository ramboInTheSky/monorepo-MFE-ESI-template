import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "../../../__mocks__/mockStore"
import {Autocomplete, AutocompleteProps} from "."
import {getPlpUrl} from "../../ducks/search"
import {handleClick, Focus, handleKeyboardTapping} from "../../utils/autocomplete"

jest.mock("../../utils/autocomplete", () => {
    return {handleClick: jest.fn(), Focus: jest.fn(), handleKeyboardTapping: jest.fn()}
})

describe("Components - Autocomplete: ", () => {
    let props: AutocompleteProps

    beforeEach(() => {
        props = {
            term: "socks",
            suggestions: [
                {
                    dq: "girls socks",
                },
                {
                    dq: "boys socks",
                },
            ],
            handleSuggestionClick: jest.fn(),
            handleFocus: jest.fn(),
            getConnectedPlpUrl: term => getPlpUrl("http://test.com")(term),
        }
        Object.defineProperty(window, "localStorage", {
            value: {
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })
    it("should match the snapshot for AutoCompleteContainer - Show loader", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <Autocomplete {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("Should call Focus when link is focus", () => {
        const suggestion = "dungarees"
        const suggestions = [{dq: suggestion}]

        render(
            <SCThemeProvider theme={mockTheme}>
                <Autocomplete {...props} suggestions={suggestions} />
            </SCThemeProvider>,
        )

        const link = screen.getByRole("link")
        fireEvent.mouseOver(link)

        expect(Focus).toHaveBeenCalled()
        expect(Focus).toHaveBeenCalledWith(props.term, suggestion, props.handleFocus)
    })

    it("Should call handleKeyboardTapping when link is tabbed in", () => {
        const suggestion = "dungarees"
        const suggestions = [{dq: suggestion}]
        render(
            <SCThemeProvider theme={mockTheme}>
                <Autocomplete {...props} suggestions={suggestions} />
            </SCThemeProvider>,
        )

        const link = screen.getByRole("link")
        fireEvent.focus(link)

        expect(handleKeyboardTapping).toHaveBeenCalled()
        expect(handleKeyboardTapping).toHaveBeenCalledWith(props.term, suggestion, props.handleFocus)
    })

    it("Should call handleClick when link is tabbed in", () => {
        const suggestion = "dungarees"
        const suggestions = [{dq: suggestion}]
        render(
            <SCThemeProvider theme={mockTheme}>
                <Autocomplete {...props} suggestions={suggestions} />
            </SCThemeProvider>,
        )

        const link = screen.getByRole("link")
        fireEvent.click(link)

        expect(handleClick).toHaveBeenCalled()
        expect(handleClick).toHaveBeenCalledWith(suggestion, props.handleSuggestionClick)
    })
})
