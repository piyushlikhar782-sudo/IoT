# Implementation Plan: IoT Waste Management

## Overview

Implement a browser-only, zero-dependency IoT waste bin monitoring simulation using vanilla HTML/CSS/JS. Six JS modules are built incrementally, wired together in a single HTML page, and validated with fast-check property tests and unit tests.

## Tasks

- [x] 1. Set up project structure and core files
  - Create `index.html` with bin card markup (2–3 bins), progress bars, input fields, set/randomize buttons, alert banners, and canvas elements for charts
  - Create empty module stubs: `simulator.js`, `binStore.js`, `historyStore.js`, `alertManager.js`, `dashboard.js`, `chart.js`
  - Create `tests/` directory with empty test files: `simulator.test.js`, `binStore.test.js`, `historyStore.test.js`, `alertManager.test.js`, `dashboard.test.js`
  - Add `package.json` with `vitest` and `fast-check` as dev dependencies and a `jsdom` test environment
  - _Requirements: 1.1, 3.5_

- [x] 2. Implement Simulator module
  - [x] 2.1 Implement `randomFillLevel()` and `validateFillLevel(input)` in `simulator.js`
    - `randomFillLevel` returns a random integer in [0, 100]
    - `validateFillLevel` returns `{ valid: true, value }` for integers 0–100, `{ valid: false, error }` otherwise (handles non-numeric strings, negatives, values > 100)
    - _Requirements: 1.2, 1.4_

  - [x] 2.2 Write property test for `randomFillLevel` — Property 2
    - **Property 2: Random fill level is always in range**
    - **Validates: Requirements 1.2**
    - Run `randomFillLevel()` 100+ times and assert result is integer in [0, 100]
    - _File: `tests/simulator.test.js`_

  - [x] 2.3 Write property test for `validateFillLevel` — Property 4
    - **Property 4: Invalid input is rejected**
    - **Validates: Requirements 1.4**
    - Use `fc.oneof(fc.integer({ max: -1 }), fc.integer({ min: 101 }), fc.string())` to assert `valid === false` with non-empty error
    - _File: `tests/simulator.test.js`_

- [x] 3. Implement Bin State Store
  - [x] 3.1 Implement `initBins(count)`, `updateBin(binId, fillLevel)`, `getBins()`, `getBin(binId)` in `binStore.js`
    - `initBins` creates N bins (N ∈ {2, 3}) with unique ids, fillLevel 0, derived status, and empty timestamp
    - `updateBin` sets fillLevel, derives status (0–33 → "Empty", 34–66 → "Half Full", 67–100 → "Full"), and records ISO 8601 timestamp
    - _Requirements: 1.1, 1.3, 1.5, 2.1, 2.2, 2.3, 2.4_

  - [x] 3.2 Write property test for bin count — Property 1
    - **Property 1: Bin count matches initialization**
    - **Validates: Requirements 1.1**
    - Use `fc.integer({ min: 2, max: 3 })` to assert `getBins().length === N` and all ids are unique
    - _File: `tests/binStore.test.js`_

  - [x] 3.3 Write property test for fill level round-trip — Property 3
    - **Property 3: Manual fill level round-trip**
    - **Validates: Requirements 1.3, 5.4**
    - Use `fc.integer({ min: 0, max: 100 })` to assert `getBin(binId).fillLevel === V` after `updateBin(binId, V)`
    - _File: `tests/binStore.test.js`_

  - [x] 3.4 Write property test for timestamp presence — Property 5
    - **Property 5: Timestamp is set on every update**
    - **Validates: Requirements 1.5**
    - Use `fc.integer({ min: 0, max: 100 })` to assert `timestamp` is a non-empty ISO 8601 string after `updateBin`
    - _File: `tests/binStore.test.js`_

  - [x] 3.5 Write property test for status derivation — Property 6
    - **Property 6: Status derivation is correct for all fill levels**
    - **Validates: Requirements 2.1, 2.2, 2.3**
    - Use `fc.integer({ min: 0, max: 100 })` to assert correct status for all boundary ranges
    - _File: `tests/binStore.test.js`_

