import d3Tip from 'd3-tip'

/**
 * Defines the contents of the tooltip.
 *
 * @returns {string} The tooltip contents
 */
export function getContents () {
  return d3Tip()
    .attr('class', 'd3-tip-viz3 d3-tip')
    .html(d => {
      return `
        <div style="font-weight: normal;">
          <div><strong>Joueur: </strong>${d.Player}</div>
          <div><strong>Pays: </strong>${d.Country}</div>
        </div>
      `
    })  
}

/**
 * Defines the contents of the tooltip.
 *
 * @returns {string} The tooltip contents
 */
export function getContentsViz2 () {
  return d3Tip()
    .attr('class', 'd3-tip-viz3 d3-tip')
    .html(d => {
      return `
        <div style="font-weight: normal;">
          <div><strong>Pays: </strong>${d.Pays}</div>
          <div><strong>Différentiel: </strong>${d.Buts_marques - d.Buts_alloues}</div>
        </div>
      `
    })  
}