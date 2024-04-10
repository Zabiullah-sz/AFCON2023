'use strict';

import * as d3 from 'd3';
import playersData from '../../assets/data/players.csv';
import * as preproc from '../common/preprocessing.js';
import * as viz from './viz.js';
import * as helper from './helper.js';
import * as tooltip from '../common/tooltip.js';

export function initializeVisualization1Goals() {
  const margin = { top: 70, right: 35, bottom: 50, left: 150 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  d3.csv(playersData, d3.autoType).then(function(data) {
    const svg = helper.generateG(width + margin.left + margin.right, height + margin.top + margin.bottom, margin);
    helper.appendAxes(svg);
    helper.appendGraphLabels(svg);

    const topPlayersGoals = preproc.getTopPlayersGoals(data);
    data = topPlayersGoals;

    const xScale = d3.scaleLinear();
    const yScale = d3.scaleBand().padding([0.15]);

    helper.positionLabels(width, height, margin);
    viz.updateXScale(xScale, data, width);
    viz.updateYScale(yScale, data, height);
    helper.drawXAxis(xScale, height);
    helper.drawYAxis(yScale);

    const tip = tooltip.getContents();
    svg.call(tip);

    viz.drawBars(svg, xScale, yScale, topPlayersGoals, tip);
  });
}