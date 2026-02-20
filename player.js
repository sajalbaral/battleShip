export function Player(type = "human") {
  const tried = new Set();

  function attack(enemyBoard, x, y) {
    if (!enemyBoard) {
      throw new Error("Invalid board");
    }

    if (type === "human") {
      if (x === undefined || y === undefined) {
        throw new Error("Coordinates required");
      }
      return enemyBoard.receiveAttack(x, y);
    }

    if (type === "computer") {
      if (tried.size >= 100) {
        throw new Error("No moves left");
      }

      let cx, cy, key;
      do {
        cx = Math.floor(Math.random() * 10);
        cy = Math.floor(Math.random() * 10);
        key = `${cx},${cy}`;
      } while (tried.has(key));

      tried.add(key);
      return enemyBoard.receiveAttack(cx, cy);
    }

    throw new Error("Invalid player type");
  }

  return { attack };
}
