export function Ship(length) {
  let hits = 0;

  function hit() {
    if (hits < length) {
      hits++;
      return hits === length;
    }
    return false;
  }

  function isSunk() {
    return hits === length;
  }

  return { hit, isSunk };
}
