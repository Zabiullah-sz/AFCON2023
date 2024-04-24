import * as d3 from 'd3';
import * as helper from './helper.js';
import * as tooltip from './tooltip.js';

export function createScatterPlot(data, width, height) {

  d3.select('#viz').select('svg').remove();
  d3.select('.d3-tip').remove();

  const svg = d3.select('#viz').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(0, 100)');

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

  helper.drawXAxisGrid(svg, height, margin, xAxisGrid);
  helper.drawYAxisGrid(svg, margin, yAxisGrid);

    const tip = tooltip.createTooltip();
    svg.call(tip);


  // Append circles for data points
  svg.selectAll('circle')
  .data(data)
  .enter().append('circle')
    .attr('cx', d => xScale(0))
    .attr('cy', d => yScale(+d['Buts']))
    .attr('r', 12)
    .style('fill', d => colorScale(d['Ronde']))
    .style('opacity', 0.7)
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .style('cursor', 'pointer')
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100)
    .attr('cx', d => xScale(+d['Tirs']))
    .on('end', () => {
      svg.selectAll('circle')
        .on('mouseover', (event, d) => {
          const samePositionPoints = data.filter(point => +point['Tirs'] === +d['Tirs'] && +point['Buts'] === +d['Buts']);
          // Show tooltip for each data point at the same position
          samePositionPoints.forEach(point => {
            console.log('duplicate')
            tip.show(point, event.currentTarget);
          });
        })
        .on('mouseout', tip.hide);
    });

  // Append axes
  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))
    .style('font-size', 12);

  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale))
    .style('font-size', 12);
  
  // Legend
  const legendData = ['Carré d\'as', 'Quart de finales', 'Huitièmes de finales', 'Phase de groupes'];

  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom + 35})`);

  const legendItem = legend.selectAll('.legend-item')
    .data(legendData)
    .enter().append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(${i * 175}, 20)`);

  legendItem.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', d => colorScale(d));

  legendItem.append('text')
    .attr('x', 15)
    .attr('y', 10)
    .text(d => d)
    .style('font-size', '14px');

  svg.append('line')
    .attr('x1', xScale(0))
    .attr('y1', yScale(0))
    .attr('x2', xScale(d3.max(data, d => +d['Tirs'])))
    .attr('y2', yScale(d3.max(data, d => +d['Buts'])))
    .style("stroke-dasharray", ("10,5"))
    .style('stroke', 'red')
    .style('stroke-width', 3);

  helper.appendAxes(svg);
  helper.appendGraphLabels(svg);
  helper.positionLabels(width, height, margin);
}