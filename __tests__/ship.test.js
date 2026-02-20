import { Ship } from "../ship.js";

test("new ship is not sunk", () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test("sinks after being hit length times", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("hit() returns true only on the hit that causes sinking", () => {
  const ship = new Ship(2);
  expect(ship.hit()).toBe(false);
  expect(ship.hit()).toBe(true);
});

test("extra hits after sinking do not break state", () => {
  const ship = new Ship(1);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
