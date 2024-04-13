import d3Legend from 'd3-svg-legend';

/**
 * Draws or redraws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} svg The D3 Selection of the SVG element containing the visualization
 */
export function drawLegend(colorScale, svg) {

  // Remove any existing legend
  svg.selectAll('.legend').remove();
  svg.selectAll('.legend-title').remove();

  // Create the new legend
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('font-size', 16)
    .attr('transform', 'translate(560, 80)')
    .call(d3Legend.legendColor()
      .shape('circle')
      .scale(colorScale));

  // Add a title to the legend
  svg.append('text')
    .attr('class', 'legend-title')
    .attr('font-size', 16)
    .attr('transform', 'translate(550, 60)')
    .text('Légende');
}
