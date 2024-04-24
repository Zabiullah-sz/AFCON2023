import * as d3 from 'd3'

/**
 * Draws the grid for the x axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} height The height of the graph
 * @param {object} margin The desired margins around the graph
 * @param {*} xAxisGrid The grid for the x axis
 */
export function drawXAxisGrid (g, height, margin, xAxisGrid) {
  g.append('g')
  .attr('class', 'x-grid')
  .attr('transform', `translate(0, ${height - margin.bottom})`)
  .call(xAxisGrid)
  .selectAll('line')
  .style('stroke', 'rgba(0, 0, 0, 0.1)') // Adjust opacity for faded effect
}

/**
 * Draws the grid for the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {object} margin The desired margins around the graph
 * @param {*} yAxisGrid The grid for the y axis
 */
export function drawYAxisGrid (g, margin, yAxisGrid) {
  g.append('g')
    .attr('class', 'y-grid')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxisGrid)
    .selectAll('line')
    .style('stroke', 'rgba(0, 0, 0, 0.1)') // Adjust opacity for faded effect
}

/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x axis shots')

  g.append('g')
    .attr('class', 'y axis goals')
}

/**
 * Appends the labels for the title of the graph, the x axis and the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Buts marqués et tirs effectués par chaque équipe dans le tournoi')
    .attr('class', 'title')
    .attr('font-size', 24)

  g.append('text')
    .text('Tirs effectués')
    .attr('class', 'x axis-text shots')

  g.append('text')
    .text('Buts marqués')
    .attr('class', 'y axis-text goals')
}

/**
 * Positions the title label, x axis label and y axis label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @param {object} margin The desired margins around the graph
 */
export function positionLabels (width, height, margin) {
  d3.select('.title')
    .attr('x', width / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')

  d3.select('.x.axis-text.shots')
    .attr('x', width / 2)
    .attr('y', height - margin.bottom / 2 + 10)
    .attr('text-anchor', 'middle')

  d3.select('.y.axis-text.goals')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', margin.left / 2)
    .attr('text-anchor', 'middle')
}