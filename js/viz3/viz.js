// viz.js
import { createSizeScale, createColorScale } from './scales.js';
import { createTooltip } from './tooltip.js';
import { applyDrag } from './drag.js';
import { createSimulation } from './simulation.js';

export function colorDomain(color, data) {
  let copyData = [...data].reverse() // i dont want to change the original list

  const types = Array.from(new Set(copyData.map(d => d.country))).sort();
  color.domain(types);
}

export function drawVisualization(svg, data, width, height, colorScale) {

  let copyData = [...data].reverse()   // i dont want to change the original list

  const sizeScale = createSizeScale(copyData);
  const tip = createTooltip();
  svg.call(tip);

    // Update or add title
    let title = svg.selectAll('.viz-title').data([data]);
    title.enter()
      .append('text')
      .attr('class', 'viz-title')
      .merge(title)
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('fill', 'black')
      .text(`Top ${data.length} joueurs par fautes commises toutes les 90 minutes`);

  let nodes = svg.selectAll('.node')
    .data(copyData, d => d.player); // Key function for object constancy

  // Enter selection: new elements
  let nodeEnter = nodes.enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', `translate(${width / 2},${height / 2})`)
    .each(function(d) {  // Manually set initial positions for simulation
      d.x = width / 2;
      d.y = height / 2;
    });

    const simulation = createSimulation(width, height, sizeScale);
    nodeEnter.call(applyDrag(simulation));

  nodeEnter.append('circle')
    .attr('r', d => sizeScale(d.foulsPer90))
    .style('fill', d => colorScale(d.country))
    .style('fill-opacity', 0.8)
    .attr('stroke', 'black')
    .style('stroke-width', 1)
    .on('mouseover', (event, d) => tip.show(d, event.currentTarget.parentNode))
    .on('mouseout', tip.hide);

  nodeEnter.append('text')
    .attr('dy', '.3em')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .style('font-size', '10px')
    .text(d => d.player);

  // Merge enter and update selections
  nodes = nodeEnter.merge(nodes);



  // Apply the simulation to all nodes
  simulation.nodes(copyData).on('tick', () => {
    nodes.attr('transform', d => `translate(${d.x},${d.y})`);
  });

}

// Redraw function
export function redraw(svg, currentData, width, height) {
  // Clear the previous visualization before redrawing
  svg.selectAll('.node').remove();
  drawVisualization(svg, currentData, width, height);
}