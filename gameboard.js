function createGrid(value) {
  const rows = 10;
  const columns = 10;

  const twoDArray = Array.from({ length: rows }, () =>
    new Array(columns).fill(value),
  );

  return twoDArray;
}

export function Gameboard() {
  const shipsGrid = createGrid(null);
  const attackGrid = createGrid(false);
  const shipsPlaced = [];

  function getShipCoords(x, y, direction, ship) {
    const coords = [];
    const len = ship.getLength();

    if (len <= 0) {
      throw new Error("invalid ship length");
    }

    if (direction !== "horizontal" && direction !== "vertical") {
      throw new Error("invalid direction");
    }

    for (let i = 0; i < len; i++) {
      if (direction === "horizontal") {
        coords.push([x + i, y]);
      } else {
        coords.push([x, y + i]);
      }
    }
    return coords;
  }

  function placeShip(x, y, direction, ship) {
    if (shipsPlaced.includes(ship)) {
      throw new Error("Ship already placed");
    }

    const coords = getShipCoords(x, y, direction, ship);

    for (let i = 0; i < coords.length; i++) {
      const cx = coords[i][0];
      const cy = coords[i][1];

      if (cx < 0 || cx >= 10 || cy < 0 || cy >= 10) {
        throw new Error("Out of bounds");
      }

      if (shipsGrid[cy][cx] !== null) {
        throw new Error("Overlap");
      }
    }

    for (let i = 0; i < coords.length; i++) {
      const cx = coords[i][0];
      const cy = coords[i][1];

      shipsGrid[cy][cx] = ship;
    }

    shipsPlaced.push(ship);
  }

  function receiveAttack(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Invalid attack");
    }

    if (attackGrid[y][x] === true) {
      return "repeat";
    }

    attackGrid[y][x] = true;

    if (shipsGrid[y][x] === null) {
      return "miss";
    }

    shipsGrid[y][x].hit();

    return "hit";
  }

  function allShipsSunk() {
    if (shipsPlaced.length === 0) return false;
    return shipsPlaced.every((ship) => ship.isSunk());
  }

  return {
    placeShip,
    allShipsSunk,
    receiveAttack,
  };
}
