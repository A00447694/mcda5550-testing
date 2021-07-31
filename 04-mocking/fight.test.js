const fight = require("./fight");
const utils = require("./utils")

jest.mock('./utils', () => {
    return {
        getWinner: jest.fn((b1, b2) => b2)
    }
})

test('Winner is Elon Musk', () => {
    const winner = fight('Jeff Bezos', 'Elon Musk')
    expect(winner).toBe('Elon Musk')

    // cleanup
    utils.getWinner.mockReset()
})


