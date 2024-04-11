/**
 * Finds the players who had at least 2 goals in the tournament
 *
 * @param {object[]} data The dataset containing all the players in the tournament
 * @returns {object[]} The players with at least 2 goals in the tournament
 */
export function getTopPlayersGoals (data) {
  const topGoals = []
  data.forEach(player => {
    if (player.Goals >= 2) {
      topGoals.push(player)
    }
  })
  const topGoalsOrdered = topGoals.sort((a, b) => a.Goals - b.Goals)
  return topGoalsOrdered
}

/**
 * Finds the players who had at least 2 assists in the tournament
 *
 * @param {object[]} data The dataset containing all the players in the tournament
 * @returns {object[]} The players with at least 2 assists in the tournament
 */
export function getTopPlayersAssists (data) {
  const topPlayersAssists = []
  data.forEach(player => {
    if (player.Assists >= 2) {
      topPlayersAssists.push(player)
    }
  })
  const topAssistsOrdered = topPlayersAssists.sort((a, b) => a.Assists - b.Assists)
  return topAssistsOrdered
}

/**
 * Finds the players who had at least 3 goals + assists in the tournament
 *
 * @param {object[]} data The dataset containing all the players in the tournament
 * @returns {object[]} The players with at least 3 goals + assists in the tournament
 */
export function getTopPlayersGoalsAndAssists (data) {
  const topGoalsAndAssists = []
  data.forEach(player => {
    if (player.GoalsAndAssists >= 3) {
      topGoalsAndAssists.push(player)
    }
  })
  const topGoalsAndAssistsOrdered = topGoalsAndAssists.sort((a, b) => a.GoalsAndAssists - b.GoalsAndAssists)
  return topGoalsAndAssistsOrdered
}