/* eslint-disable @typescript-eslint/no-floating-promises */
import * as Redux from "react-redux"
import {useRef} from "react"
import {renderHook, act, cleanup} from "@testing-library/react-hooks"
import useMediaQuery from "@mui/material/useMediaQuery"

import {useShowFilters} from "./useShowFilters"
import * as WindowUtils from "../../utils/window"
import * as ElementDimensionUtil from "../../utils/getElementInnerDimensions"
import * as DocumentScrollTopUtil from "../../utils/window/getDocumentScrollTop"
import * as SearchDuck from "../../ducks/search"

jest.mock("react", () => {
    const originReact = jest.requireActual("react")
    const mUseRef = jest.fn()
    return {
        ...originReact,
        useRef: mUseRef,
    }
})
jest.mock("@mui/material/useMediaQuery")

const originalUseRef = jest.requireActual("react").useRef
const mockedUseRef = useRef as jest.Mock
const mockedUseMediaQuery = useMediaQuery as jest.Mock
let getScrollTopSpy: jest.SpyInstance

function setMocks({shouldFacetsBeFixed = false} = {}) {
    jest.spyOn(WindowUtils, "addDocumentScrollListener")
    jest.spyOn(WindowUtils, "removeDocumentScrollListener")
    jest.spyOn(WindowUtils, "getWindow").mockReturnValue({innerWidth: 100} as any)
    jest.spyOn(ElementDimensionUtil, "getElementInnerDimensions").mockImplementation(val => ({
        height: val.clientHeight,
        width: 0,
    }))
    jest.spyOn(SearchDuck, "selectShouldFacetsBeFixed").mockReturnValue(shouldFacetsBeFixed)
    jest.spyOn(Redux, "useSelector").mockImplementation((selector: Function) => selector())
    getScrollTopSpy = jest.spyOn(DocumentScrollTopUtil, "getDocumentScrollTop")
}

