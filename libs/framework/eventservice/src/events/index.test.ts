import Events from "./index"


describe("Given Constants", () => {
  describe("Should match expected", () => {
    it("should match expected snapshop", () => {
      expect(Events).toMatchSnapshot()
    })
  })
})