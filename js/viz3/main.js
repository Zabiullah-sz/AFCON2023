// main.js
import * as d3 from 'd3';
import { drawVisualization } from './viz.js';
import { summarizeData, getTop } from './preprocess.js';
import playersData from '../../assets/data/players.csv';

// This function sets up the visualization and fetches the data
function initializeVisualization3() {
  const width = 900;
  const height = 600;

  const svg = d3.select('#viz3')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Fetch and preprocess the data
  d3.csv(playersData, d3.autoType).then(function (fullData) {
    const data = getTop(summarizeData(fullData));
    drawVisualization(svg, data, width, height);
  });
}

// Start the visualization
initializeVisualization3();
