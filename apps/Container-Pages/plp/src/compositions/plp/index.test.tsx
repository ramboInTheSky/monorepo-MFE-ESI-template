import React from "react"
import {render, screen} from "@testing-library/react"

import {createMockStoreForRequest} from "../../../__mocks__/mockStore"
import {mockDateConstructor} from "../../../__mocks__/setDate"
import {
    setInitialPageRangeFromPageAction,
    updateProducts,
    setDebounceTimeAction,
    assignSearchStateAction,
    setBloomreachCookiesInitialLoad,
} from "../../ducks/search"
import {Plp} from "."
import {getServerSideProps} from "./index.server"
import getFilterCookie from "../../utils/getFilterCookie"
import getDebounceTime from "../../utils/getDebounceTime"
import {getItemsPerPage} from "../../utils/getItemsPerPage"
import {getItemsPerRowConfig} from "../../utils/getItemsPerRow"
import getFetchTriggerOffset from "../../utils/getFetchTriggerOffset"
import getFetchTriggerOffsetRows from "../../utils/getFetchTriggerOffsetRows"
import getBloomreachCookies from "../../utils/getBloomreachCookies"
import getFeatureSwitch from "../../utils/getFeatureSwitch"
import {useSetBreakpoint} from "../../hooks/useSetBreakpoint"
import {setHideSearchFilterModalElements} from "../../ducks/viewAllModal"

jest.mock("../../utils/getFilterCookie", () => ({
    __esModule: true,
    default: jest.fn(() => ({mockCookie: "test"})),
}))
jest.mock("../../hooks/useSetBreakpoint", () => ({
    useSetBreakpoint: jest.fn(),
}))
jest.mock("../../utils/pushSearchResultsEvent", () => ({
    useGTMOnPageLoad: jest.fn(),
}))
jest.mock("../../ducks/search", () => ({
    updateProducts: jest.fn(store => {
        if (store.error) throw new Error("Error")
    }),
    setInitialPageRangeFromPageAction: jest.fn((value: any) => ({type: "SET_INITIAL_PAGE_RANGE", value})),
    setDebounceTimeAction: jest.fn((value: any) => ({type: "SET_DEBOUNCE_TIME", value})),
    setSingleOptionFacetList: jest.fn((value: any) => ({type: "SET_SINGLE_OPTION_FACET_LIST", value})),
    setProductSummaryConfigAction: jest.fn((value: any) => ({type: "SET_PRODUCT_SUMMARY_CONFIG", value})),
    assignSearchStateAction: jest.fn((value: any) => ({type: "ASSIGN_SEARCH_STATE", value})),
    setBloomreachCookiesInitialLoad: jest.fn((value: any) => ({type: "SET_BLOOMREACH_COOKIES_INIT_LOAD", value})),
}))
jest.mock("../../components/products", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST PRODUCTS</div>,
}))
jest.mock("../../components/filters", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST FILTERS</div>,
}))
jest.mock("../../components/noResults", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST NO RESULTS</div>,
}))
jest.mock("../../components/categoryQuickLinks", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST CATEGORY QUICK LINKS</div>,
}))
jest.mock("../../components/container", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({children, textAlignment}) => <div {...textAlignment}>TEST CONTAINER {children}</div>,
}))
jest.mock("../../components/mobileHeader", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST MOBILE HEADER</div>,
}))
jest.mock("../../components/resultsGrid", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: ({children}) => <div>TEST RESULTS GRID {children}</div>,
}))
jest.mock("../../components/viewAllModal", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => <div>TEST VIEW ALL MODAL</div>,
}))

jest.mock("../../utils/getDebounceTime", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => 24),
}))

jest.mock("../../utils/getFetchTriggerOffset", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => ({
        inPageFiltersEnabled: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 6,
            xl: 8,
        },
        default: {
            xs: 4,
            sm: 4,
            md: 6,
            lg: 6,
            xl: 8,
        },
    })),
}))
jest.mock("../../utils/getFetchTriggerOffsetRows", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => ({
        xs: 2,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 2,
    })),
}))

