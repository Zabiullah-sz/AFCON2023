'use strict';

import * as d3 from 'd3';
import playersData from '../../assets/data/players.csv'

// Import other necessary modules here.

export function initializeVisualization2() {
    // Define margins, sizes, and scales.
    const margin = { top: 35, right: 35, bottom: 35, left: 35 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Load your data.
    console.log("jello")
    d3.csv(playersData, d3.autoType).then(function(data) {
        // Preprocess data if necessary.
        console.log("Loadedd", data)
        // Create SVG canvas.
        const svg = d3.select('#viz-container')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Create and draw the visualization.
        // Example:
        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.radius)
            .attr('fill', 'steelblue');

        // Add axes, labels, legends, etc. if necessary.

        // Handle window resize.
        window.addEventListener('resize', () => {
            // Code to handle resizing.
        });
    }).catch(function(error) {
        console.error('Error loading data:', error);
    });
}


// export function initializeVisualization2() {
    //   // Define margins, sizes, and scales.
    //   const margin = { top: 35, right: 35, bottom: 100, left: 70 };
    //   const width = 800 - margin.left - margin.right;
    //   const height = 600 - margin.top - margin.bottom;
    
    //   // Load your data.
    //   d3.csv(playersData, d3.autoType).then(function(data) {
    //     // Create SVG canvas.
    //     const svg = d3.select('#viz2')
    //       .append('svg')
    //       .attr('width', width + margin.left + margin.right)
    //       .attr('height', height + margin.top + margin.bottom)
    //       .append('g')
    //       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    //     // Filter to get top 10 players with most games played
    //     data.sort((a, b) => d3.descending(a.GamesPlayed, b.GamesPlayed));
    //     const topPlayers = data.slice(0, 10);
    
    //     // X scale
    //     const x = d3.scaleBand()
    //       .domain(topPlayers.map(d => d.Player))
    //       .range([0, width])
    //       .padding(0.1);
    
    //     // Y scale
    //     const y = d3.scaleLinear()
    //       .domain([0, d3.max(topPlayers, d => d.GamesPlayed)])
    //       .nice()
    //       .range([height, 0]);
    
    //     // X axis
    //     const xAxis = g => g
    //       .attr('transform', `translate(0,${height})`)
    //       .call(d3.axisBottom(x).tickSizeOuter(0))
    //       .selectAll('text')  
    //       .style('text-anchor', 'end')
    //       .attr('dx', '-.8em')
    //       .attr('dy', '.15em')
    //       .attr('transform', 'rotate(-65)');
    
    //     // Y axis
    //     const yAxis = g => g
    //       .call(d3.axisLeft(y))
    //       .call(g => g.select('.domain').remove());
    
    //     // Add axes
    //     svg.append('g').call(xAxis);
    //     svg.append('g').call(yAxis);
    
    //     // Add bars
    //     svg.selectAll('.bar')
    //       .data(topPlayers)
    //       .join('rect')
    //       .attr('class', 'bar')
    //       .attr('x', d => x(d.Player))
    //       .attr('y', d => y(d.GamesPlayed))
    //       .attr('height', d => y(0) - y(d.GamesPlayed))
    //       .attr('width', x.bandwidth())
    //       .attr('fill', 'steelblue');
    
    //     // Add labels
    //     svg.append('text')
    //       .attr('text-anchor', 'end')
    //       .attr('x', width/2 + margin.right)
    //       .attr('y', height + margin.bottom - 5)
    //       .text('Player');
    
    //     svg.append('text')
    //       .attr('text-anchor', 'end')
    //       .attr('transform', 'rotate(-90)')
    //       .attr('y', -margin.left + 20)
    //       .attr('x', -margin.top)
    //       .text('Games Played');
    //   }).catch(function(error) {
    //     console.error('Error loading data:', error);
    //   });
    // }
    