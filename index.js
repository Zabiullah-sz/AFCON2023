import { initializeVisualization1 } from './js/viz1/main.js';
import { initializeVisualization2 } from './js/viz2/main.js';
import { initializeVisualization3 } from './js/viz3/main.js';
import { initializeVisualization4 } from './js/viz4/main.js';
import { initializeVisualization5 } from './js/viz5/main.js';

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("jello")
    initializeVisualization1('#viz1');
    initializeVisualization2('#viz2');
    initializeVisualization3('#viz3');
    initializeVisualization4('#viz4');
    initializeVisualization5('#viz5');
});
