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
  d3.select('.d3-tip').remove();

  const svg = vizContainer.append('svg')
    .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`);

  // Fetch and process the data, then draw the visualization
  d3.csv(playersData, d3.autoType).then(function (rawData) {
    const countries = Array.from(new Set(rawData.map(d => d.country)));
    let allData = summarizeData(rawData);
    let sortedData = sortData(allData);
    let currentData = getTop(sortedData);

    const colorScale = createColorScale(countries);
    colorDomain(colorScale, currentData);
    drawLegend(colorScale, svg);
    drawVisualization(svg, currentData, config.width, config.height, colorScale);

    function redraw() {
      svg.selectAll('.node').remove();
      drawVisualization(svg, currentData, config.width, config.height, colorScale);
      colorDomain(colorScale, currentData);
      drawLegend(colorScale, svg);
      updateButtonStates();
    }

    function updateButtonStates() {
      d3.select('#addPlayer').attr('disabled', currentData.length >= 25 ? true : null)
                             .style('background-color', currentData.length >= 25 ? '#ccc' : '#4CAF50');
      d3.select('#removePlayer').attr('disabled', currentData.length <= 10 ? true : null)
                                .style('background-color', currentData.length <= 10 ? '#ccc' : '#f44336');
    }

    vizContainer.append('button')
      .attr('id', 'addPlayer')
      .attr('style', 'position: absolute; top: 10px; left: 10px; padding: 8px; background-color: #4CAF50; color: white; border: none; cursor: pointer;')
      .text('Ajouter joueur')
      .on('click', () => {
        if (allData.length > currentData.length) {
          currentData.push(allData[currentData.length]);
          currentData = getTop(sortData(currentData), currentData.length + 1);
          redraw();
        }
      });

    vizContainer.append('button')
      .attr('id', 'removePlayer')
      .attr('style', 'position: absolute; top: 10px; left: 200px; padding: 8px; background-color: #f44336; color: white; border: none; cursor: pointer;')
      .text('Enlever joueur')
      .on('click', () => {
        if (currentData.length > 10) {
          currentData.pop();
          redraw();
        }
      });

    updateButtonStates(); // Initial state check
  });
}
