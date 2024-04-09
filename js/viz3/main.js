'use strict';

import * as d3 from 'd3';
import playersData from '../../assets/data/players.csv';
import { summarizeData, getTop7 } from './preprocess.js';
import d3Tip from 'd3-tip';
import flagUrls from '../common/flags.js';



// Function to retrieve the flag URL
function getFlagUrl(countryName) {
    return flagUrls[countryName] || '../../assets/flags/default.png'; // Provide a default if no match is found
  }

export function initializeVisualization3() {
    const width = 460;
    const height = 460;

    const svg = d3.select('#viz3')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    d3.csv(playersData, d3.autoType).then(function(fullData) {
        const data = getTop7(summarizeData(fullData));
        console.log(data)

        const color = d3.scaleOrdinal(d3.schemeSet1);

        const size = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d.foulsPer90)])
            .range([7, 55]);

        const tip = d3Tip()
            .attr('class', 'd3-tip')
            .html(d => `${d.Player}: ${d.foulsPer90} fouls per 90 minutes`);

        svg.call(tip);

        const defs = svg.append('defs');

        data.forEach(d => {
            defs.append('pattern')
                .attr('id', `flag-${d.country.replace(/\s+/g, '-')}`)
                .attr('width', '100%')
                .attr('height', '100%')
                .attr('patternContentUnits', 'objectBoundingBox')
                .append('image')
                .attr('href', getFlagUrl(d.country))
                .attr('width', 1)
                .attr('height', 1)
                .attr('preserveAspectRatio', 'xMidYMid slice');
        });

        let node = svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .attr('r', d => size(d.foulsPer90))
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .style('fill', d => color(d.country))
            .style('fill-opacity', 0.8)
            .attr('stroke', 'black')
            .style('stroke-width', 1)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .style('fill', d => `url(#flag-${d.country.replace(/\s+/g, '-')})`);

        const drag = d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);

        node.call(drag);

        let simulation = d3.forceSimulation()
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('charge', d3.forceManyBody().strength(0.1))
            .force('collide', d3.forceCollide().strength(0.2).radius(d => size(d.foulsPer90) + 3).iterations(1));

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
            // Activate the custom force to pull nodes back to the center
            simulation.force('x', d3.forceX(width / 2).strength(0.02))
                      .force('y', d3.forceY(height / 2).strength(0.02));
        }

        simulation
            .nodes(data)
            .on('tick', () => {
                node
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y);
            });
    });
}
