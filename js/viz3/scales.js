// scales.js
import * as d3 from 'd3';

const customColors = [
  "#e6194b", "#3cb44b", "#ffe119", "#0082c8", "#f58231",
  "#911eb4", "#46f0f0", "#f032e6", "#d2f53c", "#fabebe",
  "#008080", "#e6beff", "#aa6e28", "#fffac8", "#800000",
  "#aaffc3", "#808000", "#ffd8b1", "#000080", "#808080",
  "#FFFFFF", "#000000"
];

export function createColorScale(countries) {
  return d3.scaleOrdinal()
      .domain(countries)  // Set of countries or categories
      .range(customColors);  // Your custom color array
}

export function createSizeScale(data) {
  return d3.scaleLinear()
    .domain([0, d3.max(data, d => +d.foulsPer90)])
    .range([7, 55]);
}
