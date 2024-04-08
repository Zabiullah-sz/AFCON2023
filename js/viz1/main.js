'use strict';

import * as d3 from 'd3';
import d3Tip from 'd3-tip';

// Import other necessary modules here.
import playersData from '../../assets/data/players.csv';
import * as preproc from '../common/preprocessing.js';
import * as viz from '../viz1/viz.js';
import * as helper from '../viz1/helper.js';
import * as tooltip from '../viz1/tooltip.js';

export function initializeVisualization1() {
      // Define margins, sizes, and scales.
      const margin = { top: 35, right: 35, bottom: 50, left: 150 };
      const width = 800 - margin.left - margin.right;
      const height = 600 - margin.top - margin.bottom;

      // Load your data.
      d3.csv(playersData, d3.autoType).then(function(data) {
        // Create SVG canvas.
        const svg = d3.select('#viz1')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Filter to get players with most goals
        const topPlayersGoals = preproc.getTopPlayersGoals(data);
        data = topPlayersGoals;

        const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.Goals)]).range([0, width]);
        const yScale = d3.scaleBand().padding([0.15]).domain(data.map(d => d.Player)).range([height, 0]);

        // X axis
        const xAxis = g => g
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(xScale).ticks(5).tickSizeOuter(0))
          .selectAll('text')  
          .style('text-anchor', 'end')
          .attr('dx', '.25em')
          .attr('dy', '.50em');

        // Y axis
        const yAxis = g => g
          .call(d3.axisLeft(yScale))
          .call(g => g.select('.domain').remove());

        // Add axes
        svg.append('g').call(xAxis);
        svg.append('g').call(yAxis);

        // Add bars
        svg.selectAll('.bar')
          .data(topPlayersGoals)
          .join('rect')
          .attr('class', 'bar')
          .attr('x', 0)
          .attr('y', d => yScale(d.Player))
          .attr('width', d => xScale(d.Goals))
          .attr('height', yScale.bandwidth())
          .attr('fill', 'blue');

          svg.selectAll('.goal-label')
          .data(topPlayersGoals)
          .enter()
          .append('text')
          .attr('class', 'goal-label')
          .attr('x', d => xScale(d.Goals))
          .attr('y', d => yScale(d.Player) + yScale.bandwidth() / 2)
          .attr('dx', -20)
          .attr('dy', '0.35em')
          .style('fill', 'white')
          .text(d => d.Goals);

        // Add labels
        svg.append('text')
          .attr('class', 'title')
          .text('Meilleurs buteurs du tournoi (minimum 2 buts)');

        svg.append('text')
          .attr('text-anchor', 'end')
          .attr('x', width / 2)
          .attr('y', height + margin.bottom)
          .text('Buts');

        svg.append('text')
          .attr('text-anchor', 'end')
          .attr('transform', 'rotate(-90)')
          .attr('x', -margin.left)
          .attr('y', -margin.left + 20)
          .text('Joueurs');
      });
    }
