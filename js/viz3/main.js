// main.js
import * as d3 from 'd3';
import { drawVisualization } from './viz.js';
import { summarizeData, getTop } from './preprocess.js';
import playersData from '../../assets/data/players.csv';

export function initializeVisualization3() {
  const config = {
    height: 500,
    margin: {
      bottom: 0,
      left: 100,
      right: 100,
      top: 0
    },
    width: 500
  }
  const fullWidth = config.margin.left + config.width + config.margin.right;
  const fullHeight = config.margin.top + config.height + config.margin.bottom;

  d3.select('#viz').select('svg').remove();

  const svg = d3.select('#viz')
    .append('svg')
    .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`)

  d3.csv(playersData, d3.autoType).then(function (fullData) {
    const data = getTop(summarizeData(fullData));
    drawVisualization(svg, data, config.width, config.height);
  });
}

