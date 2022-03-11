import {render} from "@testing-library/react"
import React from "react"
import {ThemeProvider} from "styled-components"

import {Container, SearchBar, SearchIcon, Icon, Input} from "./components"
import {mockTheme} from "../../../../__mocks__/mockStore"

describe("tabbedFiltersPanel Brand components", () => {
    describe("Given a Container", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Container />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a Form", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SearchBar />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Given a Search Icon", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <SearchIcon />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Given a Icon", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Icon />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
    describe("Given a Input Field", () => {
        it("should render the component correctly to match the snapshot", () => {
            const {asFragment} = render(
                <ThemeProvider theme={mockTheme}>
                    <Input />
                </ThemeProvider>,
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
