import * as d3 from 'd3';
import * as helper from './helper.js';
import * as tooltip from './tooltip.js';
import { initializeVisualization5 } from '../viz5/main.js';
import { initializeVisualization4 } from '../viz4/main.js';
let offense = false;
let defense = true;
function drawButton(selector, text, bgColor,id) {
  return d3.select(selector)
    .append('button')
    .text(text)
    .attr('id',id)
    .style('padding', '10px 20px') // Add padding for better button appearance
    .style('margin-right', '10px') // Add margin between buttons
    .style('background-color', bgColor)
    .style('color', 'black') // Set text color
    .style('border', 'none') // Remove default button border
    .style('border-radius', '5px') // Add rounded corners
    .style('cursor', 'pointer'); // Change cursor on hover
}

// Draws the offensive stats button
export function drawOffensiveStatsButton() {
  return drawButton('#viz', 'Afficher statistiques offensives', 'lightgreen','off')
    .style('position', 'absolute')
    .style('top', '50px')
    .style('left', '100px');
}

// Draws the defensive stats button
export function drawDefensiveStatsButton() {
  return drawButton('#viz', 'Afficher statistiques défensives', 'lightblue','def')
    .style('position', 'absolute')
    .style('top', '50px') // Position at the same top level as the offensive button
    .style('left', '390px'); // Position next to the offensive button with spacing
}
function updateButtonStates() {
  d3.select('#off')
                        .style('outline', offense ? '2px solid black' : 'none')
                        .style('background-color', offense ? '#4CAF50' : 'lightgreen')
                         .classed('disabled', offense);

  d3.select('#def')
  .style('outline', defense ? '2px solid black' : 'none')
  .style('background-color', defense ? '#2196F3' : 'lightblue')
                            .classed('disabled', defense);
}

export function createScatterPlot(data, playerData, width, height) {


  const svg = helper.generateG(width, height);
  drawDefensiveStatsButton().on('click', function() {
    if (offense) {
      initializeVisualization4();
      offense = false;
      defense = true;
      updateButtonStates();

    }
  });
  drawOffensiveStatsButton().on('click', function() {
    if (defense) {
      initializeVisualization5();
      defense = false;
      offense = true;
      updateButtonStates();
    }
  });
  updateButtonStates();

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d['Tirs_reçus'])])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d['Buts_alloues'])])
    .range([height - margin.bottom, margin.top]);

  const colorScale = d3.scaleOrdinal()
    .domain(['Carré d\'as', 'Quart de finales', 'Huitièmes de finales', 'Phase de groupes'])
    .range(['red', 'blue', 'yellow', 'green']);

  const tip = tooltip.createTooltip(playerData);
  svg.call(tip);

  svg.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('cx', d => xScale(0))
    .attr('cy', d => yScale(+d['Buts_alloues']))
    .attr('r', 12)
    .style('fill', d => colorScale(d['Ronde']))
    .style('opacity', 0.7)
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .style('cursor', 'pointer')
    .on('mouseover', function(event, d) {
      // Reduce opacity of all circles except the one being hovered over
      svg.selectAll('circle')
        .style('opacity', 0.3);
      
      // Highlight the hovered circle
      d3.select(this)
        .style('opacity', 1)
        .style('stroke-width', 2); // Increase stroke width for emphasis
      
      const samePositionPoints = data.filter(point => +point['Tirs_reçus'] === +d['Tirs_reçus'] && +point['Buts_alloues'] === +d['Buts_alloues']);
      // Show tooltip for each data point at the same position
      samePositionPoints.forEach(point => {
        tip.show(point, event.currentTarget);
      });
    })
    .on('mouseout', function(event, d) {
      // Restore opacity and styles on mouseout
      svg.selectAll('circle')
        .style('opacity', 0.7)
        .style('stroke-width', 1);

      // Hide tooltip
      tip.hide();
    })
    .transition()
    .duration(1000)
    .delay((d, i) => i * 100)
    .attr('cx', d => xScale(+d['Tirs_reçus']));

  // Draw axes and other elements
  helper.appendAxes(svg);
  helper.appendGraphLabels(svg);
  helper.positionLabels(width, height, margin);
  helper.drawXAxis(svg, xScale, height, margin);
  helper.drawYAxis(svg, yScale, margin);
  helper.drawLine(svg, data, xScale, yScale);

  // Legend
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom + 35})`);

  const legendData = ['Carré d\'as', 'Quart de finales', 'Huitièmes de finales', 'Phase de groupes'];

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