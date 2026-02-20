import { Player } from "../player.js";

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

describe("Computer Player", () => {
  test("calls board with valid coordinates (0-9)", () => {
    const calls = [];
    const fakeBoard = {
      receiveAttack: (x, y) => {
        calls.push([x, y]);
        return "miss";
      },
    };

    const cpu = Player("computer");
    cpu.attack(fakeBoard);

    const [x, y] = calls[0];
    expect(x).toBeGreaterThanOrEqual(0);
    expect(x).toBeLessThan(10);
    expect(y).toBeGreaterThanOrEqual(0);
    expect(y).toBeLessThan(10);
  });

  test("never attacks the same coordinate twice", () => {
    const calls = [];
    const fakeBoard = {
      receiveAttack: (x, y) => {
        calls.push(`${x},${y}`);
        return "miss";
      },
    };

    const cpu = Player("computer");

    for (let i = 0; i < 50; i++) {
      cpu.attack(fakeBoard);
    }

    const unique = new Set(calls);
    expect(unique.size).toBe(calls.length);
  });

  test("returns the board result unchanged", () => {
    const fakeBoard = {
      receiveAttack: () => "hit",
    };

    const cpu = Player("computer");
    const result = cpu.attack(fakeBoard);

    expect(result).toBe("hit");
  });

  test("throws when no moves left (after 100 attacks)", () => {
    const fakeBoard = {
      receiveAttack: () => "miss",
    };

    const cpu = Player("computer");

    for (let i = 0; i < 100; i++) {
      cpu.attack(fakeBoard);
    }

    expect(() => cpu.attack(fakeBoard)).toThrow();
  });
});
