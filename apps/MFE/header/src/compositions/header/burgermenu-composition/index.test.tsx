import React from "react"
import {Provider} from "react-redux"
import {render} from "@testing-library/react"
import {SCThemeProvider} from "@monorepo/theme-provider"
import mockStore, {mockTheme} from "../../../../__mocks__/mockStore"
import BurgerMenuHeader, {BurgerMenuHeaderProps} from "."

jest.mock("../../../components/UpperHeader", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST UpperHeader COMPONENT</div>,
}))

jest.mock("../../../components/MeganavESI", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST MeganavESI COMPONENT</div>,
}))

jest.mock("../../../components/QuickLinksContainer", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST QuickLinksContainer COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/Brand", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST Brand COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/Search", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST Search COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/CountryLangSelector", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST CountryLangSelector COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/MyAccount", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST MyAccount COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/Favourites", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST Favourites COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/ShoppingBag", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST ShoppingBag COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/TestTools", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST TestTools COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/TimeMachineDate", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST TimeMachineDate COMPONENT {children}</div>
        },
    }
})
jest.mock("../../../components/SaleBagWarningModal", () => {
    return {
        __esModule: true,
        // eslint-disable-next-line react/display-name
        default: ({children}) => {
            return <div>TEST SaleBagWarningModal COMPONENT {children}</div>
        },
    }
})

jest.mock("../../../components/CookieConsent", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST CookieConsent COMPONENT</div>,
}))

describe("Pages: Header - ", () => {
    describe("When the header renders with regions ", () => {
        let fragment
        beforeAll(() => {
            jest.useFakeTimers()
            const props: BurgerMenuHeaderProps = {
                textAlignment: "ltr",
                useDevEsi: false,
                showModal: false,
                closeModalHandler: jest.fn(),
                enableCookieConsent: true,
                showSaleWarningBag: false,
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <BurgerMenuHeader {...props} />
                    </Provider>
                </SCThemeProvider>,
            )
            fragment = asFragment()
        })
        afterAll(() => {
            jest.clearAllTimers()
        })
        it("should show the header", () => {
            expect(fragment).toMatchSnapshot()
        })
    })
    describe("When the header renders with showModal true ", () => {
        let fragment
        beforeAll(() => {
            jest.useFakeTimers()
            const props: BurgerMenuHeaderProps = {
                textAlignment: "ltr",
                useDevEsi: false,
                showModal: true,
                closeModalHandler: jest.fn(),
                enableCookieConsent: true,
                showSaleWarningBag: true,
            }
            const {asFragment} = render(
                <SCThemeProvider theme={mockTheme}>
                    <Provider store={mockStore}>
                        <BurgerMenuHeader {...props} />
                    </Provider>
                </SCThemeProvider>,
            )
            fragment = asFragment()
        })
        afterAll(() => {
            jest.clearAllTimers()
        })
        it("should show the header", () => {
            expect(fragment).toMatchSnapshot()
        })
    })
})
