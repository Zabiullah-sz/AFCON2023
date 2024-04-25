import d3Tip from 'd3-tip'

/**
 * Creates the tooltip
 *
 * @param {object[]} playerData The player data
 */
export function createTooltip (playerData) {
  return d3Tip()
    .attr('class', 'd3-tip-viz3 d3-tip')
    .direction('s')
    .html(d => {
        const country = d.Pays
        const goalkeepers = playerData.filter(player => player.Pays === country)

        let tooltipContent = `<strong>${d.Pays}</strong><br>Tirs reçus: ${d.Tirs_reçus}<br>Buts alloués: ${d.Buts_alloues}<br><br>`

        if (goalkeepers.length > 0) {
        const goalieLabel = goalkeepers.length > 1 ? 'Gardiens de but' : 'Gardien de but'
        tooltipContent += `<strong>${goalieLabel}:</strong><br>`
        goalkeepers.forEach(goalie => {
            tooltipContent += `- ${goalie.Gardien_de_but}<br>% Arrêts: ${goalie['%_Arrêts']}<br>Jeux Blancs: ${goalie.Jeux_blancs}<br>`
        })
        }

        return tooltipContent
    })
}
