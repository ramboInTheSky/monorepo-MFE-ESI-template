import React from "react"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import {mockTheme} from "@monorepo/themes"
import {mockDateConstructor} from "../../../../__mocks__/setDate"
import DefaultCopyright from "."
import {mockText} from "../../../../__mocks__/mockStore"

describe("Component Copyright, DefaultCopyrights", () => {
    beforeEach(() => {
        mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))
    })
    afterEach(() => {
        mockDateConstructor(new Date())
    })
    it("should show copyright text with 2019 when the date is mocked", () => {
        const {asFragment} = render(
            <SCThemeProvider theme={mockTheme}>
                <DefaultCopyright text={mockText} />
            </SCThemeProvider>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
