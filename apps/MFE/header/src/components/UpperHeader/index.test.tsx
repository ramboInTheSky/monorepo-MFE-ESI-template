import React from "react"
import {useDispatch} from "react-redux"
import {render, screen, fireEvent} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"

import {mockTheme} from "../../../__mocks__/mockStore"
import {UpperHeaderWrapper} from "."

jest.mock("react-redux", () => {
    return {useDispatch: jest.fn(() => jest.fn())}
})

jest.mock("@material-ui/core", () => {
    return {
        useMediaQuery: () => true,
        useScrollTrigger: () => true,
    }
})

describe("Upper Header", () => {
    it("should call useDispatch when click is triggered", () => {
        render(
            <SCThemeProvider theme={mockTheme}>
                <UpperHeaderWrapper componentName="div" />
            </SCThemeProvider>,
        )

        const link = screen.getByTestId("header-upperheader")
        fireEvent.click(link)

        expect(useDispatch).toHaveBeenCalledWith()
    })
})
