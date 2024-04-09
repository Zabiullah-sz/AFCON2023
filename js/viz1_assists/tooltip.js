/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
    return `
      <div style="font-weight: normal;">
        <div><strong>Joueur: </strong>${d.Player}</div>
        <div><strong>Pays: </strong>${d.Country}</div>
      </div>
    `
  }
  