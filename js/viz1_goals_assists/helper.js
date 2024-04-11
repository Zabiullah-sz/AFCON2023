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
  d3.select('#viz').select('button').remove();
  d3.select('#viz').select('button').remove();
  d3.select('#viz').select('svg').remove();
  d3.select('.d3-tip').remove();
  return d3.select('#viz')
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
    .attr('class', 'x axis goals-assists')

  g.append('g')
    .attr('class', 'y axis goals-assists')
}

/**
 * Appends the labels for the title of the graph, the x axis and the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Meilleurs marqueurs du tournoi (minimum 3 buts + aides)')
    .attr('class', 'goals-assists title')
    .attr('font-size', 20)

  g.append('text')
    .text('Buts + Aides')
    .attr('class', 'x axis-text goals-assists')

  g.append('text')
    .text('Joueur')
    .attr('class', 'y axis-text goals-assists')
}
  
/**
 * Positions the title label, x axis label and y axis label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 * @param {object} margin The desired margins around the graph
 */
export function positionLabels (width, height, margin) {
  d3.select('.goals-assists.title')
    .attr('x', margin.left - 60)
    .attr('y', -20)

  d3.select('.x.axis-text.goals-assists')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom)

  d3.select('.y.axis-text.goals-assists')
    .attr('transform', 'rotate(-90)')
    .attr('x', -margin.left - 120)
    .attr('y', -margin.left + 10)
}

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis (xScale, height) {
  d3.select('.x.axis.goals-assists')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(5))
    .style('font-size', 12)
}
  
/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis (yScale) {
  d3.select('.y.axis.goals-assists')
    .call(d3.axisLeft(yScale))
    .style('font-size', 12)
}
  