/**
 * Bin State Store
 * Single source of truth for all bin states.
 */

/** @type {Map<string, Bin>} */
const bins = new Map();

function deriveStatus(fillLevel) {
  if (fillLevel <= 33) return 'Empty';
  if (fillLevel <= 66) return 'Half Full';
  return 'Full';
}

export function initBins(count) {
  bins.clear();
  const locations = [
    { lat: 28.6139, lng: 77.2090, address: 'Connaught Place, Delhi' },
    { lat: 19.0760, lng: 72.8777, address: 'Bandra West, Mumbai' },
    { lat: 12.9716, lng: 77.5946, address: 'Koramangala, Bangalore' },
  ];
  for (let i = 1; i <= count; i++) {
    const id = `bin-${i}`;
    bins.set(id, {
      id,
      fillLevel: 0,
      weight: 0,
      status: 'Empty',
      timestamp: '',
      location: locations[i - 1],
      sensor: { ultrasonic: 0, loadCell: 0 },
      cloudSynced: false,
    });
  }
}

export function updateBin(binId, fillLevel, weight) {
  const bin = bins.get(binId);
  if (!bin) return null;
  bin.fillLevel = fillLevel;
  bin.weight = weight !== undefined ? weight : Math.round(fillLevel * 0.5 * 10) / 10;
  bin.status = deriveStatus(fillLevel);
  bin.timestamp = new Date().toISOString();
  bin.sensor = {
    ultrasonic: Math.round((100 - fillLevel) * 2.4), // cm distance from sensor
    loadCell: bin.weight,
  };
  bin.cloudSynced = false;
  return bin;
}

export function markSynced(binId) {
  const bin = bins.get(binId);
  if (bin) bin.cloudSynced = true;
}

export function getBins() {
  return Array.from(bins.values());
}

export function getBin(binId) {
  return bins.get(binId) ?? null;
}
