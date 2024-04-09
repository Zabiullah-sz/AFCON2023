import * as d3 from 'd3'

/**
 * Generates the SVG element g which will contain the data visualization.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (width, height, margin) {
  return d3.select('#viz1_assists')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
}
  
/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x axis assists')

  g.append('g')
    .attr('class', 'y axis assists')
}

/**
 * Appends the labels for the title of the graph, the x axis and the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Meilleurs passeurs du tournoi (minimum 2 aides)')
    .attr('class', 'assists title')
    .attr('font-size', 20)

  g.append('text')
    .text('Aides')
    .attr('class', 'x axis-text assists')

  g.append('text')
    .text('Joueur')
    .attr('class', 'y axis-text assists')
}
  
/**
 * Positions the title label, x axis label and y axis label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @param {object} margin The desired margins around the graph
 */
export function positionLabels (width, height, margin) {
  d3.select('.assists.title')
    .attr('x', margin.left - 40)
    .attr('y', -20)

  d3.select('.x.axis-text.assists')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom)

  d3.select('.y.axis-text.assists')
    .attr('transform', 'rotate(-90)')
    .attr('x', -margin.left - 120)
    .attr('y', -margin.left + 20)
}

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis (xScale, height) {
  d3.select('.x.axis.assists')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(3))
    .style('font-size', 12)
}
  
/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis (yScale) {
  d3.select('.y.axis.assists')
    .call(d3.axisLeft(yScale))
    .style('font-size', 12)
}
  