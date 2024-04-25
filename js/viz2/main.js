'use strict';

import * as d3 from 'd3';
import teamsData from '../../assets/data/players_defense_team.csv';
import * as preprocess from '../viz2/preprocess.js';
import * as viz from '../viz2/viz.js';
import * as helper from '../viz2/helper.js'
import * as legend from '../viz2/legend.js'
import * as tooltip from '../common/tooltip.js'

export function initializeVisualization2() {
    var GoalsScored = true;
    var GoalsAllowed = false;
    const margin = { top: 125, right: 75, bottom: 35, left: 230 };
    const width = 900 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;
    d3.select('#viz').selectAll('*').remove();
    d3.select('.d3-tip').remove();


    
    d3.csv(teamsData).then(function(data) {
        const sortedTeams = preprocess.sortByGoalsScored(data)

        const svg = helper.generateG(width + margin.left + margin.right, height + 200, margin)

        // x,y Axis
        svg.append('g')
        .attr('class', 'x axis')
        var yAxis = svg.append('g')
        .attr('class', 'y axis')
        .style('font-size', "16px")
        const xScale = d3.scaleLinear().range([0, width]);
        const yScale = d3.scaleBand().range([height, 0]).padding(0.2);

        // Title
        helper.appendGraphLabels(svg)
        helper.positionLabels()

        // Buttons
        viz.drawGoalsAllowedButton()
            .on('click', function() {
                if (!GoalsAllowed && GoalsScored) {
                    GoalsScored = false
                    GoalsAllowed = true

                    // Rewrite updated y axis
                    const sortedTeams = preprocess.sortByGoalsAllowed(data);
                    viz.updateYScale(yScale, sortedTeams, height);
                    yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
                    
                    // Redraw updated bars
                    d3.selectAll('.bar').remove();
                    viz.drawBars(svg, xScale, yScale, sortedTeams, tip);
                    
                    GoalsScored = true
                    GoalsAllowed = false
                    viz.updateButtonStates(GoalsScored, GoalsAllowed);
                }

            });

        viz.drawGoalsScoredButton()
            .on('click', function() {
                if (!GoalsScored && GoalsAllowed) {
                    GoalsScored = true
                    GoalsAllowed = false

                    // Rewrite updated y axis
                    const sortedTeams = preprocess.sortByGoalsScored(data);
                    viz.updateYScale(yScale, sortedTeams, height);
                    yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
                    
                    // Redraw updated bars
                    d3.selectAll('.bar').remove();
                    viz.drawBars(svg, xScale, yScale, sortedTeams, tip);
                    
                  
                    GoalsScored = false
                    GoalsAllowed = true
                    viz.updateButtonStates(GoalsScored, GoalsAllowed);

                }
            });
        viz.updateButtonStates(GoalsScored, GoalsAllowed);
        
        viz.updateXScale(xScale, sortedTeams, width);
        viz.updateYScale(yScale, sortedTeams);
        // Initialize y axis labels
        yAxis.call(d3.axisLeft(yScale));

        // Add x axis on top and bottom
        const xAxisBottomGen = d3.axisBottom(xScale)
        .ticks(d3.max(sortedTeams, d => Math.max(d.Buts_marques, d.Buts_alloues)) * 2 + 1)
        .tickSize(-height)
        .tickFormat(d => Math.abs(d));

        helper.drawXAxisBottom(svg, xAxisBottomGen, height)

        const xAxisTopGen = d3.axisTop(xScale)
        .ticks(d3.max(sortedTeams, d => Math.max(d.Buts_marques, d.Buts_alloues)) * 2 + 1)
        .tickSize(-height)
        .tickFormat(d => Math.abs(d));

        helper.drawXAxisTop(svg, xAxisTopGen)

        d3.selectAll("path").remove(); // Remove x,y axis paths

        // Draw viz
        const tip = tooltip.getContentsViz2();
        svg.call(tip);
        viz.drawBars(svg, xScale, yScale, sortedTeams, tip);
        
        // Legend
        const legendData = [
            { label: 'Buts Alloués', color: 'red' },
            { label: 'Buts Marqués', color: 'green' },

        ];
        legend.drawLegend(svg, legendData);
    })
}