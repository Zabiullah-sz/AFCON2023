import d3Tip from 'd3-tip'

/**
 * Creates the tooltip
 *
 */
export function createTooltip () {
    return d3Tip()
    .attr('class', 'd3-tip-viz3 d3-tip')
    .direction('s')
    .html(d => {
      return `<strong>${d.Pays}</strong><br>Tirs effectués: ${d.Tirs}<br>Buts marqués: ${d.Buts}<br>% D'efficacité: ${(d.Ratio * 100).toFixed(1)}<br>`
    })
}
