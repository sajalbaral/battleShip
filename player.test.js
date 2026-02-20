import { Player } from "./player.js";

test("forwards attack to the board and returns result", () => {
  const fakeBoard = {
    receiveAttack: jest.fn(() => "miss"),
  };

  const player = Player("human");
  const result = player.attack(fakeBoard, 2, 3);

  expect(result).toBe("miss");
  expect(fakeBoard.receiveAttack).toHaveBeenCalledWith(2, 3);
});

test("throws if board is invalid", () => {
  const player = Player("human");

  expect(() => player.attack(null, 0, 0)).toThrow();
  expect(() => player.attack({}, 0, 0)).toThrow();
  expect(() => player.attack({ receiveAttack: 5 }, 0, 0)).toThrow();
});

test("human player requires coordinates", () => {
  const fakeBoard = {
    receiveAttack: jest.fn(),
  };

  const player = Player("human");

  expect(() => player.attack(fakeBoard)).toThrow();
});

test("returns whatever the board returns unchanged", () => {
  const fakeBoard = {
    receiveAttack: jest.fn(() => "repeat"),
  };

  const player = Player("human");
  const result = player.attack(fakeBoard, 1, 1);

  expect(result).toBe("repeat");
});
