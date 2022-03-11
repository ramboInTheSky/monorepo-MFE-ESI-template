import React from "react"
import {render} from "@testing-library/react"
import logger from "@monorepo/core-logger"
import LogoutQuickLinkText from "."

describe("QuickLinks - LogoutQuickLinkText", () => {
    describe("When it replaces <username> with TestFirstName", () => {
        const props = {
            text: "Not <username>?",
            accountFirstName: "TestFirstName",
            textColor: "#000",
        }

        const Component = <LogoutQuickLinkText {...props} />

        it("should match the snapshot", () => {
            const {asFragment} = render(Component)
            expect(asFragment()).toMatchSnapshot()
        })

        it("should match the snapshot with props", () => {
            const {getByTestId} = render(Component)
            expect(getByTestId("footer-quick-links-logout-text")).toHaveTextContent("Not TestFirstName?")
        })
    })
    describe("When logs out as <username> does not exist", () => {
        const props = {
            text: "Not <id>?",
            accountFirstName: "TestFirstName",
            textColor: "#000",
        }

        const Component = <LogoutQuickLinkText {...props} />

        it("should return null from the snapshot and return a message from the logger.error()", () => {
            const fooSpy = jest.spyOn(logger, "error")
            const {asFragment} = render(Component)
            expect(asFragment()).toMatchSnapshot()
            expect(fooSpy).toHaveBeenCalled()
            expect(fooSpy).toHaveBeenCalledWith("INVALID QUICKLINKS LOGOUT TEXT JSON - Does not contain <username>")
        })
    })
})
