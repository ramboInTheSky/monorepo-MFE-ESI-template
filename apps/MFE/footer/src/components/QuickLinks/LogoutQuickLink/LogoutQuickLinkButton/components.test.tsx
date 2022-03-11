import {LogoutLinkComponent} from "./components"

describe("LogoutQuickLinkButton: ", () => {
    describe("LogoutLinkComponent: ", () => {
        it("should match the snapshot ", () => {
            expect(LogoutLinkComponent).toMatchSnapshot()
        })
    })
})
