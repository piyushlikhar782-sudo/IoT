# IoT Waste Management Dashboard

A browser-only simulation app for monitoring smart dustbins. No backend, no real hardware — runs entirely in plain HTML, CSS, and JavaScript.

## What it does

- Simulates 3 smart dustbins with fill level sensors
- Derives bin status automatically: **Empty** (0–33%), **Half Full** (34–66%), **Full** (67–100%)
- Shows a live dashboard with progress bars, status labels, and timestamps
- Fires a visible alert banner when a bin reaches Full status
- Tracks the last 10 fill level readings per bin in a history chart

## Project structure

```
├── index.html          # Main dashboard UI
├── simulator.js        # Random fill level generation + input validation
├── binStore.js         # Bin state (fill level, status, timestamp)
├── historyStore.js     # Last 10 readings per bin
├── alertManager.js     # Show/hide alerts based on bin status
├── dashboard.js        # DOM rendering and UI updates
├── chart.js            # Canvas-based history bar chart
├── tests/              # Vitest + fast-check property and unit tests
└── package.json
```

## Getting started

See [QUICKSTART.md](./QUICKSTART.md) for setup and usage instructions.

## Running tests

```bash
npm test
```

Runs the full test suite (34 tests) using Vitest with jsdom. Includes property-based tests via fast-check covering all 10 correctness properties.

## Tech stack

- Vanilla HTML / CSS / JavaScript (ES modules)
- [Vitest](https://vitest.dev/) — test runner
- [fast-check](https://github.com/dubzzz/fast-check) — property-based testing
- [jsdom](https://github.com/jsdom/jsdom) — DOM environment for tests
- No frameworks, no build step required for the app itself
