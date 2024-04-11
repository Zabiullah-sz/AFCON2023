// main.js
import * as d3 from 'd3';
import { drawVisualization, colorDomain } from './viz.js';
import { summarizeData, getTop } from './preprocess.js';
import playersData from '../../assets/data/players.csv';
import { colorScale } from './scales.js';
import { drawLegend } from './legend.js';


export function initializeVisualization3() {
  d3.select('#viz').select('button').remove();
  d3.select('#viz').select('button').remove();
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
  d3.select('.d3-tip').remove();

  const svg = d3.select('#viz')
    .append('svg')
    .attr('viewBox', `0 0 ${fullWidth} ${fullHeight}`);



  d3.csv(playersData, d3.autoType).then(function (fullData) {
    let data = getTop(summarizeData(fullData));
    colorDomain(colorScale, data)
    drawLegend(colorScale, svg);
    drawVisualization(svg, data, config.width, config.height);
  });
}

