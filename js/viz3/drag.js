// drag.js
import * as d3 from 'd3';

export function applyDrag(simulation, width, height) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.1).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    // if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    simulation.force('x', d3.forceX(width/2).strength(0.008))
              .force('y', d3.forceY(height/2).strength(0.008));
  }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}
