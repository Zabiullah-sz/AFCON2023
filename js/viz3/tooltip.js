// tooltip.js
import d3Tip from 'd3-tip';

export function createTooltip() {
  return d3Tip()
    .attr('class', 'd3-tip-viz3')
    .html(d => {
      return `
        <div><strong>Nom:</strong> <span style='color:#fff'>${d.player}</span></div>
        <div><strong>Pays:</strong> <span style='color:#fff'>${d.country}</span></div>
        <div><strong>Fautes / 90 min:</strong> <span style='color:#fff'>${d.foulsPer90}</span></div>
        <div><strong>Carton rouge:</strong> <span style='color:#fff'>${d.redCard}</span></div>
        <div><strong>Carton jaune:</strong> <span style='color:#fff'>${d.yellowCard}</span></div>
      `;
    });
}
