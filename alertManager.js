/**
 * Alert Manager
 * Manages alert visibility based on bin status.
 */

import { showAlert, hideAlert } from './dashboard.js';

/**
 * Evaluate bin status and show/hide alert for that bin.
 * @param {import('./types').Bin} bin
 */
export function evaluateAlert(bin) {
  if (bin.status === 'Full') {
    showAlert(bin.id);
  } else {
    hideAlert(bin.id);
  }
}
