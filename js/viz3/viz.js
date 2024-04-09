// viz.js
import { createSizeScale } from './scales.js';
import { createTooltip } from './tooltip.js';
import { applyDrag } from './drag.js';
import { getFlagUrl } from '../common/flags.js';
import { createSimulation } from './simulation.js';

// This function contains the main drawing logic for the visualization
export function drawVisualization(svg, data, width, height) {
  const sizeScale = createSizeScale(data);
  const tip = createTooltip();

  svg.call(tip);

  // Define patterns for flags
  const defs = svg.append('defs');
  data.forEach(d => {
    const patternId = d.country === "Côte d'Ivoire" ? 'cote-divoire-flag' : `flag-${d.country.replace(/\s+/g, '-')}`;
    defs.append('pattern')
      .attr('id', patternId)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('patternContentUnits', 'objectBoundingBox')
      .append('image')
      .attr('href', getFlagUrl(d.country))
      .attr('width', 1)
      .attr('height', 1)
      .attr('preserveAspectRatio', 'xMidYMid slice');
  });

  // Create circle nodes for the data points
  let node = svg.selectAll('.circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', d => sizeScale(d.foulsPer90))
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .style('fill', d => `url(#${d.country === "Côte d'Ivoire" ? 'cote-divoire-flag' : `flag-${d.country.replace(/\s+/g, '-')}`})`)
    .style('fill-opacity', 0.8)
    .attr('stroke', 'black')
    .style('stroke-width', 1)
    .on('mouseover', (event, d) => {
      tip.show(d, event.currentTarget);
    })
    .on('mouseout', tip.hide);

  const simulation = createSimulation(width, height, sizeScale);
  node.call(applyDrag(simulation));

  // Update the positions after each simulation 'tick'
  simulation.nodes(data).on('tick', () => {
    node.attr('cx', d => d.x)
      .attr('cy', d => d.y);
  });
}
