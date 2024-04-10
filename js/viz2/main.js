'use strict';

import * as d3 from 'd3';
import d3Legend from 'd3-svg-legend'

import playersData from '../../assets/data/players.csv';
import teamsData from '../../assets/data/players_defense_team.csv';
import * as preprocess from '../viz2/preprocess.js';
import * as viz from '../viz2/viz.js';

// Import other necessary modules here.

export function initializeVisualization2() {
    // Define margins, sizes, and scales.
    const margin = { top: 150, right: 35, bottom: 35, left: 220 };
    const width = 1500 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;

    d3.select('#viz').select('svg').remove();
    d3.select('.d3-tip').remove();
    // Load your data.
    d3.csv(teamsData).then(function(data) {
        // Preprocess data if necessary.
        const sortedTeams = preprocess.sortByGoalsScored(data)

        // Create SVG canvas.
        const svg = d3.select('#viz')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + 200)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


        // Axes
        svg.append('g')
        .attr('class', 'x axis')
        svg.append('g')
        .attr('class', 'y axis')

        //Title
        svg.append('text')
        .text('Buts marqués et alloués par chaque équipe')
        .attr('class', 'title')
        .attr('font-size', 22)
        d3.select('.title')
        .attr('x', 600)
        .attr('y', -125)

        const xScale = d3.scaleLinear().range([0, width]);
        const yScale = d3.scaleBand().range([height, 0]).padding(0.2);

        viz.updateXScale(xScale, sortedTeams, width);
        viz.updateYScale(yScale, sortedTeams, height);


        // Add x axis on top and bottom
        const xAxisBottomGen = d3.axisBottom(xScale)
        .ticks(d3.max(sortedTeams, d => Math.max(d.Buts_marques, d.Buts_alloues)) * 2 + 1)
        .tickSize(-height)
        .tickFormat(d => Math.abs(d));

        const xAxisBottom = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxisBottomGen);

        xAxisBottom.selectAll(".tick line")
        .attr("stroke","gray")
        xAxisBottom.selectAll(".tick text")
        .attr('font-size', 20)
        .attr("fill", function(d) {
            if (d < 0) {return "red"}
            else 	{ return "black" }});

        const xAxisTopGen = d3.axisTop(xScale)
        .ticks(d3.max(sortedTeams, d => Math.max(d.Buts_marques, d.Buts_alloues)) * 2 + 1)
        .tickSize(-height)
        .tickFormat(d => Math.abs(d));

        const xAxisTop = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${0})`)
        .call(xAxisTopGen);

        xAxisTop.selectAll(".tick line")
        .attr("stroke","gray")
        xAxisTop.selectAll(".tick text")
        .attr('font-size', 20)
        .attr("fill", function(d) {
            if (d < 0) {return "red"}
            else 	{ return "black" }});

        d3.selectAll("path").remove(); // Remove x,y axis paths

        // Draw viz
        viz.drawBars(svg, xScale, yScale, sortedTeams, width);
        
        // Legend
        const legendData = [
            { label: "Buts Marqués", color: "green" },
            { label: "Buts Alloués", color: "red" },
        ];
        const legend = d3.select("#legend")
        .append("svg")
        .attr("width", 200)
        .attr("height", 100)
        const legendItems = svg.selectAll("legendItem")
        .data(legendData)
        .enter().append("g")
        .attr("class", "legendItem")
        .attr("transform", (d, i) => `translate(${i * 150}, 0)`)
        legendItems.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => d.color);
        legendItems.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(d => d.label)
        .style("fill", "#000");
        
        // Handle window resize.
        window.addEventListener('resize', () => {
            // Code to handle resizing.
        });
    }).catch(function(error) {
        console.error('Error loading data:', error);
    });
}