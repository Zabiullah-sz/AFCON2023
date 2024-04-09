import * as d3 from 'd3'

  /**
   * Sets the domain and range of the X scale.
   *
   * @param {*} scale The X scale
   * @param {object[]} data The data to be used
   * @param {number} width The width of the graph
   */
  export function updateXScale (scale, data, width) {
    scale.domain([0, d3.max(data, d => d.GoalsAndAssists)]).range([0, width])
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
      .attr('width', d => x(d.GoalsAndAssists))
      .attr('height', y.bandwidth())
      .attr('fill', 'blue')
      .on('mouseover', function (event, d) {
        tip.show(d, this)
      })
      .on('mouseout', tip.hide)
  
      g.selectAll('.assist-label')
      .data(players)
      .enter()
      .append('text')
      .attr('class', 'assist-label')
      .attr('x', d => x(d.GoalsAndAssists))
      .attr('y', d => y(d.Player) + y.bandwidth() / 2)
      .attr('dx', -20)
      .attr('dy', '0.35em')
      .style('fill', 'white')
      .text(d => d.GoalsAndAssists)
    }