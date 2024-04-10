/**
 * Draws the legend.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function drawLegend (g, data) {
    const legendItems = g.selectAll('legendItem')
    .data(data)
    .enter().append('g')
    .attr('class', 'legendItem')
    .attr('transform', (d, i) => `translate(${i * 150}, 0)`)

    legendItems.append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', d => d.color)

    legendItems.append('text')
    .attr('x', 24)
    .attr('y', 9)
    .attr('dy', '.35em')
    .text(d => d.label)
    .style('fill', '#000')
  }