import quicklinks from "./categoryQuickLinks.json"

describe("Given Quicklinks", () => {
    it("Should match snapshot", () => {
        expect(quicklinks).toMatchSnapshot()
    })

    const mpTags = {                       
        mpStart: "<!-- mp_trans_enable_start -->",
        mpEnd: "<!-- mp_trans_enable_end -->"
    }
    describe("and given Uk territories", () => {
        it("should not have mp tags in each entry", () => {
            quicklinks.amido.uk.forEach((quicklinkProps) => {
                expect(quicklinkProps).toEqual(
                    expect.not.objectContaining(mpTags)
                )
            })
        })
    })
    describe("and given International territories", () => {
        it("should have mp tags in each entry", () => {
            quicklinks.amido.international.forEach((quicklinkProps) => {
                expect(quicklinkProps).toEqual(
                    expect.objectContaining(mpTags)
                )
            })
        })
    })
})

