import { initializeVisualization1Goals } from './js/viz1_goals/main.js';
import { initializeVisualization1Assists } from './js/viz1_assists/main.js';
import { initializeVisualization1GoalsAndAssists } from './js/viz1_goals_assists/main.js';
import { initializeVisualization2 } from './js/viz2/main.js';
import { initializeVisualization3 } from './js/viz3/main.js';
import { initializeVisualization4 } from './js/viz4/main.js';
import { initializeVisualization5 } from './js/viz5/main.js';

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("jello")
    initializeVisualization1Goals('#viz1_goals');
    initializeVisualization1Assists('#viz1_assists');
    initializeVisualization1GoalsAndAssists('#viz1_goalsAndAssists');
    initializeVisualization2('#viz2');
    initializeVisualization3('#viz3');
    initializeVisualization4('#viz4');
    initializeVisualization5('#viz5');
});
