export function Player(player = "human") {
  function attack(enemyBoard, x, y) {
    if (!enemyBoard) {
      throw new Error("Invalid board");
    }
    if (player === "human" && (x === undefined || y === undefined)) {
      throw new Error("Coordinates required");
    }

    return enemyBoard.receiveAttack(x, y);
  }
  return { attack };
}
