const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    test("return an array", () => {
        expect(shuffleArray([])).toEqual([])
    })
    test("items are shuffled", () => {
        expect(shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).not.toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
})