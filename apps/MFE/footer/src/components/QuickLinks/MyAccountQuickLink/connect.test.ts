import logger from "@monorepo/core-logger"
import {mockState} from "../../../../__mocks__/mockStore"
import {mapStateToProps, mergeProps} from "./connect"

jest.mock("@monorepo/core-logger", () => ({
    error: jest.fn(),
}))

const mockMyAccountLoggedInInput = {
    url: "/secure/accounts/transfers",
    openInNewWindow: false,
    name: "",
    type: "MyAccountLoggedIn",
    icon: "",
    text: "<username>",
    accessibilityText: "",
    tooltip: "",
    accessibilityTooltip: "",
    description: "",
    accessibilityDescription: "",
}
const mockMyAccountLoggedOutInput = {
    url: "/secure/accounts/transfers",
    openInNewWindow: false,
    name: "",
    type: "MyAccountLoggedOut",
    icon: "",
    text: "My account",
    accessibilityText: "",
    tooltip: "",
    accessibilityTooltip: "",
    description: "",
    accessibilityDescription: "",
}

describe("Given connect", () => {
    describe(" - mapStateToProps()", () => {
        it("should project state and only return users", () => {
            expect(mapStateToProps(mockState)).toEqual({user: mockState.user})
        })
    })
    describe(" - mergeProps()", () => {
        it("should match the properities with the user logged in ", () => {
            expect(
                mergeProps(
                    {
                        user: {
                            loggedIn: true,
                            accountFirstName: "Chris",
                        },
                    },
                    {dispatch: ""},
                    {loggedIn: mockMyAccountLoggedInInput},
                ),
            ).toEqual({
                ...mockMyAccountLoggedInInput,
                text: "Chris",
                url: mockMyAccountLoggedInInput.url,
            })
        })
        it("should match the properities with the user logged out ", () => {
            expect(
                mergeProps(
                    {
                        user: {
                            loggedIn: false,
                            accountFirstName: "",
                        },
                    },
                    {dispatch: ""},
                    {loggedOut: mockMyAccountLoggedOutInput},
                ),
            ).toEqual({
                ...mockMyAccountLoggedOutInput,
                url: mockMyAccountLoggedOutInput.url,
            })
        })

        describe("when text does not contain <username>", () => {
            it("should called logger error when text does not contain <username> ", () => {
                const mergePropsFn = mergeProps(
                    {
                        user: {
                            loggedIn: true,
                            accountFirstName: "Chris",
                        },
                    },
                    {dispatch: ""},
                    {
                        loggedIn: {
                            ...mockMyAccountLoggedInInput,
                            text: "example",
                        },
                    },
                )

                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(logger.error).toHaveBeenCalled()
                // eslint-disable-next-line @typescript-eslint/unbound-method
                expect(logger.error).toHaveBeenCalledWith(
                    "INVALID QUICKLINKS LOGOUT TEXT JSON - Does not contain <username>",
                )

                expect(mergePropsFn).toEqual({
                    ...mockMyAccountLoggedInInput,
                    text: "Chris",
                    url: mockMyAccountLoggedInInput.url,
                })
            })
        })
    })
})
