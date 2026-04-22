/**
 * Simulator Module
 * Responsible for generating and validating fill level values.
 */

/**
 * Generate a random fill level integer in [0, 100].
 * @returns {number}
 */
export function randomFillLevel() {
  return Math.floor(Math.random() * 101);
}

/**
 * Validate a user-provided fill level value.
 * @param {string} input
 * @returns {{ valid: boolean, value?: number, error?: string }}
 */
export function validateFillLevel(input) {
  const trimmed = typeof input === 'string' ? input.trim() : input;
  const num = Number(trimmed);
  if (trimmed === '' || trimmed === null || trimmed === undefined || !Number.isInteger(num)) {
    return { valid: false, error: 'Fill level must be an integer between 0 and 100' };
  }
  if (num < 0 || num > 100) {
    return { valid: false, error: 'Fill level must be between 0 and 100' };
  }
  return { valid: true, value: num };
}
