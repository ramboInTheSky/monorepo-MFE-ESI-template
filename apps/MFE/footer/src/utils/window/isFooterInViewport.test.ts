import * as windowUtils from "."
import isFooterInViewport from "./isFooterInViewport"

jest.mock(".")

describe("Given a isFooterInViewport()", () => {
    describe("When window exists and footer is within the view port", () => {
        beforeAll(() => {
            jest.spyOn(windowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {
                            getElementById: jest.fn(() => ({
                                getBoundingClientRect: jest.fn(() => ({
                                    bottom: 5,
                                    right: 5,
                                    left: 0,
                                    top: 5,
                                })),
                            })),
                        },
                        innerWidth: 10,
                        innerHeight: 10,
                    } as any),
            )
        })
        it("should return true", () => {
            expect(isFooterInViewport()).toEqual(true)
        })
    })

    describe("When window exists and the footer is outside the viewport", () => {
        beforeAll(() => {
            jest.spyOn(windowUtils, "getWindow").mockImplementationOnce(
                () =>
                    ({
                        document: {
                            getElementById: jest.fn(() => ({
                                getBoundingClientRect: jest.fn(() => ({
                                    bottom: 5,
                                    right: 5,
                                    left: 0,
                                    top: 15,
                                })),
                            })),
                        },
                        innerWidth: 10,
                        innerHeight: 10,
                    } as any),
            )
        })
        it("should return false", () => {
            expect(isFooterInViewport()).toEqual(false)
        })
    })

    describe("When window does not exist", () => {
        it("should return", () => {
            jest.spyOn(windowUtils, "getWindow").mockImplementationOnce(() => null)
            expect(isFooterInViewport()).toEqual(false)
        })
    })

    afterEach(() => {
        jest.resetAllMocks()
    })
})
