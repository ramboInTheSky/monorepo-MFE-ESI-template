import {GeolocationModel} from "."

describe("Model - GeolocationModel: ", () => {
    it("should match the GeolocationModel snapshot", () => {
        expect(new GeolocationModel()).toMatchSnapshot()
    })
})
