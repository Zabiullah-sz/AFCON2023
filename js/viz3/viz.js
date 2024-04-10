// viz.js
import { createSizeScale, colorScale } from './scales.js';
import { createTooltip } from './tooltip.js';
import { applyDrag } from './drag.js';
// import { getFlagUrl } from '../common/flags.js';
import { createSimulation } from './simulation.js';


export function colorDomain(color, data) {
  console.log(data)
  const types = Array.from(new Set(data.map(d => d.country)))
  const sortedTypes = types.sort()
  color.domain(sortedTypes)

}

export function drawVisualization(svg, data, width, height) {
  const sizeScale = createSizeScale(data);
  const tip = createTooltip();

  svg.call(tip);

  // Create groups for each node (bubble + text)
  let node = svg.selectAll('.node')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'node');

    const simulation = createSimulation(width, height, sizeScale);
    node.call(applyDrag(simulation));
  
  // Append circles to each group
  node.append('circle')
    .attr('r', d => sizeScale(d.foulsPer90))
    .style('fill', d => colorScale(d.country))
    .style('fill-opacity', 0.8)
    .attr('stroke', 'black')
    .style('stroke-width', 1)
    .on('mouseover', (event, d) => {
      tip.show(d, event.currentTarget.parentNode); // parentNode refers to the group
    })
    .on('mouseout', tip.hide);

  // Append text to each group
  node.append('text')
    .attr('dy', '.3em')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .style('font-size', '10px')
    .text(d => d.player);

  // Adjust the simulation setup

  // Update positions on simulation tick
  simulation.nodes(data).on('tick', () => {
    // Here, we use 'transform' to update the position of the entire group
    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });
}
