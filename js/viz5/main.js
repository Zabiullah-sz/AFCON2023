'use strict';

import * as d3 from 'd3';
import playerData from '../../assets/data/offense_team.csv'
import { createScatterPlot } from './viz.js';

export function initializeVisualization5() {
  d3.csv(playerData, d3.autoType).then(function(data) {
    const width = 750;
    const height = 600;

    createScatterPlot(data, width, height);
  });
}