- [x] 4. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement History Store
  - [x] 5.1 Implement `appendReading(binId, fillLevel)` and `getHistory(binId)` in `historyStore.js`
    - `appendReading` pushes the value and slices to the last 10 entries
    - `getHistory` returns the readings array ordered oldest to newest
    - _Requirements: 6.2, 6.3_

  - [x] 5.2 Write property test for history cap — Property 9
    - **Property 9: History never exceeds 10 readings**
    - **Validates: Requirements 6.2**
    - Use `fc.array(fc.integer(0, 100), { minLength: 11, maxLength: 50 })` to assert `getHistory(binId).length === 10` after N > 10 appends
    - _File: `tests/historyStore.test.js`_

- [x] 6. Implement Alert Manager
  - [x] 6.1 Implement `evaluateAlert(bin)` in `alertManager.js`
    - Calls `showAlert(binId)` when `bin.status === "Full"`, `hideAlert(binId)` otherwise
    - Depends on `dashboard.js` `showAlert`/`hideAlert` functions
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 6.2 Write property test for alert visibility — Property 8
    - **Property 8: Alert visibility matches Full status**
    - **Validates: Requirements 4.1, 4.2**
    - Use `fc.integer({ min: 0, max: 100 })` to assert alert shown iff status is "Full"
    - _File: `tests/alertManager.test.js`_

- [x] 7. Implement History Chart
  - [x] 7.1 Implement `renderChart(canvasId, history)` in `chart.js`
    - Use Canvas API to draw a simple bar chart with fill levels on Y-axis and update sequence on X-axis
    - Handle empty history gracefully (clear canvas)
    - _Requirements: 6.1_

- [ ] 8. Implement Dashboard UI
  - [x] 8.1 Implement `renderDashboard(bins)` and `updateBinCard(bin, history)` in `dashboard.js`
    - `renderDashboard` does initial render of all bin cards (progress bar width, fill level value, status label, timestamp)
    - `updateBinCard` updates a single card in-place and calls `renderChart` with the bin's history
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.4_

  - [x] 8.2 Implement `showAlert(binId)` and `hideAlert(binId)` in `dashboard.js`
    - Toggle visibility of the alert banner element for the given bin
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 8.3 Write property test for rendered bin card content — Property 7
    - **Property 7: Rendered bin card contains required fields**
    - **Validates: Requirements 3.2, 3.3, 3.4**
    - Use `fc.record({ fillLevel: fc.integer(0, 100), ... })` to assert rendered HTML contains fill level, status label, and timestamp
    - _File: `tests/dashboard.test.js`_

  - [x] 8.4 Write unit tests for DOM structure
    - Assert each bin card has a progress bar, numeric input, set button, randomize button, and canvas element
    - Assert alert element is present and toggled correctly by `showAlert`/`hideAlert`
    - _File: `tests/dashboard.test.js`_

- [x] 9. Wire everything together
  - [x] 9.1 Connect all modules in `index.html` / `dashboard.js` event handlers
    - On "Randomize" click: call `randomFillLevel()`, `updateBin()`, `appendReading()`, `updateBinCard()`, `evaluateAlert()`
    - On "Set" click: call `validateFillLevel()`, show inline error on invalid input, otherwise same flow as randomize
    - Call `initBins(count)` and `renderDashboard(getBins())` on page load
    - _Requirements: 1.2, 1.3, 1.4, 5.1, 5.2, 5.3, 5.4_

  - [x] 9.2 Write property test for history/chart consistency — Property 10
    - **Property 10: History passed to chart matches store**
    - **Validates: Requirements 6.3**
    - Use `fc.array(fc.integer(0, 100))` to assert the history array passed to `renderChart` equals `getHistory(binId)` at that moment
    - _File: `tests/historyStore.test.js`_

- [x] 10. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with a minimum of 100 iterations each
- Each property test must include a comment: `// Feature: iot-waste-management, Property N: <title>`
- All state is in-memory only; no persistence between page reloads
