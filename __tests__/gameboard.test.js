import { Gameboard } from "../gameboard.js";
import { Ship } from "../ship.js";

test("attacking an empty cell returns miss", () => {
  const board = Gameboard();
  expect(board.receiveAttack(0, 0)).toBe("miss");
});

test("placing a horizontal ship makes its cells hittable", () => {
  const board = Gameboard();
  board.placeShip(0, 0, "horizontal", Ship(3));

  expect(board.receiveAttack(0, 0)).toBe("hit");
  expect(board.receiveAttack(1, 0)).toBe("hit");
  expect(board.receiveAttack(2, 0)).toBe("hit");
});

test("re-attacking the same cell returns repeat", () => {
  const board = Gameboard();
  expect(board.receiveAttack(0, 0)).toBe("miss");
  expect(board.receiveAttack(0, 0)).toBe("repeat");
});

test("cannot place ship off-board (and it does not partially place)", () => {
  const board = Gameboard();
  expect(() => board.placeShip(9, 0, "horizontal", Ship(2))).toThrow();

  expect(board.receiveAttack(9, 0)).toBe("miss");
});

test("cannot overlap ships", () => {
  const board = Gameboard();
  board.placeShip(0, 0, "horizontal", Ship(3));
  expect(() => board.placeShip(2, 0, "vertical", Ship(2))).toThrow();
});

test("allShipsSunk becomes true when all placed ships are sunk", () => {
  const board = Gameboard();
  board.placeShip(0, 0, "horizontal", Ship(2));
  board.placeShip(0, 2, "horizontal", Ship(1));

  expect(board.allShipsSunk()).toBe(false);

  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  board.receiveAttack(0, 2);

  expect(board.allShipsSunk()).toBe(true);
});