jest.mock("../../utils/getItemsPerRow", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    getItemsPerRowConfig: jest.fn(() => ({
        inPageFiltersEnabled: {
            xs: 4,
            sm: 4,
            md: 4,
            lg: 6,
            xl: 8,
        },
        default: {
            xs: 4,
            sm: 4,
            md: 6,
            lg: 6,
            xl: 8,
        },
    })),
}))
jest.mock("../../utils/getBloomreachCookies", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => ({
        brUid2: "",
        brMtSearch: "",
    })),
}))
jest.mock("../../utils/getItemsPerPage", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    getItemsPerPage: jest.fn(() => ({
        initial: {
            mobile: 8,
            tablet: 12,
            desktop: 24,
        },
        subsequent: {
            mobile: 10,
            tablet: 16,
            desktop: 28,
        },
    })),
}))
jest.mock("../../utils/getFeatureSwitch", () => ({
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: jest.fn(() => ({
        enablePageInFilters: false,
    })),
}))
jest.mock("../../utils/getHideSearchFilterModalElements", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        searchBox: true,
        letterNav: true,
    })),
}))
jest.mock("../../ducks/viewAllModal", () => ({
    __esModule: true,
    setHideSearchFilterModalElements: jest.fn(data => ({
        type: "SET_HIDE_SEARCH_FILTER_MODAL_ELEMENTS",
        data,
    })),
}))

function mockFeatureSwitch(result: any) {
    ;(getFeatureSwitch as jest.Mock).mockReturnValue(result)
}

function mockDebounceTime(result: any) {
    ;(getDebounceTime as jest.Mock).mockReturnValue(result)
}

const the = {
    noResultsText: () => screen.queryByText("TEST NO RESULTS"),
    categoryQuickLinks: () => screen.queryByText("TEST CATEGORY QUICK LINKS"),
}

function mockUseSetBreakpoint() {
    ;(useSetBreakpoint as jest.Mock).mockReturnValue([jest.fn()])
}

