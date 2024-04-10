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
   * Draws the bars inside the groups
   *
   * @param {*} g The d3 Selection of the graph's g SVG element
   * @param {*} x The graph's x scale
   * @param {*} y The graph's y scale
   * @param {string[]} players The names of the players, each corresponding to a bar
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
    .attr('width', d => Math.abs(x(d.Buts_marques) - x(0)))
    .attr('height', y.bandwidth())
    .attr('fill', 'green')
    .on('mouseover', function (event, d) {
      tip.show(d, this)
    })
    .on('mouseout', function () {
      tip.hide()
    })
    
    // Goals allowed
    g.selectAll('.neg')
    .data(teams)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', d => x(-d.Buts_alloues))
    .attr('y', d => y(d.Pays))
    .attr('width', d => Math.abs(x(-d.Buts_alloues) - x(0)))
    .attr('height', y.bandwidth())
    .attr('fill', 'red')
    .on('mouseover', function (event, d) {
      tip.show(d, this)
    })
    .on('mouseout', function () {
      tip.hide()
    })

    // Add labels
    g.selectAll('.label')
    .data(teams)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => 0 - 20)
    .attr('y', d => y(d.Pays) + y.bandwidth() / 2)
    .attr('font-size', 24)
    .style('text-anchor', 'end')
    .text(d => d.Pays)
    .attr('dy', '0.35em')

    g.selectAll('.goal-allowed')
    .data(teams)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', d => x(-d.Buts_alloues))
    .attr('y', d => y(d.Pays) + y.bandwidth() / 2)
    .attr('dx', 10)
    .attr('dy', '0.35em')
    .attr('font-size', 22)
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
    .attr('font-size', 22)
    .style('fill', 'white')
    .text(d => d.Buts_marques)
  }