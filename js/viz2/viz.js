import * as d3 from 'd3'

/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The X scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateXScale (scale, data, width) {
    //scale.domain([0, d3.max(data, d => parseInt(d.Buts_alloues) + parseInt(d.Buts_marques))]).range([0, width])
    //scale.domain([-d3.max(data, d => d.Buts_marques), d3.max(data, d => d.Buts_marques)]).range([0, width / 2]);
    //scale.domain([0, d3.max(data, d => Math.max(d.Buts_marques, d.Buts_alloues))]).rangeRound([0, width / 2]);
    scale.domain([-d3.max(data, d => d.Buts_marques), d3.max(data, d => d.Buts_marques)]).rangeRound([0, width])
}
  
/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (scale, data, height) {
    //scale.domain(data.map(d => d.Pays)).range([height, 0])
    scale.domain(data.map(d => d.Pays))
}

/**
 * Draws the goals allowed button
 *
 */
export function drawGoalsAllowedButton () {
  return d3.select('#viz')
    .append('button')
    .style('position', 'absolute')
    .style('top', '25px')
    .style('left', '50px')
    .style('background-color', 'pink')
    .text('Trier par buts alloués')
}

/**
 * Draws the goals scored button
 *
 */
export function drawGoalsScoredButton () {
  return d3.select('#viz')
    .append('button')
    .style('position', 'absolute')
    .style('top', '50px')
    .style('left', '50px')
    .style('background-color', 'lightgreen')
    .text('Trier par buts marqués')
}

 /**
   * Draws the bars inside the groups
   *
   * @param {*} g The d3 Selection of the graph's g SVG element
   * @param {*} x The graph's x scale
   * @param {*} y The graph's y scale
   * @param {object[]} teams The names of the teams, each corresponding to a bar
   * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
   */
 export function drawBars (g, x, y, teams, tip) {
    // Goals scored
    g.selectAll('.bar')
    .data(teams)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', x(0))
    .attr('y', d => y(d.Pays))
    .attr('width', 0)
    .attr('height', y.bandwidth())
    .attr('fill', 'green')
    .on('mouseover', function (event, d) {
      tip.show(d, this)
      selectTicks(d.Pays)
    })
    .on('mouseout', function () {
      tip.hide()
      unselectTicks()
    })
    .transition()
    .duration(1000)
    .style('cursor', 'pointer')
    .attr('width', d => Math.abs(x(d.Buts_marques) - x(0)))
    
    // Goals allowed
    g.selectAll('.neg')
    .data(teams)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', d => 300)
    .attr('y', d => y(d.Pays))
    .attr('height', y.bandwidth())
    .attr('fill', 'red')
    .on('mouseover', function (event, d) {
      tip.show(d, this)
      selectTicks(d.Pays)
    })
    .on('mouseout', function () {
      tip.hide()
      unselectTicks()
    })
    .transition()
    .duration(1000)
    .attr('x', d => x(-d.Buts_alloues))
    .style('cursor', 'pointer')
    .attr('width', d => Math.abs(x(-d.Buts_alloues) - x(0)))
    

    // Add goal labels

    g.selectAll('.goal-allowed')
    .data(teams)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(-d.Buts_alloues))
    .attr('y', d => y(d.Pays) + y.bandwidth() / 2)
    .attr('dx', 10)
    .attr('dy', '0.35em')
    .attr('font-size', 20)
    .style('fill', 'white')
    .text(d => d.Buts_alloues)

    g.selectAll('.goal-scored')
    .data(teams)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(d.Buts_marques))
    .attr('y', d => y(d.Pays) + y.bandwidth() / 2)
    .attr('dx', -20)
    .attr('dy', '0.35em')
    .attr('font-size', 20)
    .style('fill', 'white')
    .text(d => d.Buts_marques)
}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the team associated with the tick text to make bold
 */
export function selectTicks (name) {
  d3.selectAll('.label')
    .style('font-weight', d => d.Pays === name ? 'bold' : null)
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks () {
  d3.selectAll('.label')
    .style('font-weight', null)
}