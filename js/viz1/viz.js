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
   * @param {*} x The graph's x scale
   * @param {*} y The graph's y scale
   * @param {string[]} players The names of the players, each corresponding to a bar
   * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
   */
  export function drawBars (x, y, players, tip) {
    d3.select('#graph-g')
  }