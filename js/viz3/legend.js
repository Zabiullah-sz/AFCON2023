import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g element containing the legend
 */
export function drawLegend (colorScale, g) {


  const sortedDomain = colorScale.domain().sort();

  const legend = d3Legend.legendColor()
    .shape('circle')
    .scale(colorScale)


  g.append('g')
    .attr('class', 'legend')
    .attr('font-family', 'Open Sans Condensed')
    .attr('font-size', 18)
    .attr('transform', 'translate(560, 150)')

    .call(legend)

  g.append('text')
    .attr('class', 'legend-title')
    .attr('font-family', 'Open Sans Condensed')
    .attr('font-size', 18)
    .attr('transform', 'translate(550, 130)')

    .text('Légende')
}
