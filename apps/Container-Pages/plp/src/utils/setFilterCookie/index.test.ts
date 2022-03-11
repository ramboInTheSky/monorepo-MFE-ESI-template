/* eslint-disable @typescript-eslint/unbound-method */
import Cookies from "js-cookie"
import setFilterCookie from "."
import {mockDateConstructor} from "../../../__mocks__/setDate"
import {SearchApiRequestTypes} from "../../config/constants"

jest.mock("js-cookie", () => ({
    getJSON: jest.fn(() => ({page: "red", filterCategorySettings: {}})),
    set: jest.fn(),
}))

describe("Given a setFilterCookie", () => {
    describe("When setting the filter cookie for a keyword", () => {
        const expectedCookie = {page: "red", filterCategorySettings: {Size: {isOpen: true, viewMoreOpened: true}}}
        beforeAll(() => {
            mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))
            setFilterCookie(
                "red",
                SearchApiRequestTypes.Keyword,
                "http://www.test.com/search?w=red",
                "http://www.test.com",
                "Size",
                true,
                true,
            )
        })
        it("Should get the cookie", () => {
            expect(Cookies.getJSON).toHaveBeenCalledWith("filterSettings")
        })

        it("Should set the cookie", () => {
            expect(Cookies.set).toHaveBeenCalledWith("filterSettings", JSON.stringify(expectedCookie), {
                path: "/",
                domain: "www.test.com",
                expires: new Date("2019-12-08T08:00:00.000Z"),
            })
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })

    describe("When setting the filter cookie for a category", () => {
        const expectedCookie = {page: "test", filterCategorySettings: {Size: {isOpen: true, viewMoreOpened: true}}}
        beforeAll(() => {
            mockDateConstructor(new Date("2019-12-08T07:00:00.000Z"))
            setFilterCookie(
                "red",
                SearchApiRequestTypes.Category,
                "http://www.test.com/shop/test/blue",
                "http://www.test.com",
                "Size",
                true,
                true,
            )
        })
        it("Should get the cookie", () => {
            expect(Cookies.getJSON).toHaveBeenCalledWith("filterSettings")
        })

        it("Should set the cookie", () => {
            expect(Cookies.set).toHaveBeenCalledWith("filterSettings", JSON.stringify(expectedCookie), {
                path: "/",
                domain: "www.test.com",
                expires: new Date("2019-12-08T08:00:00.000Z"),
            })
        })
        afterAll(() => {
            jest.clearAllMocks()
        })
    })
})
