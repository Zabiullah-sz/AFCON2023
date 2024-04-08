import * as d3 from 'd3';

export function createScatterPlot(data, width, height) {
    console.log(data)
  const svg = d3.select('#viz5').append('svg')
    .attr('width', width)
    .attr('height', height);

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d['Tirs'])])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d['Buts'])])
    .range([height - margin.bottom, margin.top]);

  // Define color mapping based on ronde values
  const colorScale = d3.scaleOrdinal()
    .domain(['Carré d\'as', 'Quart de finales', 'Huitièmes de finales', 'Phase de groupes'])
    .range(['red', 'blue', 'yellow', 'green']);

  // Append faded gridlines
  const numTicks = 5; // Number of gridlines
  const xAxisGrid = d3.axisBottom(xScale).ticks(numTicks).tickSize(-graphHeight).tickFormat('').tickSizeOuter(0);
  const yAxisGrid = d3.axisLeft(yScale).ticks(numTicks).tickSize(-graphWidth).tickFormat('').tickSizeOuter(0);

  svg.append('g')
    .attr('class', 'x-grid')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxisGrid)
    .selectAll('line')
    .style('stroke', 'rgba(0, 0, 0, 0.1)'); // Adjust opacity for faded effect

  svg.append('g')
    .attr('class', 'y-grid')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxisGrid)
    .selectAll('line')
    .style('stroke', 'rgba(0, 0, 0, 0.1)'); // Adjust opacity for faded effect

  // Append circles for data points
  svg.selectAll('circle')
    .data(data)
    .enter().append('circle')
      .attr('cx', d => xScale(+d['Tirs']))
      .attr('cy', d => yScale(+d['Buts']))
      .attr('r', 5)
      .style('fill', d => colorScale(d['Ronde'])) // Set color based on ronde value
      .style('opacity', 0.7)
      .on('mouseover', (event, d) => {
        d3.select('.tooltip')
          .html(`<strong>${data[d].Pays}</strong><br>Shots Received: ${data[d].Tirs}<br>Goals Allowed: ${data[d].Buts}`)
          .style('left', (d3.event.clientX ) + 'px')
          .style('top', (d3.event.clientY ) + 'px')
          .style('visibility', 'visible');
      })
      .on('mouseout', () => {
        d3.select('.tooltip').style('visibility', 'hidden');
      });

  // Append axes
  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

  // Tooltip setup
  const tooltip = d3.select('#viz5').append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background-color', 'rgba(255, 255, 255, 0.9)')
    .style('padding', '10px')
    .style('border-radius', '5px')
    .style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.3)')
    .style('font-family', 'Arial, sans-serif')
    .style('font-size', '12px');
}
