/* eslint-disable @typescript-eslint/unbound-method */
import {ModalsCloseESB} from "@monorepo/eventservice"
import {PublishToModalsClosed} from "."

jest.mock("@monorepo/eventservice")

it("should call publishToModalsClosed", () => {
    PublishToModalsClosed()
    expect(ModalsCloseESB.prototype.publish).toHaveBeenCalled()
})
