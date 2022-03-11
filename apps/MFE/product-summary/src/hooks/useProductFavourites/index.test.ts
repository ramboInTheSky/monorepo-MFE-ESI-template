/* eslint-disable import/no-extraneous-dependencies */
import {renderHook, act} from "@testing-library/react-hooks"
import {FavouriteState} from "../../models/Favourites"
import {useProductFavourites} from "."

jest.useFakeTimers()

describe("Given useProductFavourites", () => {
    const props = {
        isFav: false,
        addToFavourites: jest.fn(),
        removeFromFavourites: jest.fn(),
        isLoadingFav: false,
        setFavClicked: jest.fn(),
    }

    beforeEach(() => {
        props.addToFavourites.mockReset()
        props.removeFromFavourites.mockReset()
    })

    it("should return the correct defaults", () => {
        const {result} = renderHook(() => useProductFavourites(props))
        expect(result.current).toEqual({
            toggleProductFavourites: expect.any(Function),
            favState: FavouriteState.Inactive,
        })
    })

    describe("useEffect and toggleAnimation", () => {
        it("should called toggleAnimation when isFav is true", () => {
            const newProps = {
                ...props,
                isFav: true,
            }
            const {result} = renderHook(() => useProductFavourites(newProps))

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            act(() => {
                jest.runOnlyPendingTimers()
            })
            expect(result.current.favState).toBe(FavouriteState.Active)

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            act(() => {
                jest.runOnlyPendingTimers()
            })
        })
        it("should called toggleAnimation when isFav is false", () => {
            const newProps = {
                ...props,
                isFav: false,
            }
            const {result} = renderHook(() => useProductFavourites(newProps))

            expect(result.current.favState).toBe(FavouriteState.Inactive)
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            act(() => {
                jest.runOnlyPendingTimers()
            })
            expect(result.current.favState).toBe(FavouriteState.Inactive)
        })
    })
    describe("toggleProductFavourites", () => {
        describe("when it is not loading", () => {
            it("should called addToFavourites", () => {
                const {result} = renderHook(() => useProductFavourites(props))
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                act(() => {
                    result.current.toggleProductFavourites()
                })

                expect(props.addToFavourites).toHaveBeenCalled()
                expect(props.setFavClicked).toBeCalledWith(true)
                expect(result.current.favState).toBe(FavouriteState.Loading)
            })
            it("should called removeFromFavourites", () => {
                const newProps = {
                    ...props,
                    isFav: true,
                }
                const {result} = renderHook(() => useProductFavourites(newProps))
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                act(() => {
                    result.current.toggleProductFavourites()
                })

                expect(props.removeFromFavourites).toHaveBeenCalled()
                expect(result.current.favState).toBe(FavouriteState.Loading)
            })
        })
        describe("when it is loading", () => {
            it("should not called addToFavourites", () => {
                const newProps = {
                    ...props,
                    isLoadingFav: true

                }
                const {result} = renderHook(() => useProductFavourites(newProps))
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                act(() => {
                    result.current.toggleProductFavourites()
                })

                expect(props.addToFavourites).not.toHaveBeenCalled()
                expect(result.current.favState).toBe(FavouriteState.Loading)
            })
            it("should not called removeFromFavourites", () => {
                const newProps = {
                    ...props,
                    isFav: true,
                    isLoadingFav: true

                }
                const {result} = renderHook(() => useProductFavourites(newProps))
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                act(() => {
                    result.current.toggleProductFavourites()
                })

                expect(props.removeFromFavourites).not.toHaveBeenCalled()
                expect(result.current.favState).toBe(FavouriteState.Loading)
            })
        })
    })
})
