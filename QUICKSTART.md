# Quick Start Guide

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (only needed for running tests)
- A modern browser (Chrome, Firefox, Edge, Safari)

## 1. Install dependencies

```bash
npm install
```

This installs Vitest and fast-check for testing. The app itself has zero runtime dependencies.

## 2. Open the app

Since the app uses ES modules, you need to serve it over HTTP rather than opening `index.html` directly as a `file://` URL.

**Option A — Use the VS Code Live Server extension**
Right-click `index.html` → "Open with Live Server"

**Option B — Use any static file server**
```bash
npx serve .
```
Then open `http://localhost:3000` in your browser.

**Option C — Use Python's built-in server**
```bash
python -m http.server 8080
```
Then open `http://localhost:8080`.

## 3. Using the dashboard

Each bin card has two controls:

| Control | What it does |
|---|---|
| **Randomize** | Generates a random fill level (0–100) for that bin |
| **Set** | Applies the value you typed in the number input to that bin |

- The progress bar, status label, and timestamp update instantly on every change
- A red alert banner appears at the top of a bin card when it reaches **Full** status (≥ 67%)
- The bar chart at the bottom of each card shows the last 10 readings

## 4. Run the tests

```bash
npm test
```

Expected output: 34 tests passing across 5 test files.

To run a specific test file:
```bash
npx vitest --run tests/binStore.test.js
```

## Modules at a glance

| File | Responsibility |
|---|---|
| `simulator.js` | `randomFillLevel()`, `validateFillLevel(input)` |
| `binStore.js` | `initBins()`, `updateBin()`, `getBins()`, `getBin()` |
| `historyStore.js` | `appendReading()`, `getHistory()` |
| `alertManager.js` | `evaluateAlert(bin)` |
| `dashboard.js` | `renderDashboard()`, `updateBinCard()`, `showAlert()`, `hideAlert()` |
| `chart.js` | `renderChart(canvasId, history)` |
