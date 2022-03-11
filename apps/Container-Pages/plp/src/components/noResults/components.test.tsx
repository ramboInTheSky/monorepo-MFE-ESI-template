import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {Italic, List, ListItem} from "./components"

describe("Components/noResults - Italic", () => {
    it("should match the snapshot - Italic", () => {
        const {container} = render(
            <SCThemeProvider theme={mockTheme}>
                <Italic />
            </SCThemeProvider>,
        )
        expect(container.firstChild).toMatchSnapshot()
    })
})

describe("Components/noResults - List", () => {
    it("should match the snapshot - List", () => {
        const {container} = render(
            <SCThemeProvider theme={mockTheme}>
                <List />
            </SCThemeProvider>,
        )
        expect(container.firstChild).toMatchSnapshot()
    })
})

describe("Components/noResults - ListItem", () => {
    it("should match the snapshot - ListItem", () => {
        const {container} = render(
            <SCThemeProvider theme={mockTheme}>
                <ListItem />
            </SCThemeProvider>,
        )
        expect(container.firstChild).toMatchSnapshot()
    })
})
