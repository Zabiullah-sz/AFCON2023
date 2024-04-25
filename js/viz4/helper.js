import * as d3 from 'd3'

/**
 * Generates the SVG element g which will contain the data visualization.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (width, height) {
  d3.select('#viz').selectAll('*').remove()
  d3.select('.d3-tip').remove()
  return d3.select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(0, 100)`)
}

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
    .attr('class', 'x axis shots-allowed')

  g.append('g')
    .attr('class', 'y axis goals-allowed')
}

/**
 * Appends the labels for the title of the graph, the x axis and the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Buts alloués et tirs reçus par équipe dans le tournoi')
    .attr('class', 'title')
    .attr('font-size', 24)

  g.append('text')
    .text('Tirs reçus')
    .attr('class', 'x axis-text shots-allowed')

  g.append('text')
    .text('Buts alloués')
    .attr('class', 'y axis-text goals-allowed')
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

  d3.select('.x.axis-text.shots-allowed')
    .attr('x', width / 2)
    .attr('y', height - margin.bottom / 2 + 10)
    .attr('text-anchor', 'middle')

  d3.select('.y.axis-text.goals-allowed')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', margin.left / 2)
    .attr('text-anchor', 'middle')
}