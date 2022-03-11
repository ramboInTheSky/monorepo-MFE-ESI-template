/* eslint-disable @typescript-eslint/camelcase */

import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme, mockText} from "../../../__mocks__/mockStore"
import {AutocompleteProducts, AutocompleteProductsProps} from "."
import {LOCAL_STORAGE_ACTIVE_DEPT_NAME} from "../../config/constants"

describe("Components - AutocompleteProducts: ", () => {
    let props: AutocompleteProductsProps
    const {
        autoComplete: {
            searchLinktext,
            enrich: {termTitle},
        },
    } = mockText
    beforeEach(() => {
        props = {
            term: "socks",
            products: [
                {
                    pid: "123456",
                    sale_price: 0,
                    thumb_image: "abc.jpg",
                    title: "abc",
                    url: "abc.abc.com/amido",
                },
                {
                    pid: "123634",
                    sale_price: 0,
                    thumb_image: "dfg.jpg",
                    title: "dfg",
                    url: "dfg.dfg.com/amido",
                },
            ],
            handleSuggestionClick: jest.fn(),
            maxItems: {
                xs: 8,
                sm: 8,
                md: 4,
                lg: 4,
                xl: 5,
            },
            text: {searchLinktext, termTitle},
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
    it("should match the snapshot for AutoCompleteContainer - Show loader", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <AutocompleteProducts {...props} />
            </SCThemeProvider>,
        )
        expect(asFragment()).toMatchSnapshot()
    })
    it("should remove localStorage when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <AutocompleteProducts {...props} />
            </SCThemeProvider>,
        )

        const link = screen.getByText("abc")
        fireEvent.click(link)
        /* eslint-disable */
        expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
        expect(window.localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_ACTIVE_DEPT_NAME)
        /* eslint-enable */
    })
    it("should call handleSuggestionClick when clicked", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <AutocompleteProducts {...props} />
            </SCThemeProvider>,
        )

        const link = screen.getByText("See all results")
        fireEvent.click(link)
        /* eslint-disable */
        expect(props.handleSuggestionClick).toHaveBeenCalledTimes(1)
        /* eslint-enable */
    })
})
