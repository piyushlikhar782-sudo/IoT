/**
 * Dashboard UI — renders bin cards and manages DOM updates
 */

import { renderChart } from './chart.js';

function progressClass(fillLevel) {
  if (fillLevel >= 67) return 'full';
  if (fillLevel >= 34) return 'half';
  return '';
}

export function renderDashboard(bins) {
  for (const bin of bins) {
    updateBinCard(bin, []);
  }
}

export function updateBinCard(bin, history) {
  const { id, fillLevel, weight, status, timestamp, sensor, cloudSynced, location } = bin;

  const progress = document.getElementById(`progress-${id}`);
  if (progress) {
    progress.style.width = `${fillLevel}%`;
    progress.className = 'progress-bar';
    const cls = progressClass(fillLevel);
    if (cls) progress.classList.add(cls);
  }

  const level = document.getElementById(`level-${id}`);
  if (level) level.textContent = fillLevel;

  const weightEl = document.getElementById(`weight-${id}`);
  if (weightEl) weightEl.textContent = weight !== undefined ? weight.toFixed(1) : '0.0';

  const statusEl = document.getElementById(`status-${id}`);
  if (statusEl) {
    statusEl.textContent = status;
    statusEl.className = 'bin-status status-' + status.toLowerCase().replace(' ', '-');
  }

  const timestampEl = document.getElementById(`timestamp-${id}`);
  if (timestampEl) {
    timestampEl.textContent = timestamp
      ? new Date(timestamp).toLocaleTimeString()
      : '—';
  }

  const ultrasonicEl = document.getElementById(`ultrasonic-${id}`);
  if (ultrasonicEl && sensor) ultrasonicEl.textContent = sensor.ultrasonic;

  const loadCellEl = document.getElementById(`loadcell-${id}`);
  if (loadCellEl && sensor) loadCellEl.textContent = (sensor.loadCell || 0).toFixed(1);

  const syncEl = document.getElementById(`sync-${id}`);
  if (syncEl) {
    syncEl.textContent = cloudSynced ? '☁ Synced' : '⏳ Pending';
    syncEl.className = 'sync-badge ' + (cloudSynced ? 'synced' : 'pending');
  }

  const locationEl = document.getElementById(`location-${id}`);
  if (locationEl && location) locationEl.textContent = location.address;

  renderChart(`chart-${id}`, history);
}

export function showAlert(binId) {
  const el = document.getElementById(`alert-${binId}`);
  if (el) el.classList.add('visible');
}

export function hideAlert(binId) {
  const el = document.getElementById(`alert-${binId}`);
  if (el) el.classList.remove('visible');
}
