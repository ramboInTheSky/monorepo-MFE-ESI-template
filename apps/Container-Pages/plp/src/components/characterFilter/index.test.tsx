import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {ThemeProvider} from "styled-components"
import {mockText, mockTheme} from "../../../__mocks__/mockStore"
import {CharacterFilter, CharacterFilterProps} from "."

const mockFilters = {
    test1: {
        n: "Test1",
        c: 0,
        v: "test1",
        s: true,
    },
    test2: {
        n: "Test2",
        c: 0,
        v: "test2",
        s: true,
    },
}

const alphabet = mockText.pages.viewAllModal.alphabet.split(",")

describe("CharacterFilter: ", () => {
    let props: CharacterFilterProps
    beforeEach(() => {
        props = {
            filters: mockFilters,
            clickableCharacters: ["T"],
            clickableNumeric: false,
            handleSetFiltersAlphabet: jest.fn(),
            text: mockText
        } as any
    })

    it("when one CharacterFilter, it should match the snapshot ", () => {
        const {asFragment} = render(
            <ThemeProvider theme={mockTheme}>
                <CharacterFilter {...props} alphabet={alphabet} />
            </ThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })

    it("when clickableNumeric is true, it should match the snapshot", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <CharacterFilter {...props} clickableNumeric alphabet={alphabet} />
            </ThemeProvider>,
        )
        const filtersButton = screen.getByText(/All/i)
        fireEvent.click(filtersButton)

        expect(screen.getByText(/All/i)?.parentElement?.parentElement).toMatchSnapshot()
    })

    it("When clicking All, it should render the options", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <CharacterFilter {...props} alphabet={alphabet}/>
            </ThemeProvider>,
        )
        const filtersButton = screen.getByText(/All/i)
        fireEvent.click(filtersButton)

        expect(screen.getByText(/All/i)?.parentElement?.parentElement).toMatchSnapshot()
    })

    it("When clicking the J letter, it should render the options", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <CharacterFilter {...props} alphabet={alphabet}/>
            </ThemeProvider>,
        )
        const filtersButton = screen.getByText(/J/i)
        fireEvent.click(filtersButton)

        expect(screen.getByText(/J/i)?.parentElement?.parentElement).toMatchSnapshot()
    })

    it("When clicking 0-9, it should render the options", () => {
        render(
            <ThemeProvider theme={mockTheme}>
                <CharacterFilter {...props} clickableNumeric alphabet={alphabet} />
            </ThemeProvider>,
        )
        const filtersButton = screen.getByText(/0-9/i)
        fireEvent.click(filtersButton)

        expect(screen.getByText(/0-9/i)?.parentElement?.parentElement).toMatchSnapshot()
    })
})
