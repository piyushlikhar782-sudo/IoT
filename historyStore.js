/**
 * History Store
 * Tracks the last 10 fill level readings per bin.
 */

/** @type {Map<string, number[]>} */
const history = new Map();

/**
 * Append a new reading; trims to last 10.
 * @param {string} binId
 * @param {number} fillLevel
 */
export function appendReading(binId, fillLevel) {
  const readings = history.get(binId) ?? [];
  readings.push(fillLevel);
  history.set(binId, readings.slice(-10));
}

/**
 * Get readings for a bin (ordered oldest to newest).
 * @param {string} binId
 * @returns {number[]}
 */
export function getHistory(binId) {
  return history.get(binId) ?? [];
}
