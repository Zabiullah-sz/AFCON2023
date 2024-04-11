import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g element containing the legend
 */
export function drawLegend (colorScale, g) {
  const legend = d3Legend.legendColor()
    .shape('circle')
    .scale(colorScale)

  g.append('g')
    .attr('class', 'legend')
    .attr('font-size', 16)
    .attr('transform', 'translate(510, 150)')
    .call(legend)

  g.append('text')
    .attr('class', 'legend-title')
    .attr('font-size', 16)
    .attr('transform', 'translate(500, 130)')
    .text('Légende')
}
