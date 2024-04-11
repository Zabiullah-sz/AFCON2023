/**
 * app.js
 * ======
 * Main file of the application. This file is used to initialize the scroller and imports the visualizations used.
 */

'use strict';

import './css/main.scss';

import { scroller } from './scroller';
import stickyBits from 'stickybits'
import { initializeVisualization1Goals } from './js/viz1_goals/main.js';
import { initializeVisualization1Assists } from './js/viz1_assists/main.js';
import { initializeVisualization1GoalsAndAssists } from './js/viz1_goals_assists/main.js';
import { initializeVisualization2 } from './js/viz2/main.js';
import { initializeVisualization3 } from './js/viz3/main';
import { initializeVisualization4 } from './js/viz4/main';

// Fallback for old browsers to support sticky positioning.
let elements = [];
['.viz'].forEach(selector => {
  elements = elements.concat(Array.from(document.querySelectorAll(selector)));
});
stickyBits(elements, { stickyBitStickyOffset: 0 });
console.log("jello")
// Initializes the scroller and the visualizations.

scroller([[
  () => initializeVisualization1Goals(),
  () => initializeVisualization1Assists(),
  () => initializeVisualization1GoalsAndAssists(),
  () => initializeVisualization2(),
  () => initializeVisualization3(),
  () => initializeVisualization4(),
]]).initialize();
