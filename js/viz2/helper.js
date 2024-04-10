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
    d3.select('#viz').select('svg').remove();
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
        .attr('class', 'x axis')

    g.append('g')
        .attr('class', 'y axis')
}

/**
 * Appends the labels for the title of the graph, the x axis and the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
    g.append('text')
      .text('Buts marqués et alloués par chaque équipe')
      .attr('class', 'title')
      .attr('font-size', 20)
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
      .attr('x', 500)
      .attr('y', -125)
}

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} xAxisBottomGen The bottom x axis
 * @param {number} height The height of the graph
 */
export function drawXAxisBottom (g, xAxisBottomGen, height) {
    const xAxisBottom = g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxisBottomGen)

    xAxisBottom.selectAll('.tick line')
    .attr('stroke', 'gray')
    
    xAxisBottom.selectAll('.tick text')
    .attr('font-size', 20)
    .attr('fill', function(d) {
        if (d < 0) {return 'red'}
        else 	{ return 'black' }})
}

/**
 * Draws the x axis at the top of the plot.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} xAxisTopGen The top x axis
 */
export function drawXAxisTop (g, xAxisTopGen) {
    const xAxisTop = g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0, 0)')
    .call(xAxisTopGen)

    xAxisTop.selectAll('.tick line')
    .attr('stroke', 'gray')

    xAxisTop.selectAll('.tick text')
    .attr('font-size', 20)
    .attr('fill', function(d) {
        if (d < 0) {return 'red'}
        else 	{ return 'black' }})
}