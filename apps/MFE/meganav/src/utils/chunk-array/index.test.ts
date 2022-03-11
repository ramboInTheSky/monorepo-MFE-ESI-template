import chunkArray from "."

describe("Split array into chunks", () => {
    it("Should split an array into chunks", () => {
        const splitNo = 2
        const items = [1, 2, 3, 4, 5, 6]
        const expected = [
            [1, 2],
            [3, 4],
            [5, 6],
        ]
        const got = chunkArray(items, splitNo)
        expect(got).toEqual(expected)
    })
})
