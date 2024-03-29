
/**
 * Generates the SVG element g which will contain the data visualization.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
    return d3.select('.graph')
      .select('svg')
      .append('g')
      .attr('id', 'graph-g')
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
      .text('Meilleurs buteurs du tournoi (minimum 2 buts)')
      .attr('class', 'title')
  
    g.append('text')
      .text('Buts')
      .attr('class', 'x axis-text')
      .attr('font-size', 12)
  
    g.append('text')
      .text('Joueur')
      .attr('class', 'y axis-text')
      .attr('transform', 'rotate(-90)')
      .attr('font-size', 12)
  }
  
  /**
   * Sets the size of the SVG canvas containing the graph.
   *
   * @param {number} width The desired width
   * @param {number} height The desired height
   */
  export function setCanvasSize (width, height) {
    d3.select('#bar-chart').select('svg')
      .attr('width', width)
      .attr('height', height)
  }
  
  /**
   * Positions the title label, x axis label and y axis label on the graph.
   *
   * @param {number} width The width of the graph
   * @param {number} height The height of the graph
   */
  export function positionLabels (width, height) {
    d3.select('.title')
      .attr('x', width / 2)
      .attr('y', -35)
  
    d3.select('.x.axis-text')
      .attr('x', width / 2)
      .attr('y', height + 50)
  
    d3.select('.y.axis-text')
      .attr('x', -50)
      .attr('y', height / 2)
  }
  
  /**
   * Draws the x axis at the bottom of the plot.
   *
   * @param {*} xScale The scale to use for the x axis
   * @param {number} height The height of the graph
   */
  export function drawXAxis (xScale, height) {
    d3.select('.x.axis')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5))
  }
  
  /**
   * Draws the y axis at the left of the plot.
   *
   * @param {*} yScale The scale to use for the y axis
   */
  export function drawYAxis (yScale) {
    d3.select('.y.axis')
      .call(d3.axisLeft(yScale))
  }
  