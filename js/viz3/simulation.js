// simulation.js
import * as d3 from 'd3';

export function createSimulation(width, height, sizeScale) {
  return d3.forceSimulation()
    // .force('center', d3.forceCenter(width / 2, height / 2))
    .force('charge', d3.forceManyBody().strength(0.1))
    .force('collide', d3.forceCollide().strength(0.2).radius(d => sizeScale(d.foulsPer90) + 1).iterations(1));
}
