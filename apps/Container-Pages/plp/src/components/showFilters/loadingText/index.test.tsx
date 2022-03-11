import React from "react"
import { Provider } from "react-redux"
import {render} from "@testing-library/react"
import {ThemeProvider} from "styled-components"

import LoadingText from "."
import mockStore, {mockText, mockTheme} from "../../../../__mocks__/mockStore"

describe("Given a Tabbed Brand Search Bar Component when the filter is a brand filter", () => {
    const componentToTest = (
      <Provider store={mockStore}>
          <ThemeProvider theme={mockTheme}>
              <LoadingText text={mockText}/>
          </ThemeProvider>
        </Provider>
    )
    it("should render the component correctly to match the snapshot", () => {
        const {asFragment} = render(componentToTest)
        expect(asFragment()).toMatchSnapshot()
    })
})