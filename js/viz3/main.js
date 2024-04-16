// main.js
import * as d3 from 'd3';
import { drawVisualization, colorDomain } from './viz.js';
import { summarizeData, sortData, getTop } from './preprocess.js';
import playersData from '../../assets/data/players.csv';
import { createColorScale } from './scales.js';
import { drawLegend } from './legend.js';

export function initializeVisualization3() {
  const config = {
    height: 500,
    margin: { bottom: 0, left: 100, right: 100, top: 0 },
    width: 500
  };
  const fullWidth = config.margin.left + config.width + config.margin.right;
  const fullHeight = config.margin.top + config.height + config.margin.bottom;

  const vizContainer = d3.select('#viz');
  vizContainer.selectAll('*').remove(); // Clear the visualization container

  const svg = vizContainer.append('svg')
    .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`);

  // Fetch and process the data, then draw the visualization
  d3.csv(playersData, d3.autoType).then(function (rawData) {
    const countries = Array.from(new Set(rawData.map(d => d.country))); // Unique set of countries
    let allData = summarizeData(rawData); // Process data
    let sortedData = sortData(allData); // Sort data
    let currentData = getTop(sortedData); // Get the top players for initial display
    console.log("Data init:", JSON.parse(JSON.stringify(currentData)));


    const colorScale = createColorScale(countries);
    colorDomain(colorScale, currentData);
    drawLegend(colorScale, svg);
    drawVisualization(svg, currentData, config.width, config.height, colorScale);

    // Redraw function to update visualization with current data
    function redraw() {
      const colorScale = createColorScale(countries);
      svg.selectAll('.node').remove(); // Clear existing nodes
      drawVisualization(svg, currentData, config.width, config.height, colorScale);
      colorDomain(colorScale, currentData);
      drawLegend(colorScale, svg); // Update the legend with the current color scale
    }

    // Add the "+" button
    vizContainer.append('button')
      .attr('id', 'addPlayer')
      .attr('style', 'position: absolute; top: 10px; left: 10px;')
      .text('Ajouter joueur')
      .on('click', () => {
        if (allData.length > currentData.length) {
          currentData.push(allData[currentData.length]); // Add the next player from allData
          currentData = getTop(sortData(currentData), currentData.length + 1); // Re-sort and get the top
          redraw();
        }
      });

    // Add the "-" button
    vizContainer.append('button')
      .attr('id', 'removePlayer')
      .attr('style', 'position: absolute; top: 10px; left: 200px;')
      .text('Enlever joueur')
      .on('click', () => {
        if (currentData.length > 10) { // Ensuring at least 10 players remain
          console.log("Data before sorting:", JSON.parse(JSON.stringify(currentData)));
          currentData.pop(); // Remove the last player from the current list
          redraw();
        }
      });
  });
}
