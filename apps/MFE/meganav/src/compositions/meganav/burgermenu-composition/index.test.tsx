import React from "react"
import {render} from "@testing-library/react"
import {Provider} from "react-redux"
import {SCThemeProvider} from "@monorepo/theme-provider"
import mockStore, {mockTheme} from "../../../../__mocks__/mockStore"
import {BurgerMenuMegaNav, BurgerMenuMegaNavProps} from "."

jest.mock("../../../components/BurgerButton", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>Burger Menu Button</div>,
}))
jest.mock("../../../components/PrimaryNav", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>I AM PRIMARY NAV COMPONENT</div>,
}))
jest.mock("../../../components/SecondaryNav", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>I AM Secondary NAV COMPONENT</div>,
}))

const props: BurgerMenuMegaNavProps = {
    setCompositionSettings: jest.fn(),
}

describe("Pages: MegaNav - ", () => {
    describe("When the meganav renders with regions ", () => {
        it("should show the burger menu meganav", () => {
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <BurgerMenuMegaNav {...props} />
                    </Provider>
                </SCThemeProvider>,
            )
            expect(props.setCompositionSettings).toHaveBeenCalled()
            expect(asFragment()).toMatchSnapshot()
        })
    })
})
