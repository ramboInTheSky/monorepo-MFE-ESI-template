import React from "react"
import {fireEvent, render, screen} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {SearchBox} from "."
import {DEBOUNCE_TIME, LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"
import {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {handlePropagation} from "../../utils/handlePropagation"

jest.mock("@monorepo/eventservice")

jest.mock("../../utils/debounce", () => jest.fn(fn => fn))

jest.mock("../../utils/handlePropagation", () => {
    return {
        handlePropagation: jest.fn(),
    }
})

describe("Components - SearchBox: ", () => {
    let props: any
    beforeEach(() => {
        props = {
            handleClick: jest.fn(),
            autocompleteTyping: jest.fn(),
            typing: jest.fn(),
            openDrawer: jest.fn(),
            placeholder: "I am placeholder",
            searchBarType: "SimpleSearch",
            backgroundImage: "/hello/something/asd.jpg",
            showAutocompletePanel: false,
            showRecentPanel: false,
            typedCharacters: "",
            labelId: "header-small-screen-search-box",
            text: mockText.searchBox,
        }
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null),
                removeItem: jest.fn(() => null),
            },
            writable: true,
        })
    })

    afterEach(() => {
        props.typing.mockClear()
        props.handleClick.mockClear()
        props.autocompleteTyping.mockClear()
    })

    it("should match the snapshot", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("Should respond when input is focused", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        fireEvent.focus(input)
        expect(props.openDrawer).toHaveBeenCalled()
    })
    it("Should redirect to plp when submit is called", () => {
        const newProps = {
            ...props,
            typedCharacters: "celio",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        const button = screen.getByRole("button")
        fireEvent.change(input, {target: {value: newProps.typedCharacters}})
        fireEvent.click(button)
        expect(props.handleClick).toHaveBeenCalledTimes(1)
        expect(props.handleClick).toHaveBeenCalledWith(newProps.typedCharacters)
    })
    it("Should redirect user when the enter key is pressed on the input", () => {
        const newProps = {
            ...props,
            typedCharacters: "celio",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        fireEvent.change(input, {target: {value: newProps.typedCharacters}})
        fireEvent.submit(input, {key: "Enter"})
        expect(props.handleClick).toHaveBeenCalledTimes(1)
        expect(props.handleClick).toHaveBeenCalledWith(newProps.typedCharacters)
    })
    it("Should not redirect user when the tab key is pressed on the input", () => {
        const newProps = {
            ...props,
            typedCharacters: "celio",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        fireEvent.change(input, {target: {value: newProps.typedCharacters}})
        fireEvent.keyDown(input, {key: "Tab"})
        expect(props.handleClick).not.toHaveBeenCalledTimes(1)
        expect(props.handleClick).not.toHaveBeenCalledWith(newProps.typedCharacters)
    })
    it("should remove localStorage when clicked when submit is called", () => {
        const newProps = {
            ...props,
            typedCharacters: "celio",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        const button = screen.getByRole("button")
        fireEvent.change(input, {target: {value: newProps.typedCharacters}})
        fireEvent.click(button)
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
    it("Should have required attribute on input", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        expect(input).toHaveAttribute("required")
        expect(input).toHaveAttribute("type", "text")
        expect(input).toHaveAttribute("label", props.label)
    })
    it("Should have href '#' for clear button", () => {
        const newProps = {
            ...props,
            typedCharacters: "celio",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )

        const clearButton = screen.getByTestId("header-search-bar-clear-text-button")
        expect(clearButton).toHaveAttribute("href", "#")
    })

    it("Should have tabIndex '0' for submit button initially", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        const button = screen.getByRole("button")
        expect(button).toHaveAttribute("tabIndex", "0")
    })
    it("Should have tabIndex '0' for clear button when text is entered", () => {
        const newProps = {
            ...props,
            typedCharacters: "celio",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )

        const clearButton = screen.getByTestId("header-search-bar-clear-text-button")
        expect(clearButton).toHaveAttribute("tabIndex", "0")
    })
    it("Should have tabIndex '0' for Submit button when text is entered", () => {
        const newProps = {
            ...props,
            typedCharacters: "celio",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )
        const button = screen.getByRole("button")
        expect(button).toHaveAttribute("tabIndex", "0")
    })
    it("Should stop propagation on click of input", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        fireEvent.click(input)
        expect(handlePropagation).toHaveBeenCalled()
    })
    it("Should not allow submission if input value is an empty string", () => {
        const searchTerm = " "
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        const button = screen.getByRole("button")
        fireEvent.change(input, {target: {value: searchTerm}})
        fireEvent.click(button)
        expect(props.handleClick).not.toHaveBeenCalled()
    })
    it("Should not allow submission if input value is null", () => {
        const searchTerm = null
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        const button = screen.getByRole("button")
        fireEvent.change(input, {target: {value: searchTerm}})
        fireEvent.click(button)
        expect(props.handleClick).not.toHaveBeenCalled()
    })
    it("Should not allow submission if input value is empty", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        const button = screen.getByRole("button")
        fireEvent.click(button)
        expect(props.handleClick).not.toHaveBeenCalled()
    })
    it("Should call trigger to IDLE when clear button is clicked", () => {
        const newProps = {
            ...props,
            typedCharacters: "celio",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        fireEvent.change(input, {target: {value: newProps.typedCharacters}})

        const button = screen.getByTestId("header-search-bar-clear-text-button")
        fireEvent.click(button)
        expect(props.typing).toHaveBeenCalledWith("")
    })

    it("Should trigger Recent searches panel to open when typing less than 3 characters", () => {
        const newProps = {
            ...props,
            typedCharacters: "ce",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...newProps} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        fireEvent.change(input, {target: {value: newProps.typedCharacters}})

        // debounce
        setTimeout(() => {
            expect(props.typing).toHaveBeenCalled()
            expect(props.typing).toHaveBeenCalledWith(newProps.typedCharacters)
        }, DEBOUNCE_TIME)
    })
    it("Should trigger autocomplete panel to open when typing more than 2 characters", () => {
        const newProps = {
            ...props,
            typedCharacters: "celi",
        }
        render(
            <SCThemeProvider theme={mockTheme}>
                <SearchBox {...props} />
            </SCThemeProvider>,
        )
        const input = screen.getByTestId("header-search-bar-text-input")
        fireEvent.change(input, {target: {value: newProps.typedCharacters}})

        // debounce
        setTimeout(() => {
            expect(props.autocompleteTyping).toHaveBeenCalled()
            expect(props.autocompleteTyping).toHaveBeenCalledWith(newProps.typedCharacters)
        }, DEBOUNCE_TIME)

        fireEvent.focus(input)
        expect(props.openDrawer).toHaveBeenCalled()
    })
})