describe("Pages: Plp - ", () => {
    describe("When I try provide the data to the Plp and an error has occured: ", () => {
        beforeEach(() => {
            mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))
            mockUseSetBreakpoint()
        })
        it("should show the default Plp", () => {
            const {asFragment} = render(<Plp noResults={false} />)
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("When the Plp renders with noResults ", () => {
        beforeEach(() => {
            mockUseSetBreakpoint()
        })
        it("should show the No results page", () => {
            render(<Plp noResults />)
            expect(the.noResultsText()).toBeInTheDocument()
        })

        it("should show the category quick links", () => {
            render(<Plp noResults />)
            expect(the.categoryQuickLinks()).toBeInTheDocument()
        })
    })

    describe("When the Plp renders with results", () => {
        beforeEach(() => {
            mockUseSetBreakpoint()
        })
        it("should not show the No results page", () => {
            render(<Plp noResults={false} />)
            expect(the.noResultsText()).not.toBeInTheDocument()
        })

        it("should not show the category quick links", () => {
            render(<Plp noResults={false} />)
            expect(the.categoryQuickLinks()).not.toBeInTheDocument()
        })
    })

    describe("When the Plp getServerSideProps function is called ", () => {
        let props: any

        const mockRequest = {req: "test", query: {}}
        const mockResponse = {
            res: "test",
            locals: {
                configuration: {
                    "monorepo.plp.frontend.featureSwitch": {enablePageInFilters: false},
                    "monorepo.plp.frontend.singleOptionFacetList": {
                        Value: ["personalised", "feat", "sizetype", "deliverby"],
                    },
                    "monorepo.plp.frontend.itemsPerRow": {
                        inPageFiltersEnabled: {
                            xs: 2,
                            sm: 2,
                            md: 2,
                            lg: 3,
                            xl: 4,
                        },
                        default: {
                            xs: 2,
                            sm: 2,
                            md: 3,
                            lg: 3,
                            xl: 4,
                        },
                    },
                    "monorepo.plp.frontend.inPageFilters": {
                        enabled: {
                            breakpoint: "md",
                        },
                        disabled: {
                            breakpoint: "lg",
                        },
                    },
                    "monorepo.plp.frontend.fetchTriggerOffset": {
                        inPageFiltersEnabled: {
                            xs: 4,
                            sm: 4,
                            md: 4,
                            lg: 6,
                            xl: 8,
                        },
                        default: {
                            xs: 4,
                            sm: 4,
                            md: 6,
                            lg: 6,
                            xl: 8,
                        },
                    },
                    "monorepo.plp.frontend.itemsPerPage": {
                        initial: {
                            mobile: 8,
                            tablet: 12,
                            desktop: 24,
                        },
                        subsequent: {
                            mobile: 10,
                            tablet: 16,
                            desktop: 28,
                        },
                    },
                    "monorepo.plp.frontend.subsequentPagesNonLazyloadRows": {
                        xs: 2,
                        sm: 2,
                        md: 2,
                        lg: 2,
                        xl: 2,
                    },
                },
            },
        }
        const debounceTime = 300

        it("should set hide search filter modal elements", async () => {
            const store = createMockStoreForRequest({page: 1, viewportSize: "tablet"})
            jest.spyOn(store, "dispatch")
            await getServerSideProps(mockRequest, mockResponse, store)

            expect(setHideSearchFilterModalElements).toHaveBeenCalledWith({
                searchBox: true,
                letterNav: true,
            })
        })

        describe("when page is equal to 1 and enablePageInFilters is true", () => {
            const viewportSize = "tablet"
            const store = createMockStoreForRequest({page: 1, viewportSize})

            beforeAll(async () => {
                jest.spyOn(store, "dispatch")
                mockDebounceTime(debounceTime)
                mockFeatureSwitch({
                    enablePageInFilters: true,
                })
                mockUseSetBreakpoint()
                props = await getServerSideProps(mockRequest, mockResponse, store)
            })
            it("should call getFilterCookie", () => {
                expect(getFilterCookie).toHaveBeenCalledWith(mockRequest, mockResponse, store)
            })
            it("should call getItemsPerPage", () => {
                expect(getItemsPerPage).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call getFetchTriggerOffset", () => {
                expect(getFetchTriggerOffset).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call getFetchTriggerOffsetRows", () => {
                expect(getFetchTriggerOffsetRows).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call getFeatureSwitch", () => {
                expect(getFeatureSwitch).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call getItemsPerRowConfig", () => {
                expect(getItemsPerRowConfig).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call GetPlpData", () => {
                expect(updateProducts).toHaveBeenCalledWith(store, {mockCookie: "test"})
            })
            it("should call getBloomreachCookies", () => {
                expect(getBloomreachCookies).toHaveBeenCalledWith(mockRequest)
            })
            it("should call setBloomreachCookiesInitialLoad", () => {
                expect(store.dispatch).toHaveBeenCalledWith(
                    setBloomreachCookiesInitialLoad({
                        brUid2: "",
                        brMtSearch: "",
                    }),
                )
            })

            it("should dispatch action to set the initial page range", () => {
                expect(store.dispatch).toHaveBeenCalledWith(setInitialPageRangeFromPageAction(1))
            })

            it("should dispatch action to set the debounce time", () => {
                expect(store.dispatch).toHaveBeenCalledWith(setDebounceTimeAction(debounceTime))
            })
            it("should dispatch action to set the initialItemsPerPage and fetchTriggerOffset ", () => {
                const dispatchValues = {
                    initialItemsPerPage: 12,
                    itemsPerPage: {
                        initial: {
                            desktop: 24,
                            mobile: 8,
                            tablet: 12,
                        },
                        subsequent: {
                            desktop: 28,
                            mobile: 10,
                            tablet: 16,
                        },
                    },
                    fetchTriggerOffset: {
                        xs: 4,
                        sm: 4,
                        md: 4,
                        lg: 6,
                        xl: 8,
                    },
                    itemsPerRow: {
                        default: {
                            lg: 6,
                            md: 6,
                            sm: 4,
                            xl: 8,
                            xs: 4,
                        },
                        inPageFiltersEnabled: {
                            lg: 6,
                            md: 4,
                            sm: 4,
                            xl: 8,
                            xs: 4,
                        },
                    },
                    fetchTriggerOffsetRows: {
                        lg: 2,
                        md: 2,
                        sm: 2,
                        xl: 2,
                        xs: 2,
                    },
                    subsequentPagesNonLazyloadRows: {
                        lg: 2,
                        md: 2,
                        sm: 2,
                        xl: 2,
                        xs: 2,
                    },
                    currentBreakpoint: "md",
                }
                expect(store.dispatch).toHaveBeenCalledWith(assignSearchStateAction(dispatchValues))
            })
            it("should call the useSetBreakpoint", () => {
                expect(useSetBreakpoint).toHaveBeenCalled()
            })
            it("should return data from the API", () => {
                expect(props).toBeTruthy()
            })
            it("should return correct values", () => {
                expect(props).toEqual({isConfError: false})
            })
        })

        describe("when page is equal to 14 and enablePageInFilters is false", () => {
            const viewportSize = "desktop"
            const store = createMockStoreForRequest({page: 14, viewportSize})
            beforeAll(async () => {
                jest.spyOn(store, "dispatch")
                mockDebounceTime(debounceTime)
                mockFeatureSwitch({
                    enablePageInFilters: false,
                })
                mockUseSetBreakpoint()
                props = await getServerSideProps(mockRequest, mockResponse, store)
            })

            it("should call getFilterCookie", () => {
                expect(getFilterCookie).toHaveBeenCalledWith(mockRequest, mockResponse, store)
            })
            it("should call getItemsPerPage", () => {
                expect(getItemsPerPage).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call getFetchTriggerOffset", () => {
                expect(getFetchTriggerOffset).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call getFetchTriggerOffsetRows", () => {
                expect(getFetchTriggerOffsetRows).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call getFeatureSwitch", () => {
                expect(getFeatureSwitch).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call getItemsPerRowConfig", () => {
                expect(getItemsPerRowConfig).toHaveBeenCalledWith(mockResponse.locals.configuration)
            })
            it("should call GetPlpData", () => {
                expect(updateProducts).toHaveBeenCalledWith(store, {mockCookie: "test"})
            })

            it("should dispatch action to set the initial page range", () => {
                expect(store.dispatch).toHaveBeenCalledWith(setInitialPageRangeFromPageAction(14))
            })

            it("should dispatch action to set the debounce time", () => {
                expect(store.dispatch).toHaveBeenCalledWith(setDebounceTimeAction(debounceTime))
            })
            it("should dispatch action to set the initialItemsPerPage and fetchTriggerOffset ", () => {
                const dispatchValues = {
                    initialItemsPerPage: 28,
                    fetchTriggerOffset: {
                        xs: 4,
                        sm: 4,
                        md: 6,
                        lg: 6,
                        xl: 8,
                    },
                    itemsPerRow: {
                        default: {
                            lg: 6,
                            md: 6,
                            sm: 4,
                            xl: 8,
                            xs: 4,
                        },
                        inPageFiltersEnabled: {
                            lg: 6,
                            md: 4,
                            sm: 4,
                            xl: 8,
                            xs: 4,
                        },
                    },
                    fetchTriggerOffsetRows: {
                        lg: 2,
                        md: 2,
                        sm: 2,
                        xl: 2,
                        xs: 2,
                    },
                    itemsPerPage: {
                        initial: {
                            desktop: 24,
                            mobile: 8,
                            tablet: 12,
                        },
                        subsequent: {
                            desktop: 28,
                            mobile: 10,
                            tablet: 16,
                        },
                    },
                    subsequentPagesNonLazyloadRows: {
                        lg: 2,
                        md: 2,
                        sm: 2,
                        xl: 2,
                        xs: 2,
                    },
                    currentBreakpoint: "lg",
                }
                expect(store.dispatch).toHaveBeenCalledWith(assignSearchStateAction(dispatchValues))
            })
            it("should call the useSetBreakpoint", () => {
                expect(useSetBreakpoint).toHaveBeenCalled()
            })
            it("should return data from the API", () => {
                expect(props).toBeTruthy()
            })
            it("should return correct values", () => {
                expect(props).toEqual({isConfError: false})
            })
        })
    })

    describe("When the Plp getServerSideProps throws an error ", () => {
        it("should call the mockResponse.redirect", async () => {
            const mockRequest = {req: "test", query: {}}
            const mockResponse = {req: {siteUrl: {url: "test-SiteUrl"}}, locals: {}, redirect: jest.fn()}
            await getServerSideProps(mockRequest, mockResponse, {error: true} as any)

            expect(mockResponse.redirect).toHaveBeenCalledWith(302, `${mockResponse.req.siteUrl.url}/error`)
        })
    })
})
