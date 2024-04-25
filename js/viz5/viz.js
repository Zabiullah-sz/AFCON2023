import * as d3 from 'd3';
import * as helper from './helper.js';
import * as tooltip from './tooltip.js';

export function createScatterPlot(data, width, height) {
  const svg = helper.generateG(width, height);

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

  const tip = tooltip.createTooltip();
  svg.call(tip);

  // Append faded gridlines
  const numTicks = 5; // Number of gridlines
  const xAxisGrid = d3.axisBottom(xScale).ticks(numTicks).tickSize(-graphHeight).tickFormat('').tickSizeOuter(0);
  const yAxisGrid = d3.axisLeft(yScale).ticks(numTicks).tickSize(-graphWidth).tickFormat('').tickSizeOuter(0);

  helper.drawXAxisGrid(svg, height, margin, xAxisGrid);
  helper.drawYAxisGrid(svg, margin, yAxisGrid);

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
        .on('mouseover', function(event, d) {
          // Reduce opacity of all circles except the one being hovered over
          svg.selectAll('circle')
            .style('opacity', 0.3);
          
          // Highlight the hovered circle
          d3.select(this)
            .style('opacity', 1)
            .style('stroke-width', 2); // Increase stroke width for emphasis

          const samePositionPoints = data.filter(point => +point['Tirs'] === +d['Tirs'] && +point['Buts'] === +d['Buts']);
          // Show tooltip for each data point at the same position
          samePositionPoints.forEach(point => {
            tip.show(point, this);
          });
        })
        .on('mouseout', function() {
          // Restore opacity and styles on mouseout
          svg.selectAll('circle')
            .style('opacity', 0.7)
            .style('stroke-width', 1);

          // Hide tooltip
          tip.hide();
        });
    });

  // Draw axes
  helper.appendAxes(svg);
  helper.appendGraphLabels(svg);
  helper.positionLabels(width, height, margin);
  helper.drawXAxis(svg, xScale, height, margin);
  helper.drawYAxis(svg, yScale, margin);
  helper.drawLine(svg, data, xScale, yScale);

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
}