describe("Given a useShowFacets hook", () => {
    beforeAll(() => {
        setMocks()
    })

    beforeEach(() => {
        getScrollTopSpy.mockReturnValue(0)
        mockedUseRef.mockImplementation(val => ({current: val ?? null}))
        mockedUseMediaQuery.mockReturnValue(true)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    afterAll(async () => {
        await cleanup()
        jest.restoreAllMocks()
    })

    it("should have the correct default values", () => {
        const {result} = renderHook(() => useShowFilters(false))

        expect(result.current).toEqual({
            facetAbsoluteTop: 0,
            facetsContainerRef: {
                current: null,
            },
            infoContainerTop: 0,
            infoContainerRef: {
                current: null,
            },
            containerRef: {
                current: null,
            },
            totalProductsHeight: 0,
            totalProductsRef: {
                current: null,
            },
            showFixedFacets: false,
            showOpenFilterBtn: false,
            handleOpenFilterBtnClick: expect.any(Function),
            underlayElementHeight: 0,
        })
    })

    describe("when mounted", () => {
        it("should add a scroll listener to the document", () => {
            renderHook(() => useShowFilters(false))

            expect(WindowUtils.addDocumentScrollListener).toHaveBeenCalledWith(expect.any(Function))
        })
    })

    describe("when unmounted", () => {
        it("should remove a scroll listener to the document", () => {
            const {unmount} = renderHook(() => useShowFilters(false))

            unmount()

            expect(WindowUtils.removeDocumentScrollListener).toHaveBeenCalledWith(expect.any(Function))
        })
    })

    describe("when document scrollTop is '0'", () => {
        it("should have the correct results when 'handleOpenFilterBtnClick' is called", async () => {
            const {result, waitForNextUpdate} = renderHook(() => useShowFilters(false))

            await act(async () => {
                result.current.handleOpenFilterBtnClick()
                await waitForNextUpdate()
            })

            expect(result.current).toEqual({
                facetAbsoluteTop: 25,
                facetsContainerRef: {
                    current: null,
                },
                infoContainerTop: 0,
                infoContainerRef: {
                    current: null,
                },
                containerRef: {
                    current: null,
                },
                totalProductsHeight: 0,
                totalProductsRef: {
                    current: null,
                },
                showFixedFacets: false,
                showOpenFilterBtn: false,
                handleOpenFilterBtnClick: expect.any(Function),
                underlayElementHeight: 0,
            })
        })

        describe("and when has reached footer", () => {
            it("should have the correct results when 'handleOpenFilterBtnClick' is called", () => {
                const {result} = renderHook(() => useShowFilters(true))

                act(() => {
                    result.current.handleOpenFilterBtnClick()
                })

                expect(result.current).toEqual({
                    facetAbsoluteTop: 0,
                    facetsContainerRef: {
                        current: null,
                    },
                    infoContainerTop: 0,
                    infoContainerRef: {
                        current: null,
                    },
                    containerRef: {
                        current: null,
                    },
                    totalProductsHeight: 0,
                    totalProductsRef: {
                        current: null,
                    },
                    showFixedFacets: false,
                    showOpenFilterBtn: false,
                    handleOpenFilterBtnClick: expect.any(Function),
                    underlayElementHeight: 0,
                })
            })
        })

        describe("when 'handleOpenFilterButton' is called", () => {
            it("should have the correct values when the clear filters text is 2 lines", async () => {
                mockedUseRef.mockImplementation(val => ({current: val ?? {clientHeight: 48}}))

                const {result} = renderHook(() => useShowFilters(false))

                await act(() => {
                    result.current.handleOpenFilterBtnClick()
                })

                expect(result.current).toEqual({
                    facetAbsoluteTop: 73,
                    facetsContainerRef: expect.any(Object),
                    infoContainerTop: 0,
                    infoContainerRef: expect.any(Object),
                    containerRef: expect.any(Object),
                    totalProductsHeight: 48,
                    totalProductsRef: {
                        current: {clientHeight: 48},
                    },
                    showFixedFacets: false,
                    showOpenFilterBtn: false,
                    handleOpenFilterBtnClick: expect.any(Function),
                    underlayElementHeight: 0,
                })
            })
        })
    })

    describe("when window object is not present", () => {
        it("should return the correct values", () => {
            jest.spyOn(WindowUtils, "getWindow").mockReturnValueOnce(null)

            const {result} = renderHook(() => useShowFilters(false))

            expect(result.current).toEqual({
                facetAbsoluteTop: 0,
                facetsContainerRef: {
                    current: null,
                },
                infoContainerTop: 0,
                infoContainerRef: {
                    current: null,
                },
                containerRef: {
                    current: null,
                },
                totalProductsHeight: 0,
                totalProductsRef: {
                    current: null,
                },
                showFixedFacets: false,
                showOpenFilterBtn: false,
                handleOpenFilterBtnClick: expect.any(Function),
                underlayElementHeight: 0,
            })
        })
    })

    describe("when document scrollTop is greater than '0'", () => {
        it("should have the correct results", async () => {
            getScrollTopSpy.mockReturnValueOnce(100)
            expect.assertions(1)

            const {result, waitFor} = renderHook(() => useShowFilters(false))

            await act(async () => {
                await waitFor(() => result.current.showFixedFacets, {timeout: 3000})
            })

            expect(result.current).toEqual({
                facetAbsoluteTop: 100,
                facetsContainerRef: {
                    current: null,
                },
                infoContainerTop: 0,
                infoContainerRef: {
                    current: null,
                },
                containerRef: {
                    current: null,
                },
                totalProductsHeight: 0,
                totalProductsRef: {
                    current: null,
                },
                showFixedFacets: true,
                showOpenFilterBtn: false,
                handleOpenFilterBtnClick: expect.any(Function),
                underlayElementHeight: 0,
            })
        })
    })

    describe("when scrolling down and facets are hidden", () => {
        it("should show open filter button", async () => {
            getScrollTopSpy.mockReturnValueOnce(0).mockReturnValueOnce(100)
            mockedUseRef.mockImplementation(val => ({current: val ?? {clientHeight: 10}}))

            const {result, waitFor} = renderHook(() => useShowFilters(false))

            await act(async () => {
                document.dispatchEvent(new Event("scroll"))
                await waitFor(() => result.current.showOpenFilterBtn, {timeout: 3000})
            })

            expect(result.current.showOpenFilterBtn).toBe(true)
        })
    })

    describe("when scrolling up after initial scroll top is greater than zero", () => {
        it("should keep the facets fixed", async () => {
            getScrollTopSpy.mockReturnValueOnce(-200).mockReturnValue(-110)

            const {result, waitForValueToChange} = renderHook(() => useShowFilters(false))

            result.current.containerRef.current = {clientHeight: 220} as any
            result.current.infoContainerRef.current = {offsetHeight: 100} as any
            result.current.facetsContainerRef.current = {clientHeight: 200} as any

            await act(async () => {
                document.dispatchEvent(new Event("scroll"))
                await waitForValueToChange(() => result.current.facetAbsoluteTop)
            })

            expect(result.current).toEqual({
                facetAbsoluteTop: -110,
                facetsContainerRef: expect.any(Object),
                infoContainerTop: 0,
                totalProductsHeight: 0,
                totalProductsRef: expect.any(Object),
                infoContainerRef: expect.any(Object),
                containerRef: expect.any(Object),
                showFixedFacets: true,
                showOpenFilterBtn: false,
                handleOpenFilterBtnClick: expect.any(Function),
                underlayElementHeight: 90,
            })
        })
    })

    describe("when external refs are not set", () => {
        it("should return defaults", () => {
            const {result} = renderHook(() => useShowFilters(false))

            act(() => {
                document.dispatchEvent(new Event("scroll"))
            })

            expect(result.current).toEqual({
                facetAbsoluteTop: 0,
                facetsContainerRef: {
                    current: null,
                },
                infoContainerTop: 0,
                infoContainerRef: {
                    current: null,
                },
                containerRef: {
                    current: null,
                },
                totalProductsHeight: 0,
                totalProductsRef: {
                    current: null,
                },
                showFixedFacets: false,
                showOpenFilterBtn: false,
                handleOpenFilterBtnClick: expect.any(Function),
                underlayElementHeight: 0,
            })
        })
    })

    describe("when on smaller screens  and scrollTop is more than '0'", () => {
        it("should return the correct values", () => {
            getScrollTopSpy.mockReturnValueOnce(200)
            mockedUseMediaQuery.mockReturnValue(false)
            const {result} = renderHook(() => useShowFilters(false))

            act(() => {
                document.dispatchEvent(new Event("scroll"))
            })

            expect(result.current).toEqual({
                facetAbsoluteTop: 200,
                facetsContainerRef: expect.any(Object),
                infoContainerTop: 0,
                totalProductsRef: expect.any(Object),
                totalProductsHeight: 0,
                infoContainerRef: expect.any(Object),
                containerRef: expect.any(Object),
                showFixedFacets: true,
                showOpenFilterBtn: false,
                handleOpenFilterBtnClick: expect.any(Function),
                underlayElementHeight: 0,
            })
        })
    })

    describe("when facets container height is greater than scrollTop", () => {
        it("should return the correct values", async () => {
            getScrollTopSpy.mockReturnValueOnce(100).mockReturnValueOnce(110)
            mockedUseRef.mockImplementation(val => {
                if (typeof val === "boolean") {
                    return {current: val}
                }
                if (val || val === 0) {
                    return {current: 100}
                }
                return {current: {clientHeight: 100, offsetHeight: 50}}
            })
            mockedUseMediaQuery.mockReturnValue(false)
            const {result, waitForNextUpdate} = renderHook(() => useShowFilters(false))

            await act(async () => {
                document.dispatchEvent(new Event("scroll"))
                await waitForNextUpdate()
            })

            expect(result.current).toEqual({
                containerRef: expect.any(Object),
                facetAbsoluteTop: 100,
                facetsContainerRef: expect.any(Object),
                handleOpenFilterBtnClick: expect.any(Function),
                infoContainerRef: expect.any(Object),
                infoContainerTop: 110,
                totalProductsRef: expect.any(Object),
                totalProductsHeight: 100,
                showFixedFacets: false,
                showOpenFilterBtn: false,
                underlayElementHeight: 0,
            })
        })
    })

    describe("when scrolling up", () => {
        it("should set infoContainer top to 0", () => {
            getScrollTopSpy.mockReturnValueOnce(110).mockReturnValueOnce(105)
            mockedUseRef.mockImplementation(val => {
                if (val || val === 0) {
                    return {current: 100}
                }
                return {current: {clientHeight: 400, offsetHeight: 50}}
            })
            mockedUseMediaQuery.mockReturnValue(false)
            const {result} = renderHook(() => useShowFilters(false))

            act(() => {
                document.dispatchEvent(new Event("scroll"))
            })

            expect(result.current.infoContainerTop).toBe(0)
        })

        describe("When scrolling up and scroll height is greater than facet top value", () => {
            it("should return different top value", async () => {
                jest.clearAllMocks()
                getScrollTopSpy.mockReset()
                getScrollTopSpy
                    .mockReturnValueOnce(0)
                    .mockReturnValueOnce(110)
                    .mockReturnValueOnce(105)
                    .mockReturnValueOnce(100)
                mockedUseRef.mockImplementation(val => originalUseRef(val))
                const {result, waitForValueToChange} = renderHook(() => useShowFilters(false))

                await act(async () => {
                    result.current.containerRef.current = {clientHeight: 100} as any
                    result.current.infoContainerRef.current = {offsetHeight: 10} as any
                    result.current.facetsContainerRef.current = {clientHeight: 10} as any
                    document.dispatchEvent(new Event("scroll"))
                    document.dispatchEvent(new Event("scroll"))
                    await waitForValueToChange(() => result.current.facetAbsoluteTop)
                })

                expect(result.current.facetAbsoluteTop).toBe(90)
            })
        })
    })

    describe("when scrolling up and facets are not fully visible", () => {
        it("should return correct absolute top value", async () => {
            getScrollTopSpy.mockReturnValueOnce(0).mockReturnValueOnce(150)
            mockedUseRef.mockImplementation(val => ({current: val === 0 ? 200 : val}))
            mockedUseMediaQuery.mockReturnValue(false)
            const {result, waitForValueToChange} = renderHook(() => useShowFilters(false))

            await act(async () => {
                result.current.containerRef.current = {clientHeight: 100} as any
                result.current.infoContainerRef.current = {offsetHeight: 10} as any
                result.current.facetsContainerRef.current = {clientHeight: 10} as any
                document.dispatchEvent(new Event("scroll"))
                await waitForValueToChange(() => result.current.facetAbsoluteTop)
            })

            expect(result.current.facetAbsoluteTop).toBe(140)
        })
    })

    describe("When `shouldFacetsBeFixed` is true on the search state", () => {
        it("should open the facets and disable the default behavior", () => {
            jest.clearAllMocks()
            setMocks({shouldFacetsBeFixed: true})
            getScrollTopSpy
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(150)
                .mockReturnValue(160)

            const {result, rerender} = renderHook(() => useShowFilters(false))

            act(() => {
                document.dispatchEvent(new Event("scroll"))
            })

            expect(DocumentScrollTopUtil.getDocumentScrollTop).toHaveBeenCalledTimes(1)

            expect(result.current.facetAbsoluteTop).toBe(25)
            expect(result.current.showFixedFacets).toBe(false)
            expect(result.current.showOpenFilterBtn).toBe(false)
            expect(result.current.infoContainerTop).toBe(0)
            ;(SearchDuck.selectShouldFacetsBeFixed as jest.Mock).mockReturnValue(false)

            rerender()

            expect(result.current).toEqual(
                expect.objectContaining({
                    facetAbsoluteTop: 150,
                    showFixedFacets: true,
                    showOpenFilterBtn: false,
                }),
            )
        })

        describe("and When opening the facets and disabling the default behavior", () => {
            it("should open the facets and disable the default behavior", () => {
                jest.clearAllMocks()
                mockedUseRef.mockImplementation(val => originalUseRef(val))
                setMocks({shouldFacetsBeFixed: true})
                getScrollTopSpy.mockReturnValueOnce(0).mockReturnValueOnce(150).mockReturnValueOnce(150)

                const {result, rerender} = renderHook(() => useShowFilters(false))

                act(() => {
                    document.dispatchEvent(new Event("scroll"))
                })

                expect(result.current.facetAbsoluteTop).toBe(25)
                expect(result.current.showFixedFacets).toBe(false)
                expect(result.current.showOpenFilterBtn).toBe(false)
                expect(result.current.infoContainerTop).toBe(0)
                ;(SearchDuck.selectShouldFacetsBeFixed as jest.Mock).mockReturnValue(false)

                rerender()

                expect(result.current).toEqual(
                    expect.objectContaining({
                        facetAbsoluteTop: 150,
                        showFixedFacets: true,
                        showOpenFilterBtn: false,
                    }),
                )
            })
        })
    })

    describe("When has reached footer", () => {
        it("should hide open filter button", () => {
            jest.clearAllMocks()
            getScrollTopSpy.mockReturnValueOnce(150)

            const {result} = renderHook(() => useShowFilters(true))

            act(() => {
                document.dispatchEvent(new Event("scroll"))
            })

            expect(result.current.showOpenFilterBtn).toBe(false)
        })
    })
})
