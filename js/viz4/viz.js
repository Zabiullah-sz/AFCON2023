import * as d3 from 'd3';
import d3Tip from 'd3-tip';

export function createScatterPlot(data, playerData, width, height) {

  d3.select('#viz').select('svg').remove();
  d3.select('.d3-tip').remove();

  const svg = d3.select('#viz').append('svg')
    .attr('width', width)
    .attr('height', height);

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d['Tirs_reçus'])])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => +d['Buts_alloues'])])
    .range([height - margin.bottom, margin.top]);

  // Define color mapping based on ronde values
  const colorScale = d3.scaleOrdinal()
    .domain(['Carré d\'as', 'Quart de finales', 'Huitièmes de finales', 'Phase de groupes'])
    .range(['red', 'blue', 'yellow', 'green']);

  // Append faded gridlines
  const numTicks = 5; // Number of gridlines
  const xAxisGrid = d3.axisBottom(xScale).ticks(numTicks).tickSize(-graphHeight).tickFormat('').tickSizeOuter(0);
  const yAxisGrid = d3.axisLeft(yScale).ticks(numTicks).tickSize(-graphWidth).tickFormat('').tickSizeOuter(0);

  svg.append('g')
    .attr('class', 'x-grid')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(xAxisGrid)
    .selectAll('line')
    .style('stroke', 'rgba(0, 0, 0, 0.1)'); // Adjust opacity for faded effect

  svg.append('g')
    .attr('class', 'y-grid')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxisGrid)
    .selectAll('line')
    .style('stroke', 'rgba(0, 0, 0, 0.1)'); // Adjust opacity for faded effect

    const tip = d3Tip()
    .attr('class', 'd3-tip-viz4 d3-tip')
    .html(d => {
      const country = d.Pays;
      const goalkeepers = playerData.filter(player => player.Pays === country);
  
      let tooltipContent = `<strong>${d.Pays}</strong><br>Tirs reçus: ${d.Tirs_reçus}<br>Buts alloués: ${d.Buts_alloues}<br>`;
  
      if (goalkeepers.length > 0) {
        const goalieLabel = goalkeepers.length > 1 ? 'Gardiens de but' : 'Gardien de but';
        tooltipContent += `<strong>${goalieLabel}:</strong><br>`;
        goalkeepers.forEach(goalie => {
          tooltipContent += `- ${goalie.Gardien_de_but}<br>% Arrêts: ${goalie['%_Arrêts']}<br>Jeux Blancs: ${goalie.Jeux_blancs}<br>`;
        });
      }
  
      return tooltipContent;
    })
    .style('position', 'absolute')
    .style('background-color', 'rgba(255, 255, 255, 0.9)')
    .style('padding', '10px')
    .style('border-radius', '5px')
    .style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.3)')
    .style('font-family', 'Arial, sans-serif')
    .style('font-size', '12px');
    svg.call(tip);


  // Append circles for data points
  svg.selectAll('circle')
    .data(data)
    .enter().append('circle')
      .attr('cx', d => xScale(+d['Tirs_reçus']))
      .attr('cy', d => yScale(+d['Buts_alloues']))
      .attr('r', 12)
      .style('fill', d => colorScale(d['Ronde']))
      .style('opacity', 0.7)
      .style('stroke', 'black')
      .style('stroke-width', 1) 
      .on('mouseover', (event, d) => {
        const samePositionPoints = data.filter(point => +point['Tirs_reçus'] === +d['Tirs_reçus'] && +point['Buts_alloues'] === +d['Buts_alloues']);

        // Show tooltip for each data point at the same position
        samePositionPoints.forEach(point => {
          console.log('duplicate')
          tip.show(point, event.currentTarget);
        });
      })
      .on('mouseout', tip.hide);

  // Append axes
  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))
    .style('font-size', 12);

  svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale))
    .style('font-size', 12);

      // Average
  const avgTirs = d3.mean(data, d => +d['Tirs_reçus']);
  const avgButs = d3.mean(data, d => +d['Buts_alloues']);

  svg.append('line')
    .attr('x1', xScale(0))
    .attr('y1', yScale(0))
    .attr('x2', xScale(d3.max(data, d => +d['Tirs_reçus'])))
    .attr('y2', yScale(d3.max(data, d => +d['Buts_alloues'])))
    .style("stroke-dasharray", ("10,5"))
    .style('stroke', 'red')
    .style('stroke-width', 3);

  // Legend
  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom + 35})`);

  const legendData = ['Carré d\'as', 'Quart de finales', 'Huitièmes de finales', 'Phase de groupes'];

  const legendItem = legend.selectAll('.legend-item')
    .data(legendData)
    .enter().append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(${i * 150}, 0)`);

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
    .style('font-size', '12px');
  
  // Title
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '24px')
    .text('Buts alloués et tirs reçus par équipe dans le tournoi');
  
  // Axis titles
  svg.append('text')
    .attr('x', width / 2)
    .attr('y', height - margin.bottom / 2+5)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text('Tirs reçus');
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', margin.left / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .text('Buts alloués');


}