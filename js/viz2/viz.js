import * as d3 from 'd3'

/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The X scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateXScale (scale, data, width) {
  scale.domain([-d3.max(data, d => d.Buts_marques), d3.max(data, d => d.Buts_marques)]).rangeRound([0, width])
}
  
/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 */
export function updateYScale (scale, data) {
  scale.domain(data.map(d => d.Pays))
}


function drawButton(selector, text, bgColor, id) {
  return d3.select(selector)
    .append('button')
    .text(text)
    .attr('id',id)
    .style('padding', '10px 20px')
    .style('margin-right', '10px')
    .style('background-color', bgColor)
    .style('color', 'black')
    .style('border', 'none')
    .style('border-radius', '5px')
    .style('cursor', 'pointer');
}

/**
 * Draws the goals allowed button
 *
 * @returns {*} The goals allowed button
 */
 export function drawGoalsAllowedButton() {
  return drawButton('#viz', 'Trier par buts alloués', 'pink', 'allowed')
    .style('position', 'absolute')
    .style('top', '50px')
    .style('left', '330px');
}

/**
 * Draws the goals scored button
 *
 * @returns {*} The goals allowed button
 */
 export function drawGoalsScoredButton() {
  return drawButton('#viz', 'Trier par buts marqués', 'lightgreen', 'scored')
    .style('position', 'absolute')
    .style('top', '50px')
    .style('left', '535px');
}

export function updateButtonStates(scored, allowed) {
  d3.select('#allowed')
                        .style('outline', scored ? '2px solid black' : 'none')
                        .style('background-color', scored ? '#ff0404' : 'pink')
                         .classed('disabled', scored);

  d3.select('#scored')
  .style('outline', allowed ? '2px solid black' : 'none')
  .style('background-color', allowed ? '#088404' : 'lightgreen')
                            .classed('disabled', allowed);
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