/**
 * Finds the names of the players who had at least 2 goals in the tournament
 *
 * @param {object[]} data The dataset containing all the players in the tournament
 * @returns {string[]} The names of the players with at least 2 goals in the tournament
 */
export function getTopPlayersGoals (data) {
    const topPlayersGoals = []
    data.forEach(player => {
        if (player.Goals >= 2) {
        topPlayersGoals.push(player.Player)
        }
    })
    return topPlayersGoals
}

/**
 * Finds the names of the players who had at least 2 assists in the tournament
 *
 * @param {object[]} data The dataset containing all the players in the tournament
 * @returns {string[]} The names of the players with at least 2 assists in the tournament
 */
export function getTopPlayersAssists (data) {
    const topPlayersAssists = []
    data.forEach(player => {
      if (player.Assists >= 2) {
        topPlayersAssists.push(player.Player)
      }
    })
    return topPlayersAssists
}

/**
 * Finds the names of the players who had at least 3 goals + assists in the tournament
 *
 * @param {object[]} data The dataset containing all the players in the tournament
 * @returns {string[]} The names of the players with at least 3 goals + assists in the tournament
 */
export function getTopPlayersGoalsAndAssists (data) {
    const topPlayersGoalsAndAssists = []
    data.forEach(player => {
      if (player.GoalsAndAssists >= 3) {
        topPlayersGoalsAndAssists.push(player.Player)
      }
    })
    return topPlayersGoalsAndAssists
}