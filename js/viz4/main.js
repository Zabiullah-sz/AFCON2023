
import teamData from '../../assets/data/defense_team.csv'
import playerData from '../../assets/data/defense_player.csv'
import * as d3 from 'd3';
import { createScatterPlot } from './viz.js';

// Define the main function to initialize the visualization
export function initializeVisualization4() {
  // Load the CSV data
  Promise.all([
    d3.csv(teamData),
    d3.csv(playerData)
  ]).then(function(data) {
    const teamData = data[0]; // Data from defense_team.csv
    const playerData = data[1];
    // Convert string numbers to numeric values
    // Specify dimensions for the scatter plot
    const width = 750;
    const height = 600;

    // Create the scatter plot using the data and dimensions
    createScatterPlot(teamData, playerData, width, height);

    // Optional: Add event listeners or other interactions here
    // For example, you can add a click handler to update the plot

  }).catch(function(error) {
    // Handle data loading errors
    console.error('Error loading data:', error);
  });
}