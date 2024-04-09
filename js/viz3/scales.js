// scales.js
import * as d3 from 'd3';

export const colorScale = d3.scaleOrdinal(d3.schemeSet1);

export function createSizeScale(data) {
  return d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.foulsPer90)])
    .range([7, 55]);
}
