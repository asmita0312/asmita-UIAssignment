/**
 * calculating reward points
 * @param {*} amount 
 * @returns calculated amount
 */
function calculatePoints(amount) {
  if (amount > 100) {
    return (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    return (amount - 50);
  }
  return 0;
}

module.exports = { calculatePoints }