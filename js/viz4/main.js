
import teamData from '../../assets/data/defense_team.csv'
import playerData from '../../assets/data/defense_player.csv'
import * as d3 from 'd3';
import { createScatterPlot } from './viz.js';

export function initializeVisualization4() {
  Promise.all([
    d3.csv(teamData),
    d3.csv(playerData)
  ]).then(function(data) {
    const teamData = data[0]; // Data from defense_team.csv
    const playerData = data[1]; // Data from defense_player.csv

    const width = 750;
    const height = 600;

    createScatterPlot(teamData, playerData, width, height);
  });
}