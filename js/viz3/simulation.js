import * as d3 from 'd3';

function getPositionForCountry(country, index, totalCountries, width, height) {
    const angle = (index / totalCountries) * 2 * Math.PI;
    const radius = (totalCountries/14)*(Math.max(width, height) / 4); // Adjust radius for better spread
    const x = width / 2 + radius * Math.cos(angle);
    const y = height / 2 + radius * Math.sin(angle);
    return { x, y };
}

export function createSimulation(nodes, width, height, sizeScale) {
    const countries = Array.from(new Set(nodes.map(d => d.country))).sort();
    const countryPositions = countries.map((country, i) =>
        getPositionForCountry(country, i, countries.length, width, height)
    );

    let forceX = d3.forceX(d => countryPositions[countries.indexOf(d.country)].x).strength(1);
    let forceY = d3.forceY(d => countryPositions[countries.indexOf(d.country)].y).strength(1);

    const simulation = d3.forceSimulation(nodes)
    .force('center', d3.forceCenter(width / 2, height / 2))
        .force('charge', d3.forceManyBody().strength(0.1))
        .force('collide', d3.forceCollide().strength(0.2).radius(d => sizeScale(d.foulsPer90) + 2).iterations(1))
        .force('x', forceX)
        .force('y', forceY);

    // Optionally warm up the simulation
    // for (let i = 0; i < 300; i++) { // Run simulation for 300 ticks in advance
    //     simulation.tick();
    // }


    return simulation;
}
