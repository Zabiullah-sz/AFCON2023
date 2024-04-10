import * as d3 from 'd3'

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
      .attr('y', height - margin.bottom / 2+5)
      .attr('text-anchor', 'middle')
  
    d3.select('.y.axis-text.goals-allowed')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', margin.left / 2)
      .attr('text-anchor', 'middle')
}