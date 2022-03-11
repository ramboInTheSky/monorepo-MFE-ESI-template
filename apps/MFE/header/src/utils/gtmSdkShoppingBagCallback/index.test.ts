import * as doUserVariablesUtil from "../featureSwitch"
import * as WindowUtils from "../window"
import {setBackDataInSession} from "."

jest.mock("../window")
function mockDoUserVariables(value) {
    jest.spyOn(doUserVariablesUtil, "doUserVariables").mockReturnValue(value)
}

function mockWindow(setItem) {
    jest.spyOn(WindowUtils, "getWindow").mockReturnValue({
        sessionStorage: {
            setItem,
        },
    } as any)
}

function mockScenario(canDoUserVariable, setItem) {
    mockDoUserVariables(canDoUserVariable)
    mockWindow(setItem)
}

describe("Given a gtmSdkShoppingBagCallback()", () => {
    afterAll(() => {
        jest.restoreAllMocks()
    })

    describe("When do user variable is false", () => {
        it("should not set user details", () => {
            const setItemMock = jest.fn()
            mockScenario(false, setItemMock)
            setBackDataInSession({
                data: {
                    RoamingProfileId: "test-id",
                    ShoppingBag: {Authenticated: false, NextUnlimitedStatus: 0},
                },
            })
            expect(setItemMock).not.toHaveBeenCalledWith()
        })
    })

    describe("When do user variable is true and user is not authenticated", () => {
        it("should set user details to session storage", () => {
            const setItemMock = jest.fn()
            mockScenario(true, setItemMock)
            setBackDataInSession({
                data: {
                    RoamingProfileId: "test-id",
                    ShoppingBag: {Authenticated: false, NextUnlimitedStatus: 0},
                },
            })
            expect(setItemMock).toHaveBeenCalledWith("RPID", "test-id")
        })
    })

    describe("When do user variable is true and user is authenticated", () => {
        it("should set user details to session storage", () => {
            const setItemMock = jest.fn()
            mockScenario(true, setItemMock)
            setBackDataInSession({
                data: {
                    RoamingProfileId: "test-id",
                    ShoppingBag: {Authenticated: true, NextUnlimitedStatus: 0, AccountType: "test-account"},
                },
            })
            expect(setItemMock).toHaveBeenCalledWith("RPID", "test-id")
            expect(setItemMock).toHaveBeenCalledWith("AcctType", "test-account")
            expect(setItemMock).toHaveBeenCalledWith("unlimitedCustomer", "false")
        })
    })

    describe("When do user variable is true and user is authenticated and NextUnlimitedStatus is not 0", () => {
        it("should set user details to session storage", () => {
            const setItemMock = jest.fn()
            mockScenario(true, setItemMock)
            setBackDataInSession({
                data: {
                    RoamingProfileId: "test-id",
                    ShoppingBag: {Authenticated: true, NextUnlimitedStatus: 3, AccountType: "test-account"},
                },
            })
            expect(setItemMock).toHaveBeenCalledWith("RPID", "test-id")
            expect(setItemMock).toHaveBeenCalledWith("AcctType", "test-account")
            expect(setItemMock).toHaveBeenCalledWith("unlimitedCustomer", "true")
        })
    })
})
