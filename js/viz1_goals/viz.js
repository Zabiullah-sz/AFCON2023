import * as d3 from 'd3'

/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The X scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateXScale (scale, data, width) {
  scale.domain([0, d3.max(data, d => d.Goals)]).range([0, width])
}
  
/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
  scale.domain(data.map(d => d.Player)).range([height, 0])
}
  
/**
 * Draws the bars inside the groups
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {*} x The graph's x scale
 * @param {*} y The graph's y scale
 * @param {string[]} players The names of the players, each corresponding to a bar
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (g, x, y, players, tip) {
  g.selectAll('.bar')
  .data(players)
  .join('rect')
  .attr('class', 'bar')
  .attr('x', 0)
  .attr('y', d => y(d.Player))
  .attr('width', 0)
  .attr('height', y.bandwidth())
  .attr('fill', 'blue')
  .merge(g.selectAll('.bar').data(players))
  .transition()
  .duration(1000)
  .style('cursor', 'pointer')
  .attr('width', d => x(d.Goals))

  g.selectAll('.bar')
  .data(players)
  .on('mouseover', function (event, d) {
    tip.show(d, this)
    selectTicks(d.Player)
  })
  .on('mouseout', function () {
    tip.hide()
    unselectTicks()
  })

  g.selectAll('.goal-label')
  .data(players)
  .enter()
  .append('text')
  .attr('class', 'goal-label')
  .attr('x', 0)
  .attr('y', d => y(d.Player) + y.bandwidth() / 2)
  .attr('dx', -20)
  .attr('dy', '0.35em')
  .style('fill', 'white')
  .merge(g.selectAll('.goal-label').data(players))
  .transition()
  .duration(1000)
  .attr('x', d => x(d.Goals))
  .tween('text', function(d) {
    const i = d3.interpolateNumber(0, d.Goals)
    return function(t) {
        d3.select(this).text(Math.round(i(t)))
    }
  })
}

  /**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the player associated with the tick text to make bold
 */
export function selectTicks (name) {
  d3.select('.y.axis.goals')
    .selectAll('.tick text')
    .style('font-weight', d => d === name ? 'bold' : null)
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks () {
  d3.selectAll('.axis .tick text')
    .style('font-weight', null)
}