# Requirements Document

## Introduction

An IoT-based Plastic Waste Management simulation app that monitors smart dustbins without requiring real hardware. The app simulates fill level sensors, displays bin status on a dashboard, and alerts operators when bins need attention. All sensor data is simulated via random generation or manual input. The UI is minimal, beginner-friendly, and runs entirely in the browser using HTML, CSS, and JavaScript.

## Glossary

- **Dashboard**: The main UI screen displaying all bin statuses and controls.
- **Bin**: A simulated smart dustbin with a fill level, status, and timestamp.
- **Fill_Level**: An integer percentage (0–100) representing how full a bin is.
- **Bin_Status**: A categorical label derived from Fill_Level: "Empty" (0–33%), "Half Full" (34–66%), or "Full" (67–100%).
- **Simulator**: The JavaScript module responsible for generating random fill level values.
- **Alert**: A visible UI notification shown when a bin reaches Full status.
- **Progress_Bar**: A visual bar element representing Fill_Level as a percentage width.
- **History_Chart**: A simple line or bar graph showing Fill_Level over time for a bin.
- **Timestamp**: The date and time when a bin's Fill_Level was last updated.

---

## Requirements

### Requirement 1: Bin Simulation

**User Story:** As an operator, I want the app to simulate bin fill levels, so that I can test and monitor the system without real IoT hardware.

#### Acceptance Criteria

1. THE Simulator SHALL support a minimum of 2 and a maximum of 3 bins simultaneously.
2. WHEN the user clicks the "Randomize" button for a bin, THE Simulator SHALL generate a random Fill_Level integer between 0 and 100 inclusive.
3. WHEN the user enters a numeric value in the manual input field for a bin, THE Simulator SHALL update that bin's Fill_Level to the entered value.
4. IF the user enters a value outside the range 0–100, THEN THE Simulator SHALL reject the input and display an inline validation message stating the value must be between 0 and 100.
5. WHEN a bin's Fill_Level is updated by any method, THE Simulator SHALL record the current Timestamp for that bin.

---

### Requirement 2: Bin Status Derivation

**User Story:** As an operator, I want each bin to show a clear status label, so that I can quickly assess which bins need attention.

#### Acceptance Criteria

1. WHEN a bin's Fill_Level is between 0 and 33 inclusive, THE Dashboard SHALL display the Bin_Status as "Empty".
2. WHEN a bin's Fill_Level is between 34 and 66 inclusive, THE Dashboard SHALL display the Bin_Status as "Half Full".
3. WHEN a bin's Fill_Level is between 67 and 100 inclusive, THE Dashboard SHALL display the Bin_Status as "Full".
4. THE Dashboard SHALL update the displayed Bin_Status immediately whenever the Fill_Level changes.

---

### Requirement 3: Dashboard Display

**User Story:** As an operator, I want a central dashboard showing all bin information, so that I can monitor all bins at a glance.

#### Acceptance Criteria

1. THE Dashboard SHALL display a Progress_Bar for each bin reflecting the current Fill_Level as a percentage width.
2. THE Dashboard SHALL display the numeric Fill_Level value alongside each Progress_Bar.
3. THE Dashboard SHALL display the Bin_Status label for each bin.
4. THE Dashboard SHALL display the Timestamp of the last update for each bin.
5. THE Dashboard SHALL render all bin cards in a single view without requiring scrolling on a standard 1280×720 viewport.

---

### Requirement 4: Full Bin Alert

**User Story:** As an operator, I want to be alerted when a bin is full, so that I can arrange timely collection.

#### Acceptance Criteria

1. WHEN a bin's Bin_Status becomes "Full", THE Dashboard SHALL display a visible Alert message for that bin indicating it requires collection.
2. WHEN a bin's Bin_Status changes from "Full" to a lower status, THE Dashboard SHALL remove the Alert for that bin.
3. THE Alert SHALL be visually distinct from normal bin card content (e.g., different background color or border).

---

### Requirement 5: Manual Update Control

**User Story:** As an operator, I want to manually set a bin's fill level, so that I can simulate specific scenarios.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a numeric input field for each bin accepting integer values from 0 to 100.
2. THE Dashboard SHALL provide a "Set" button for each bin that applies the value from the numeric input field to the bin's Fill_Level.
3. THE Dashboard SHALL provide a "Randomize" button for each bin that triggers the Simulator to generate a new random Fill_Level.
4. WHEN the "Set" button is clicked with a valid value, THE Dashboard SHALL update the bin's Fill_Level, Bin_Status, Progress_Bar, and Timestamp simultaneously.

---

### Requirement 6: Fill Level History Chart (Optional)

**User Story:** As an operator, I want to see a fill level history graph per bin, so that I can observe trends over time.

#### Acceptance Criteria

1. WHERE the History_Chart feature is enabled, THE Dashboard SHALL display a History_Chart for each bin showing Fill_Level on the Y-axis and update sequence on the X-axis.
2. WHERE the History_Chart feature is enabled, THE Dashboard SHALL retain the last 10 Fill_Level readings per bin for display in the History_Chart.
3. WHEN a bin's Fill_Level is updated, THE Dashboard SHALL append the new value to that bin's History_Chart data and re-render the chart.
