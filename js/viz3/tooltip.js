// tooltip.js
import d3Tip from 'd3-tip';

export function createTooltip() {
  return d3Tip()
    .attr('class', 'd3-tip-viz3 d3-tip')
    .html(d => {
      return `
      <div style="font-weight: normal;">
        <div><strong>Nom:</strong> ${d.player}</div>
        <div><strong>Pays:</strong> ${d.country}</div>
        <div><strong>Fautes / 90 min:</strong> ${d.foulsPer90}</div>
        <div><strong>Carton rouge:</strong> ${d.redCard}</div>
        <div><strong>Carton jaune:</strong> ${d.yellowCard}</div>
        </div>
      `;
    });
}
