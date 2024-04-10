'use strict';

import * as d3 from 'd3';
import teamsData from '../../assets/data/players_defense_team.csv';
import * as preprocess from '../viz2/preprocess.js';
import * as viz from '../viz2/viz.js';
import * as helper from '../viz2/helper.js'
import * as legend from '../viz2/legend.js'
import * as tooltip from '../common/tooltip.js'

export function initializeVisualization2() {
    const margin = { top: 150, right: 75, bottom: 35, left: 230 };
    const width = 1500 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;

    d3.csv(teamsData).then(function(data) {
        const sortedTeams = preprocess.sortByGoalsScored(data)

        const svg = helper.generateG(width + margin.left + margin.right, height + 200, margin)

        helper.appendAxes(svg)

        //Title
        helper.appendGraphLabels(svg)
        helper.positionLabels()

        const xScale = d3.scaleLinear().range([0, width]);
        const yScale = d3.scaleBand().range([height, 0]).padding(0.2);

        viz.updateXScale(xScale, sortedTeams, width);
        viz.updateYScale(yScale, sortedTeams, height);


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
        const tip = tooltip.getContents();
        svg.call(tip);
        viz.drawBars(svg, xScale, yScale, sortedTeams, tip);
        
        // Legend
        const legendData = [
            { label: 'Buts Marqués', color: 'green' },
            { label: 'Buts Alloués', color: 'red' },
        ];
        legend.drawLegend(svg, legendData);
    })
}